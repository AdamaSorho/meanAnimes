import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private _authenticationService: AuthenticationService) {}

  get name() {
    return this._authenticationService.name;
  }

  isLoggedIn() {
    return this._authenticationService.isLoggedIn();
  }
}
