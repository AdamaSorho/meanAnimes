import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Auth } from 'src/models/Auth';
import { UserDataService } from '../services/user-data.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usernameValidator!: NgModel;
  passwordValidator!: NgModel;
  username: string = "";
  password: string = "";
  error: boolean = false;
  errorMessage!: string;

  constructor(private _userService: UserDataService, private _router: Router, 
    private _authenticationService: AuthenticationService) {}

  loginHandler() {
    const auth = new Auth(this.username, this.password);
    this._userService.login(auth).subscribe({
      next: (response) => {
        if(response.error) {
          this.error = true;
          this.errorMessage = response.message;
        } else {
          this.error = false;
          this.errorMessage = "";
          this._authenticationService.setLogin(response.data.token);
          this._router.navigate([""]);
        }
      },
      error: (err) => {
        this.error = true;
        console.log(err);
          this.errorMessage = err.error.message;
      }, 
      complete: () => {},
    })
  }
}
