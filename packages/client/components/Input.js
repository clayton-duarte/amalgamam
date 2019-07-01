
class Input {
  constructor(terminal, store) {
    this.terminal = terminal;
    this.store = store;
  };

  resetListeners() {
    this.terminal.removeAllListeners();
    this.terminal.grabInput(true);
  };

  saveUserInput(input) {
    this.terminal(input);
    this.store.setText(this.store.getText() + input);
  };

  backDelete() {
    this.terminal.backDelete();
    this.store.setText(this.store.getText().slice(0, -1));
  };

  processExit(callback) {
    callback();
    this.terminal.processExit(0);
  };

  submit(callback) {
    const text = this.store.getText();
    if(text) {
      callback(text);
      this.terminal.grabInput(false);
      this.terminal.eraseLine();
      this.store.setText('');
      this.terminal.up(1);
    }
  };
};

module.exports = Input;
