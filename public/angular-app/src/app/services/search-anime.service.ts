import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchAnimeService {

  private search!: string;

  constructor() { }

  setSearch(search: string) {
    this.search = search;
  }

  getSearch() {
    return this.search;
  }
}
