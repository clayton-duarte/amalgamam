const io = require('socket.io');

function ChatServer(port) {
	this.socket = io(port);
	console.log(`server running on ${port}`);
		this.socket.on('connection', (conn) => {
		const { token } = conn.handshake.query;
		console.log(token);
		this.socket.emit('handshake', token);
		conn.on('disconnect', () => {
			this.socket.emit('goodbye', token);
			console.log(token);
		});
		conn.on('chat_message', (data) => {
			this.socket.emit('chat_message', data);
		});
	});
};

console.clear();
ChatServer(process.env.PORT || 8000);
