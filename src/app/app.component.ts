import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { GithubApiService } from './services/github-api.service';
import { Repository } from './types/repository.type';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  repos$: Observable<Repository[]>;
  showDisclaimer: boolean = true;
  selected :Repository[] = new Array();
  list :Repository[] =new Array();
  favorite_list :Repository[] = new Array();
  show :boolean = false

  
  constructor(private githubApiService: GithubApiService) {
    if(localStorage.getItem('json') == null){
      localStorage.setItem('json', JSON.stringify(this.favorite_list));
    }
    var data = localStorage.getItem('json');
    this.favorite_list = JSON.parse(data);
  }

  ngOnInit() {
    
  }

  search(word: string) {
    console.log(`search: ${word}`);
    this.repos$ = this.githubApiService.searchRepos(word);
  }

  onClick(favorite: Repository){
    let repo_item = {
      id: favorite.id,
      name: favorite.name,
      full_name: favorite.full_name,
      description: favorite.description,
      url: favorite.url,
      stargazers_count: favorite.stargazers_count,
      forks_count: favorite.forks_count
    }
    
    this.list.push(repo_item)
    let values = [];
    this.selected = this.list.filter(e => {
    if (values.indexOf(e["id"]) === -1) {
      values.push(e["id"]);
      return e;
      }
    });
    this.show = true
    console.log(this.selected)
    console.log(this.favorite_list)
  }

  save(){
    localStorage.setItem('json', JSON.stringify(this.favorite_list));
  }

  add(){
    for(let item of this.selected){
      console.log(item)
      console.log(this.selected)
      console.log(this.favorite_list)
      this.favorite_list.push(item)
    }
  }
}