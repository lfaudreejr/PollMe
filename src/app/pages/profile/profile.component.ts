import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { AuthService } from "./../../auth/auth.service";
import { ApiService } from "./../../core/api.service";
import { UtilsService } from "./../../core/utils.service";

import { PollModel } from "./../../core/models/poll.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  pageTitle = "Profile";
  userPolls: PollModel;
  loading: boolean;
  error: boolean;
  errorMsg: string;

  constructor(
    public auth: AuthService,
    public api: ApiService,
    public utils: UtilsService,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this.getUserPolls();
  }

  getUserPolls() {
    this.loading = true;
    this.api.getUserPolls$(this.auth.userProfile.name).subscribe(
      res => {
        this.userPolls = res;
        this.loading = false;
      },
      err => {
        console.error(err);
        this.loading = false;
        this.error = true;
        this.errorMsg = "There was an error retreiving user polls.";
      }
    );
  }
}
