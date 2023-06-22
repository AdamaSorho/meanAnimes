import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchAnimeService {
  public search$ = new BehaviorSubject("");

  private search!: string;

  constructor() { }

  setSearch(search: string) {
    this.search = search;
  }

  getSearch() {
    return this.search;
  }
}
