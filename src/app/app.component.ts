import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { GithubApiService } from './services/github-api.service';
import { Repository } from './types/repository.type';
import { select_lists } from './lists/select-list'
import { favorite_lists } from './lists/favorite-list'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  @Input() repos$: Observable<Repository[]>;
  @Input() selected :Repository[] = select_lists 
  list :Repository[] =new Array();
  @Input() favorite_list :Repository[] = favorite_lists
  show :boolean = false

  
  constructor(private githubApiService: GithubApiService) {
    if(localStorage.getItem('json') == null){
      localStorage.setItem('json', JSON.stringify(this.favorite_list));
    }
    var data = localStorage.getItem('json');
    let tmp_list = JSON.parse(data);
    for(let item of tmp_list){
      favorite_lists.push(item)
    }
  }

  ngOnInit() {
    console.log(this.favorite_list)
  }

  search(word: string) {
    console.log(`search: ${word}`);
    this.repos$ = this.githubApiService.searchRepos(word);
    console.log(this.repos$)
    
    
  }

  onClick(favorite: Repository){
    if(this.favorite_list.length+this.selected.length+1 > 10){
      alert("お気に入りリストには10件までしか登録できません")
    }
    let addable: Boolean = true
    for(let item of this.selected){
      if(item == favorite){
        addable = false
      }
    }
    if(addable){
      this.selected.push(favorite)
    }
    this.show = true
  }

  save(){
    localStorage.setItem('json', JSON.stringify(this.favorite_list));
    alert("リポジトリを保存しました")
  }

  add(){
    this.selected.forEach((k, index) =>{
        this.favorite_list.push(k);
      }
    )
    this.selected = []
    this.show = false
  }

  remove(item: Repository, from: Repository[]){
    from.forEach((k, index) =>{
      if(k == item){
        from.splice(index, 1)
      }
    })
  }

  delete(item: Repository){
    this.selected.forEach((k, index) =>{
      if(k == item){
        this.selected.splice(index, 1)
      }
    })
  }
}