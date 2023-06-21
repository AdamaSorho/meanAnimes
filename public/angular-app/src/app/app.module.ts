import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AnimesComponent } from './animes/animes.component';
import { AnimeComponent } from './anime/anime.component';
import { AnimeFormComponent } from './anime-form/anime-form.component';
import { routes } from './app.routes';
import { CharacterFormComponent } from './character-form/character-form.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavigationComponent,
    AnimesComponent,
    AnimeComponent,
    AnimeFormComponent,
    CharacterFormComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
