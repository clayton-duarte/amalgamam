class Messenger {
  constructor(terminal) {
    this.terminal = terminal;
  }

  askUserName() {
    return this.terminal.cyan.bold("insert a username:")("\n");
  }

  askSecret() {
    return this.terminal.cyan.bold("insert a password:")("\n");
  }

  youConnected() {
    return this.terminal("\n").green.bold(
      `you are connected, try to send a message`
    )("\n");
  }

  userConnected(user) {
    return this.terminal.green.bold(`${user} connected`)("\n");
  }

  userDisconnected(user) {
    return this.terminal.red.bold(`${user} disconnected`)("\n");
  }

  serverDisconected() {
    return this.terminal.red.bold("looking for the server...")("\n");
  }

  myMessage({ msg }) {
    return this.terminal("\n").gray.bold(`you > `).gray(msg)("\n");
  }

  userMessage({ msg, user }) {
    return this.terminal.bold(`${user} > `)(msg)("\n");
  }

  default(msg) {
    return this.terminal.bold(msg)("\n");
  }
}

module.exports = Messenger;
