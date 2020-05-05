const { Terminal, TextBuffer } = require("terminal-kit");

const Messenger = require("./Messenger");
const Input = require("./Input");

class Interface {
  constructor() {
    this.store = new TextBuffer();
    this.terminal = new Terminal();
    this.messenger = new Messenger(this.terminal);
    this.userInput = new Input(this.terminal, this.store);
    this.secret = "";
    this.user = "";
  }

  async signNewUser() {
    this.messenger.askUserName();
    this.user = await this.listenInput();
    this.messenger.askSecret();
    this.secret = await this.listenInput();
  }

  async preserveInput(drawMessage) {
    await this.terminal.eraseLine();
    await this.terminal.column(1);
    await drawMessage();
    return this.terminal(this.store.getText());
  }

  showUserConnection(user, myself) {
    if (user === myself) return this.messenger.youConnected();
    return this.preserveInput(() => {
      return this.messenger.userConnected(user);
    });
  }

  showUserDisconnection(user) {
    return this.preserveInput(() => this.messenger.userDisconnected(user));
  }

  showReconectMessage() {
    return this.preserveInput(() => this.messenger.serverDisconected());
  }

  showUserMessage(data, myself) {
    if (data.user === myself) return this.messenger.myMessage(data);
    return this.preserveInput(() => {
      if (data.user) return this.messenger.userMessage(data);
      return this.messenger.default(data);
    });
  }

  listenInput() {
    return new Promise((resolve, reject) => {
      this.userInput.resetListeners();
      this.terminal.on("key", (input, matches, data) => {
        if (data.isCharacter) return this.userInput.saveUserInput(input);
        if (matches.includes("BACKSPACE")) return this.userInput.backDelete();
        if (matches.includes("CTRL_C"))
          return this.userInput.processExit(reject);
        if (matches.includes("ENTER")) return this.userInput.submit(resolve);
      });
    });
  }
}

module.exports = Interface;
