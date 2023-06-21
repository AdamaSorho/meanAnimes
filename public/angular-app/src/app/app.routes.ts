import { AnimeFormComponent } from "./anime-form/anime-form.component";
import { AnimeComponent } from "./anime/anime.component";
import { AnimesComponent } from "./animes/animes.component";
import { CharacterFormComponent } from "./character-form/character-form.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

export const routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "animes",
    component: AnimesComponent,
  },
  {
    path: "animes/:animeId",
    component: AnimeComponent,
  },
  {
    path: "create-anime",
    component: AnimeFormComponent,
  },
  {
    path: "update-anime/:animeId",
    component: AnimeFormComponent,
  },
  {
    path: "add-character/:animeId",
    component: CharacterFormComponent,
  },
  {
    path: 'update-character/:animeId/:characterId',
    component: CharacterFormComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "**",
    component: HomeComponent,
  },
];