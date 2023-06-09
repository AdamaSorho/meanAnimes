import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/utils/Response';

@Injectable({
  providedIn: 'root'
})
export class AnimeDataService {
  private _baseUrl = "http://localhost:3000/api/animes";

  constructor(private _http: HttpClient) { }

  getAnimes(): Observable<Response> {
    const url = this._baseUrl;

    return this._http.get<Response>(url);
  }

  getAnime(animeId: string): Observable<Response> {
    const url = `${this._baseUrl}/${animeId}`;

    return this._http.get<Response>(url);
  }

  deleteAnime(animeId: string): Observable<Response> {
    const url = `${this._baseUrl}/${animeId}`;

    return this._http.delete<Response>(url);
  }
}
