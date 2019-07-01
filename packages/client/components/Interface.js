const { Terminal, TextBuffer } = require('terminal-kit');

const Messager = require('./Messager');
const Input = require('./Input');

class Interface {
  constructor() {
    this.store = new TextBuffer();
    this.terminal = new Terminal();
    this.messager = new Messager(this.terminal);
    this.userInput = new Input(this.terminal, this.store);
    this.secret = '';
    this.user = '';
  };

  async signNewUser() {
    this.messager.askUserName();
    this.user = await this.listenInput();
    this.messager.askSecret();
    this.secret = await this.listenInput();
  };

  async preserveInput(drawMessage) {
    await this.terminal.eraseLine();
    await this.terminal.column(1)
    await drawMessage();
    return this.terminal(this.store.getText());
  };
  
  showUserConnection(user, myself) {
    if (user === myself) return this.messager.youConnected();
    return this.preserveInput(() => {
      return this.messager.userConnected(user);
    });
  };
  
  showUserDisconnection(user) {
    return this.preserveInput(() =>  this.messager.userDisconnected(user));
  };
  
  showReconectMessage() {
    return this.preserveInput(() => this.messager.serverDisconected());
  };
  
  showUserMessage(data, myself) {
    if (data.user === myself) return this.messager.myMessage(data);
    return this.preserveInput(() => {
      if (data.user) return this.messager.userMessage(data);
      return this.messager.default(data);
    });
  };
  
  listenInput() {
    return new Promise((resolve, reject) => {
      this.userInput.resetListeners();
      this.terminal.on('key', (input, matches, data) => {
        if (data.isCharacter) return this.userInput.saveUserInput(input);
        if (matches.includes('BACKSPACE')) return this.userInput.backDelete();
        if (matches.includes('CTRL_C')) return this.userInput.processExit(reject);
        if (matches.includes('ENTER')) return this.userInput.submit(resolve);
      });
    });
  };
}

module.exports = Interface;
