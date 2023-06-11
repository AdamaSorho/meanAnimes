import { AnimeFormComponent } from "./anime-form/anime-form.component";
import { AnimeComponent } from "./anime/anime.component";
import { AnimesComponent } from "./animes/animes.component";
import { HomeComponent } from "./home/home.component";

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
    path: "**",
    component: HomeComponent,
  },
];