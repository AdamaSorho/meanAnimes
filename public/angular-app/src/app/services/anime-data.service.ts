import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Anime } from 'src/models/Anime';
import { Response } from 'src/utils/Response';

@Injectable({
  providedIn: 'root'
})
export class AnimeDataService {
  private _baseUrl = `${environment.BASE_URL}/animes`;

  constructor(private _http: HttpClient) { }

  getAnimes(offset: number, count: number, search: string = ""): Observable<Response> {
    let url = `${this._baseUrl}?offset=${offset}&count=${count}`;
    if("" !== search) {
      url += `&search=${search}`;
    }

    return this._http.get<Response>(url);
  }

  getCount(search: string = ""): Observable<Response> {
    let url = `${this._baseUrl}/count`;
    if("" !== search) {
      url += `?search=${search}`;
    }

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

    return this._http.patch<Response>(url, anime.JSON());
  }
}
