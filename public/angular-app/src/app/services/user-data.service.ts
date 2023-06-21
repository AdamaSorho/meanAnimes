import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from 'src/models/Auth';
import { User } from 'src/models/User';
import { Response } from 'src/utils/Response';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private _baseUrl: string = `${environment.BASE_URL}/users`;

  constructor(private _http: HttpClient) { }

  register(user: User): Observable<Response> {
    const url = `${this._baseUrl}`;

    return this._http.post<Response>(url, user.JSON());
  }

  login(auth: Auth): Observable<Response> {
    const url: string = `${this._baseUrl}/login`;

    return this._http.post<Response>(url, auth.JSON());
  }
}
