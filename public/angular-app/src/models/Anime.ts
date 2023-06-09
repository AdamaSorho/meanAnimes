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

  constructor(_id: string, title: string) {
    this._id = _id;
    this.title = title;
  } 
}