import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anime } from 'src/models/Anime';
import { Response } from 'src/utils/Response';

@Injectable({
  providedIn: 'root'
})
export class AnimeDataService {
  private _baseUrl = "http://localhost:3000/api/animes";

  constructor(private _http: HttpClient) { }

  getAnimes(offset: number, count: number): Observable<Response> {
    const url = `${this._baseUrl}?offset=${offset}&count=${count}`;

    return this._http.get<Response>(url);
  }

  getCount(): Observable<Response> {
    const url = `${this._baseUrl}/count`;

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

  saveAnime(anime: Anime): Observable<Response> {
    const url = `${this._baseUrl}`;
    
    return this._http.post<Response>(url, anime.JSON());
  }

  fullUpdate(_id: string, anime: Anime): Observable<Response> {
    const url = `${this._baseUrl}/${_id}`;

    return this._http.put<Response>(url, anime.JSON());
  }

  partialUpdate(_id: string, anime: Anime): Observable<Response> {
    const url = `${this._baseUrl}/${_id}`;
    console.log("anime", anime.JSON());
    return this._http.patch<Response>(url, anime.JSON());
  }
}
