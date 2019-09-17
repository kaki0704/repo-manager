import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { GithubApiService } from './services/github-api.service';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { RepositoryComponent } from './components/repository/repository.component';
import { SelectedComponent } from './components/selected/selected.component';
import { FavoriteComponent } from './components/favorite/favorite.component';

import { FormsModule }   from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    RepositoryComponent,
    SelectedComponent,
    FavoriteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [GithubApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }