import { FormGroup } from "@angular/forms";

export class Character {
  #_id!: string;
  #name!: string;
  #gender!: string;
  #skills!: [string];

  get _id() { return this.#_id; }
  get name() { return this.#name; }
  get gender() { return this.#gender; }
  get skills() { return this.#skills; }

  set _id(_id: string) { this.#_id = _id; }
  set name(name: string) { this.#name = name; }
  set gender(gender: string) { this.#gender = gender; }
  set skills(skills: [string]) { this.#skills = skills; }

  constructor(name: string, gender: string) {
    this.name = name;
    this.gender = gender;
  }

  static fillFromFormGroup(form: FormGroup) {
    const character = new Character(form.value.name, form.value.gender);
    character.skills = form.value.skills;

    return character;
  }

  JSON() {
    return {
      name: this.name,
      gender: this.gender,
      skills: this.skills,
    };
  }
}