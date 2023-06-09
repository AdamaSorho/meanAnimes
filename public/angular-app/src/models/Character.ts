export class Character {
  #name!: string;
  #gender!: string;
  #skills!: [string];

  get name() { return this.#name; }
  get gender() { return this.#gender; }
  get skills() { return this.#skills; }

  set name(name: string) { this.#name = name; }
  set gender(gender: string) { this.#gender = gender; }
  set skills(skills: [string]) { this.#skills = skills; }

  constructor(name: string, gender: string) {
    this.name = name;
    this.gender = gender;
  }
}