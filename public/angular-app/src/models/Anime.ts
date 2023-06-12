import { FormGroup } from "@angular/forms";
import { Character } from "./Character";

export class Anime {
  #_id!: string;
  #title!: string;
  #releaseYear!: number;
  #releaseCountry!: string;
  #characters!: [Character];

  get _id() { return this.#_id; }
  get title() { return this.#title; }
  get releaseYear() { return this.#releaseYear; }
  get releaseCountry() { return this.#releaseCountry; }
  get characters() { return this.#characters; }

  set _id(_id: string) { this.#_id = _id; }
  set title(title: string) { this.#title = title; }
  set releaseYear(releaseYear: number) { this.#releaseYear = releaseYear; }
  set releaseCountry(releaseCountry: string) { this.#releaseCountry = releaseCountry; }
  set characters(characters: [Character]) { this.#characters = characters; }

  constructor(title: string) {
    this.title = title;
  } 
 
  static fillFromFormGroup(form: FormGroup) {
    const anime = new Anime(form.value.title);
    anime.title = form.value.title;
    anime.releaseYear = form.value.releaseYear;
    anime.releaseCountry = form.value.releaseCountry;

    return anime;
  }

  public JSON() {
    return {
      _id: this._id,
      title: this.title,
      releaseYear: this.releaseYear,
      releaseCountry: this.releaseCountry,
      characters: this.characters,
    };
  }
}