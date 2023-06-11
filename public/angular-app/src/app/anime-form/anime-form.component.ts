import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-anime-form',
  templateUrl: './anime-form.component.html',
  styleUrls: ['./anime-form.component.css']
})
export class AnimeFormComponent implements OnInit {
  animeFormGroup!: FormGroup;
  isFormGroupLoaded: boolean = false;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initFormGroup();
  }

  submitHandler() {
    console.log("Form values", this.animeFormGroup.value);
  }

  private initFormGroup() {
    this.animeFormGroup = this._formBuilder.group({
      title: ["", Validators.required],
      releaseYear: ["", [
        Validators.minLength(4), 
        Validators.maxLength(4)
      ]],
      releaseCountry: ["", [
        Validators.minLength(2),
      ]],
      skill: [""],
    });

    this.isFormGroupLoaded = true;
  }

  get title() {
    return this.animeFormGroup.get("title");
  }

  get releaseYear() {
    return this.animeFormGroup.get("releaseYear");
  }

  get releaseCountry() {
    return this.animeFormGroup.get("releaseCountry");
  }
}


