import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User } from 'src/models/User';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userFormGroup!: FormGroup;
  error: boolean = false;
  errorMessage!: string;
  success: boolean = false;
  successMessage!: string;
  isFormGroupLoaded: boolean = false;

  constructor(private _formBuilder: FormBuilder, private _userService: UserDataService) {}

  ngOnInit(): void {
    this.initFormGroup();
  }

  private initFormGroup() {
    this.userFormGroup = this._formBuilder.group({
      name: [""],
      username: ["", [
        Validators.required
      ]],
      password: ["", [
        Validators.required
      ]],
      confirmPassword: ["", [
        Validators.required,
        this.checkPasswords()
      ]],
    });
    this.isFormGroupLoaded = true;
  }

  get name() {
    return this.userFormGroup.get("name");
  }

  get username() {
    return this.userFormGroup.get("username");
  }

  get password() {
    return this.userFormGroup.get("password");
  }

  get confirmPassword() {
    return this.userFormGroup.get("confirmPassword");
  }

  submitHandler() {
    const user = User.fillFromFormGroup(this.userFormGroup);
    this._userService.register(user).subscribe({
      next: (response) => {
        if(response.error) {
          this.error = true;
          this.errorMessage = response.message;
          this.success = false;
          this.successMessage = "";
        } else {
          this.error = false;
          this.errorMessage = "";
          this.success = true;
          this.successMessage = response.message;
          this.userFormGroup.reset();
        }
      },
      error: (err) => {
        this.error = true;
          this.errorMessage = err.error.message;
          this.success = false;
          this.successMessage = "";
      },
      complete: () => {},
    })
  }

  checkPasswords(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = this.userFormGroup ? this.userFormGroup.get("password")?.value : "";
      const confirmPassword = control?.value;
  
      return password === confirmPassword ? null : {notSame: true};
    };
  }
}
