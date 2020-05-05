import Cryptr from "cryptr";

class Safe {
  constructor(_SECRET_) {
    this.cryptr = new Cryptr(_SECRET_);
  }

  encrypt(data) {
    const stringData = typeof data === "string" ? data : JSON.stringify(data);
    return this.cryptr.encrypt(stringData);
  }

  decrypt(data) {
    const decryptedData = this.cryptr.decrypt(data);
    if (decryptedData.includes("{")) return JSON.parse(decryptedData);
    return decryptedData;
  }
}

export default Safe;
