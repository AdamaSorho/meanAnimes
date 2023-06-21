import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/models/Character';
import { CharactersDataService } from '../services/characters-data.service';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.css']
})
export class CharacterFormComponent implements OnInit {
  characterFormGroup!: FormGroup;
  isFormGroupLoaded: boolean = false;
  animeId!: string;
  characterId!: string;
  currentCharacter!: Character;
  error: boolean = false;
  errorMessage!: string;
  success: boolean = false;
  successMessage!: string;

  constructor(private _activatedRoute: ActivatedRoute, private _formBuilder: FormBuilder, private _characterService: CharactersDataService) {}

  ngOnInit(): void {
    this.animeId = this._activatedRoute.snapshot.params["animeId"];
    this.characterId = this._activatedRoute.snapshot.params["characterId"];
    if(this.characterId) {
      this.getCurrentCharacter();
    } else {
      this.initFormBuilder();
    }
  }

  private getCurrentCharacter() {
    this._characterService.getById(this.animeId, this.characterId).subscribe(
      {
        next: (response) => {
          if(response.error) {
            console.log("Error", response.message);
            this.error = true;
            this.errorMessage = response.message;
          } else {
            this.currentCharacter = response.data;
            this.error = false;
            this.errorMessage = "";
          }
        },
        error: (err) => console.log("Error", err),
        complete: () => this.initFormBuilder(),
      }
    )
  }

  private initFormBuilder() {
    this.characterFormGroup = this._formBuilder.group({
      name: [this.currentCharacter ? this.currentCharacter.name : "", [
        Validators.required,
        Validators.minLength(2),
      ]],
      gender: [this.currentCharacter ? this.currentCharacter.gender : "", [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1),
      ]],
      skills: this._formBuilder.array(this.initSkillsArrayForm()),
    });
    this.isFormGroupLoaded = true;
  }

  private initSkillsArrayForm() {
    const skillsForm = [];
    if(this.currentCharacter) {
      for(let skill of this.currentCharacter.skills) {
        skillsForm.push(this._formBuilder.control(skill, Validators.required));
      }
    } else {
      skillsForm.push(this._formBuilder.control("", Validators.required));
    }

    return skillsForm;
  }

  get name() {
    return this.characterFormGroup.get("name");
  }

  get gender() {
    return this.characterFormGroup.get("gender");
  }

  get skills() {
    return this.characterFormGroup.get("skills") as FormArray;
  }

  addSkill() {
    this.skills.push(this._formBuilder.control("", Validators.required));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  submitHandler() {
    const character = Character.fillFromFormGroup(this.characterFormGroup);
    console.log("Character", character);
    if(this.currentCharacter) {
      this._characterService.partialUpdate(this.animeId, this.characterId, character).subscribe({
        next: (response) => {
          if(response.error) {
            console.log("Next Error", response.message);
            this.error = true;
            this.errorMessage = response.message;
            this.success = false;
            this.successMessage = "";
          } else {
            this.error = false;
            this.errorMessage = "";
            this.success = true;
            this.successMessage = response.message;
          }
        },
        error: (err) => {
          console.log("Error", err)
          this.error = true;
          this.errorMessage = err;
          this.success = false;
          this.successMessage = "";
        },
        complete: () => {},
      });
    } else {
      this._characterService.add(this.animeId, character).subscribe({
        next: (response) => {
          if(response.error) {
            console.log("Next Error", response.message);
            this.error = true;
            this.errorMessage = response.message;
            this.success = false;
            this.successMessage = "";
          } else {
            this.error = false;
            this.errorMessage = "";
            this.success = true;
            this.successMessage = response.message;
          }
        },
        error: (err) => {
          console.log("Error", err)
          this.error = true;
          this.errorMessage = err.error.message;
          this.success = false;
          this.successMessage = "";
        },
        complete: () => {
          this.characterFormGroup.reset();
        },
      });
    }
  }
}
