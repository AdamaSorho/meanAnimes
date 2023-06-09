import { Component, OnInit } from '@angular/core';
import { Anime } from 'src/models/Anime';
import { AnimeDataService } from '../anime-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css']
})
export class AnimeComponent implements OnInit {
  anime!: Anime;

  constructor(private _animeService: AnimeDataService, private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this._animeService.getAnime(this._activatedRoute.snapshot.params["animeId"]).subscribe(response => {
      if(response.error) {
        console.log("error", response.message);
      } else {
        this.anime = response.data;
      }
    });
  }
}
