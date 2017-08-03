import { Component, OnInit, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ApiService } from "./../../core/api.service";
import { UtilsService } from "./../../core/utils.service";
import { Subscription } from "rxjs/Subscription";
import { PollModel } from "./../../core/models/poll.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit, OnDestroy {
  pageTitle = "Polls";
  pollListSub: Subscription;
  pollList: PollModel[];
  loading: boolean;
  error: boolean;

  constructor(
    private title: Title,
    public utils: UtilsService,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getPollList();
  }

  // Call ApiService to get all Polls
  private _getPollList() {
    this.loading = true;
    this.pollListSub = this.api.getPolls$().subscribe(
      res => {
        this.pollList = res;
        this.loading = false;
      },
      error => {
        console.error(error);
        this.loading = false;
        this.error = true;
      }
    );
  }

  // Unsub from events
  ngOnDestroy() {
    this.pollListSub.unsubscribe();
  }
}
