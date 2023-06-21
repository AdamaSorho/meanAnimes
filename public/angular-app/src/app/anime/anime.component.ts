import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Anime } from 'src/models/Anime';
import { AnimeDataService } from '../services/anime-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CharactersDataService } from '../services/characters-data.service';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css']
})
export class AnimeComponent implements OnInit {
  anime!: Anime;
  error: boolean = false;
  errorMessage!: string;
  success: boolean = false;
  successMessage!: string;
  isAnimeLoad: boolean = false;
  animeId!: string;

  @ViewChild("closeCharacterModal")
  closeCharacterModal!: ElementRef;
  @ViewChild("closeAnimeModal")
  closeAnimeModal!: ElementRef;

  constructor(
    private _animeService: AnimeDataService, 
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private _characterService: CharactersDataService) {}

  ngOnInit(): void {
    this.animeId = this._activatedRoute.snapshot.params["animeId"];
    this.getAnime();
  }

  private getAnime() {
    this._animeService.getAnime(this.animeId).subscribe({
      next: response => {
        if(response.error) {
          this.error = true;
          this.errorMessage = response.message;
          this.success = false;
          this.successMessage = "";
        } else {
          this.anime = response.data;
          this.error = false;
          this.errorMessage = "";
          this.success = false;
          this.successMessage = "";
        }
      },
      error: (err) => {
        this.error = true;
        this.errorMessage = err.error.message;
        this.success = false;
        this.successMessage = "";
      },
      complete: () => {
        this.isAnimeLoad = true;
      },
    });
  }
  isLoggedIn() {
    return this._authenticationService.isLoggedIn();
  }

  deleteAnimeHandler() {
    this.closeAnimeModal.nativeElement.click();
    this._animeService.deleteAnime(this.animeId).subscribe({
      next: (response) => {
        if(response.error) {
          this.error = true;
          this.errorMessage = response.message;
          this.success = false;
          this.successMessage = "";
        } else {
          this._router.navigate(["animes"]);
        }
      },
      error: (err) => {
        this.error = true;
        this.errorMessage = err.error.message;
        this.success = false;
        this.successMessage = "";
      },
      complete: () => {},
    });
  }

  deleteCharacterHandler(characterId: string) {
    this.closeCharacterModal.nativeElement.click();
    this._characterService.delete(this.animeId, characterId).subscribe({
      next: (response) => {
        if(response.error) {
          this.error = true;
          this.errorMessage = response.message;
          this.success = false;
          this.successMessage = "";
        } else {
          this.getAnime();
          this.error = false;
          this.errorMessage = "";
          this.success = true;
          this.successMessage = response.message;
          console.log("successMessage", response.message);
        }
      },
      error: (err) => {
        this.error = true;
        this.errorMessage = err.error.message;
        this.success = false;
        this.successMessage = "";
      },
      complete: () => { this.isAnimeLoad = true;},
    })
  }
}
