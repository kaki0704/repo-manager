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
  show = true
  
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
  }

  search(word: string) {
    console.log(`search: ${word}`);
    this.repos$ = this.githubApiService.searchRepos(word);  
  }

  private save(){
    localStorage.setItem('json', JSON.stringify(this.favorite_list));
    alert("お気に入りリストに追加しました")
  }

  add(){
    select_lists.forEach((k, index) =>{
      this.favorite_list.push(k);
      console.log(index)
    })
    for (var i = select_lists.length - 1; i >= 0; i--) {
      select_lists.splice(i, 1);
    }

    this.favorite_list.sort(function(a, b) {
      if (a.order_number > b.order_number) {
        return 1;
      } else {
        return -1;
      }
    })
    this.save()
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