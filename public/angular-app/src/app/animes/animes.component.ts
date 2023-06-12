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
  offset: number = 0;
  count: number = 2;
  isNext: boolean = true;
  totalAnimes!: number;
  // test: string = '2';

  constructor(private _animeService: AnimeDataService) {
    this.animes = new Array<Anime>();
  }

  ngOnInit(): void {
    this.getCount();
    this.getAnimes();
  }

  private getCount() {
    this._animeService.getCount().subscribe(response => {
      if(response.error) {
        console.log("Error", response.message);
      } else {
        this.totalAnimes = response.data;
      }
    });
  }

  private getAnimes() {
    this.animes = new Array<Anime>();
    this._animeService.getAnimes(this.offset, this.count).subscribe(response => {
      if(response.error) {
        console.log("error", response.message);
      } else {
        this.animes.push(...response.data);
      }
      this.updateNext();
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

  // testHandler() {
  //   console.log("test", this.test);
  // }
}
