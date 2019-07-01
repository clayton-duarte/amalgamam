const io = require('socket.io-client');

const Interface = require('./components/Interface');
const Safe = require('./components/Safe');

const isDev =  (process.env.NODE_ENV === 'development');
const endPoint = isDev ? 'http://localhost:8000/' : 'https://amalg-server.now.sh/';

async function ChatClient() {
	this.interface = new Interface();
	this.interface.user = 'developer';
	this.interface.secret = 'batata';
	if(!isDev) await this.interface.signNewUser();
	this.safe = new Safe(this.interface.secret);
	this.socket = await io(`${endPoint}?token=${this.safe.encrypt({ user: this.interface.user, secret: this.interface.secret})}`);

	this.userMessageListener = (msg)  => {
		if (msg) {
			const data = {
				secret: this.interface.secret,
				user: this.interface.user,
				msg
			};
			this.socket.emit('chat_message', this.safe.encrypt(data));
		}
    this.interface.listenInput()
			.then(this.userMessageListener)
			.catch(() => {
				this.interface.showUserDisconnection(this.interface.user);
			});
	};

	this.userMessageListener();

	this.socket.on('connect_error', (error) => {
		this.interface.showReconectMessage(error);
	});

	this.socket.on('chat_message', (data) => {
		const { user, msg, secret } = this.safe.decrypt(data);
		if (secret === this.interface.secret) {
			return this.interface.showUserMessage({ msg, user }, this.interface.user);
		}
	});

	this.socket.on('handshake', (data) => {
		const { user, secret } = this.safe.decrypt(data);
		if (secret === this.interface.secret) {
			return this.interface.showUserConnection(user, this.interface.user);
		}
	});

	this.socket.on('goodbye', (data) => {
		const { user, secret } = this.safe.decrypt(data);
		if (secret === this.interface.secret) {
			return this.interface.showUserDisconnection(user);
		}
	});
};

console.clear();
ChatClient();
