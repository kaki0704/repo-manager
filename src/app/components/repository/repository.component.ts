import { Component, OnInit, Input } from '@angular/core';
import { Repository } from './../../types/repository.type';
import { select_lists } from './../../lists/select-list';
import { favorite_lists, counter1 } from './../../lists/favorite-list';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {
  @Input() repo: Repository;
  count = function(){
    let counter = 0
    for(let item of favorite_lists){
      if(item.id == this.repo.id){
        counter++
      }
    }
    return counter
  }
  show: Boolean = true
  shown() :Boolean{
    if(favorite_lists.length > 0){
      for(let i of favorite_lists){
        if(i.id == this.repo.id){
          return false
        }
      }
      return true
    }
    return true
  }

  constructor() {
    
   }

  ngOnInit() {
  }

  add(repository: Repository){
    let addable: Boolean = true
    if(favorite_lists.length+select_lists.length+1 > 10){
      addable = false
      alert("お気に入りリストには10件までしか登録できません")
    }
    for(let item of select_lists){
      if(item == repository){
        addable = false
      }
    }
    if(addable){
      select_lists.push(repository)
      select_lists.forEach((item, index)=>{
        if(item.order_number != index+1){
          item.order_number = index+1
        }
      })      
    }
    
    console.log(this.repo.id)
    for(let i of favorite_lists){
      console.log(i.id)
    }
  }
}

