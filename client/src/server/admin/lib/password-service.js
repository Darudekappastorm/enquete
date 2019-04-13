const crypto = require("crypto");

class PasswordService {
  static generate(input) {
    const salt = PasswordService.salt(16);
    const hash = PasswordService.sha512(input, salt);
    const s1 = salt.substring(0, 8);
    const s2 = salt.substring(8, salt.length);
    return s1 + hash + s2;
  }

  static validate(input, reference) {
    const s1 = reference.substring(0, 8);
    const s2 = reference.substring(reference.length - 8, reference.length);
    const hash = reference.substring(8, reference.length - 8);
    const result = this.sha512(input, s1 + s2);
    return result === hash;
  }

  static sha512(input, salt) {
    return crypto
      .createHmac("sha512", salt)
      .update(input)
      .digest("hex");
  }

  static salt(length) {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString("hex")
      .slice(0, length);
  }
}

module.exports = PasswordService;
