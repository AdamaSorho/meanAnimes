export class Auth {
  #username!: string;
  #password!: string;

  get username() { return this.#username; }
  get password() { return this.#password; }

  set username(username) { this.#username = username; }
  set password(password) { this.#password = password; }

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  JSON() {
    return {
      username: this.username,
      password: this.password,
    };
  }
}