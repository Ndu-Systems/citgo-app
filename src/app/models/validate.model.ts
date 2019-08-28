export class ValiDatePassword {
  password: string = "";
  constructor(password: string) {
    this.password = password;
  }
  validate() {
    return {
      DIGITS: {
        error: "The password must contain at least 1 numeric character",
        pass: this.hasDitgits(this.password)
      },
      LOWER: {
        error:
          "The password must contain at least 1 lowercase alphabetical character",
        pass: this.hasLowerCase(this.password)
      },
      UPPER: {
        error:
          "The password must contain at least 1 uppercase alphabetical character",
        pass: this.hasUpperCaseCase(this.password)
      },
      SPECIAL: {
        error: "The password must contain at least one special character",
        pass: this.hasSpecialChar(this.password)
      },
      LENGHT: {
        error: "The password must at least contain eight characters",
        pass: this.password.length >= 8
      }
    };
  }
  hasLowerCase(str) {
    return /[a-z]/.test(str);
  }
  hasUpperCaseCase(str) {
    return /[A-Z]/.test(str);
  }
  hasSpecialChar(str) {
    return /\W|_/g.test(str);
  }
  hasDitgits(str) {
    return /[0-9]/.test(str);
  }
}
