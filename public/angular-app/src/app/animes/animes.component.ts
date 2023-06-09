import { Component, OnInit } from '@angular/core';
import { Anime } from 'src/models/Anime';
import { AnimeDataService } from '../anime-data.service';

@Component({
  selector: 'app-animes',
  templateUrl: './animes.component.html',
  styleUrls: ['./animes.component.css']
})
export class AnimesComponent implements OnInit {
  animes!: Anime[];

  constructor(private _animeService: AnimeDataService) {
    this.animes = new Array<Anime>();
  }

  ngOnInit(): void {
    this.getAnimes();
  }

  private getAnimes() {
    this.animes = new Array<Anime>();
    this._animeService.getAnimes().subscribe(response => {
      if(response.error) {
        console.log("error", response.message);
      } else {
        this.animes.push(...response.data);
      }
    });
  }
}
