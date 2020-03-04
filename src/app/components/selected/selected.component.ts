import { Component, OnInit, Input } from "@angular/core";
import { Repository } from "src/app/types/repository.type";
import { select_lists } from "./../../lists/select-list";

@Component({
  selector: "app-selected",
  templateUrl: "./selected.component.html",
  styleUrls: ["./selected.component.css"]
})
export class SelectedComponent implements OnInit {
  @Input() selected_item: Repository;
  @Input() selected_list: Repository[];
  @Input() order_number = "";

  constructor() {}

  ngOnInit() {}

  delete(item: Repository) {
    select_lists.forEach((k, index) => {
      if (k == item) {
        select_lists.splice(index, 1);
      }
    });
  }
}
