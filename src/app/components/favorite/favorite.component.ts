import { Component, OnInit, Input } from "@angular/core";
import { Repository } from "./../../types/repository.type";
import { select_lists } from "./../../lists/select-list";
import { favorite_lists } from "./../../lists/favorite-list";

@Component({
  selector: "app-favorite",
  templateUrl: "./favorite.component.html",
  styleUrls: ["./favorite.component.css"]
})
export class FavoriteComponent implements OnInit {
  @Input() favo: Repository;
  @Input() favos: Repository[] = favorite_lists;
  @Input() selects: Repository[] = select_lists;

  constructor() {}

  ngOnInit() {}

  show: Boolean = true;

  remove(item: Repository, from: Repository[]) {
    from.forEach((k, index) => {
      if (k == item) {
        from.splice(index, 1);
      }
    });
    localStorage.setItem("json", JSON.stringify(favorite_lists));
  }
}
