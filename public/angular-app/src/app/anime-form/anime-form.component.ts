import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Anime } from 'src/models/Anime';
import { AnimeDataService } from '../services/anime-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-anime-form',
  templateUrl: './anime-form.component.html',
  styleUrls: ['./anime-form.component.css']
})
export class AnimeFormComponent implements OnInit {
  animeFormGroup!: FormGroup;
  isFormGroupLoaded: boolean = false;
  errorMessage!: string;
  error: boolean = false;
  successMessage!: string;
  success: boolean = false;
  currentAnime!: Anime;
  animeId!: string;

  constructor(private _formBuilder: FormBuilder, private _animeService: AnimeDataService,
    private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.animeId = this._activatedRoute.snapshot.params["animeId"];
    if(this.animeId) {
      this.getAnime();
    } else {
      this.initFormGroup();
    }
  }

  private getAnime() {
    this._animeService.getAnime(this.animeId).subscribe(response => {
      if(response.error) {
        console.log("Error", response.message);
      } else {
        this.currentAnime = response.data;
      }
      this.initFormGroup();
    })
  }

  submitHandler() {
    const anime = Anime.fillFromFormGroup(this.animeFormGroup);
    if(this.animeId) {
      this.updateAnime(this.animeId, anime);
    } else {
     this.saveAnime(anime); 
    }
  }

  private saveAnime(anime: Anime) {
    this._animeService.saveAnime(anime).subscribe(response => {
      if(response.error) {
        console.log("Error", response.message);
        this.error = true;
        this.errorMessage = response.message;
        this.success = false;
        this.successMessage = "";
      } else {
        this.error = false;
        this.errorMessage = "";
        this.success = true;
        this.successMessage = response.message;
        this.animeFormGroup.reset();
      }
    });
  }

  private updateAnime(_id: string, anime: Anime) {
    this._animeService.partialUpdate(_id, anime).subscribe(response => {
      if(response.error) {
        console.log("Error", response.message);
        this.error = true;
        this.errorMessage = response.message;
        this.success = false;
        this.successMessage = "";
      } else {
        this.error = false;
        this.errorMessage = "";
        this.success = true;
        this.successMessage = response.message;
      }
    });
  }

  private initFormGroup() {
    this.animeFormGroup = this._formBuilder.group({
      title: [this.currentAnime ? this.currentAnime.title : "", Validators.required],
      releaseYear: [this.currentAnime ? this.currentAnime.releaseYear : "", [
        Validators.minLength(4), 
        Validators.maxLength(4),
        Validators.required,
      ]],
      releaseCountry: [this.currentAnime ? this.currentAnime.releaseCountry : "", [
        Validators.minLength(2),
      ]],
    });

    this.isFormGroupLoaded = true;
  }

  get title() {
    return this.animeFormGroup.get("title");
  }

  get releaseYear() {
    return this.animeFormGroup.get("releaseYear");
  }

  get releaseCountry() {
    return this.animeFormGroup.get("releaseCountry");
  }
}


