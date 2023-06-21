import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Character } from 'src/models/Character';
import { Response } from 'src/utils/Response';

@Injectable({
  providedIn: 'root'
})
export class CharactersDataService {
  private _baseUrl: string = `${environment.BASE_URL}/animes`;

  constructor(private _http: HttpClient) { }

  getById(animeId: string, characterId: string): Observable<Response> {
    const url: string = `${this._baseUrl}/${animeId}/characters/${characterId}`;

    return this._http.get<Response>(url);
  }

  add(animeId: string, character: Character): Observable<Response> {
    const url = `${this._baseUrl}/${animeId}/characters`;

    return this._http.post<Response>(url, character.JSON());
  }

  fullUpdate(animeId: string, characterId: string, character: Character): Observable<Response> {
    const url: string = `${this._baseUrl}/${animeId}/characters/${characterId}`;

    return this._http.put<Response>(url, character.JSON());
  }

  partialUpdate(animeId: string, characterId: string, character: Character): Observable<Response> {
    const url: string = `${this._baseUrl}/${animeId}/characters/${characterId}`;

    return this._http.patch<Response>(url, character.JSON());
  }

  delete(animeId: string, characterId: string): Observable<Response> {
    const url: string = `${this._baseUrl}/${animeId}/characters/${characterId}`;

    return this._http.delete<Response>(url);
  }
}
