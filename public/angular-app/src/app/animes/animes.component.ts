import { Component, OnInit } from '@angular/core';
import { Anime } from 'src/models/Anime';
import { AnimeDataService } from '../services/anime-data.service';
import { AuthenticationService } from '../services/authentication.service';
import { SearchAnimeService } from '../services/search-anime.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-animes',
  templateUrl: './animes.component.html',
  styleUrls: ['./animes.component.css']
})
export class AnimesComponent implements OnInit {
  animes!: Anime[];
  offset: number = parseInt(environment.DEFAULT_OFFSET);
  count: number = parseInt(environment.DEFAULT_COUNT);
  isNext: boolean = true;
  totalAnimes!: number;
  search!: string;

  constructor(private _animeService: AnimeDataService, 
    private _authenticationService: AuthenticationService,
    private _searchAnimeService: SearchAnimeService) {
    this.animes = new Array<Anime>();
  }

  ngOnInit(): void {
    this.search = this._searchAnimeService.getSearch();
    this.getCount();
    this.getAnimes();
  }

  isLoggedIn() {
    return this._authenticationService.isLoggedIn();
  }

  private getCount() {
    this._animeService.getCount(this.search).subscribe(response => {
      if(response.error) {
        console.log("Error", response.message);
      } else {
        this.totalAnimes = response.data;
      }
    });
  }

  private getAnimes() {
    this.animes = new Array<Anime>();
    if (!this.search) {
      this.search = "";
    }
    this._animeService.getAnimes(this.offset, this.count, this.search).subscribe(response => {
      if(response.error) {
        console.log("error", response.message);
      } else {
        this.animes.push(...response.data);
      }
      this.updateNext();
      this._searchAnimeService.setSearch("");
    });
  }

  countUpdateHandler() {
    this.getAnimes();
  }

  previous() {
    this.offset = parseInt(this.offset.toString()) - parseInt(this.count.toString());
    this.getAnimes();
  }

  next() {
    this.offset = parseInt(this.count.toString()) + parseInt(this.offset.toString());
    this.getAnimes();
  }

  private updateNext() {
    const count = parseInt(this.count.toString());
    const offset = parseInt(this.offset.toString());
    if(this.totalAnimes <= count + offset) {
      this.isNext = false;
    } else {
      this.isNext = true;
    }
  }
}
