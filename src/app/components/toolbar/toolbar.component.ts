import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime, filter } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.css"]
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @Output() search = new EventEmitter<string>();

  title = "github favorite manager";
  searchWord = new FormControl();
  private subscription: Subscription;

  constructor() {
    this.subscription = new Subscription();
  }

  ngOnInit() {
    const _sub = this.searchWord.valueChanges
      .pipe(
        debounceTime(500),
        filter(value => value !== "")
      )
      .subscribe(value => this.search.emit(value));

    this.subscription.add(_sub);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClickSearch() {
    if (this.searchWord.value) {
      this.search.emit(this.searchWord.value);
    }
  }
}
