import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';


import { AuthenticationService } from '../services/authentication.service';
import { SearchAnimeService } from '../services/search-anime.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  search!: string;
  searchValidator!: NgModel;
  offset: number = parseInt(environment.DEFAULT_OFFSET);
  count: number = parseInt(environment.DEFAULT_COUNT);

  constructor(private _authenticationService: AuthenticationService,
    private _searchAnimeService: SearchAnimeService, private _router: Router) {}

  isLoggedIn() {
    return this._authenticationService.isLoggedIn();
  }

  logout() {
    this._authenticationService.logout();
  }

  searchHandler() {
    this._searchAnimeService.setSearch(this.search);
    this._searchAnimeService.search$.next(this.search);
    this._router.navigate(["animes"]);
  }

  navigateToAnimesPageHandler() {
    this.search = "";
    this.searchHandler();
  }
}
