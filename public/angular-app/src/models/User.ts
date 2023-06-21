import { FormGroup } from "@angular/forms";

export class User {
  #name!: string;
  #username!: string;
  #password!: string;

  get name() { return this.#name }
  get username() { return this.#username }
  get password() { return this.#password }

  set name(name) { this.#name = name; }
  set username(username) { this.#username = username; }
  set password(password) { this.#password = password; }

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  static fillFromFormGroup(form: FormGroup) {
    const user = new User(form.value.username, form.value.password);
    user.name = form.value.name;

    return user;
  }

  JSON() {
    return {
      name: this.name,
      username: this.username,
      password: this.password,
    };
  }
}