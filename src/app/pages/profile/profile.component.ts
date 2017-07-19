import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { AuthService } from "./../../auth/auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  pageTitle = "Profile";

  constructor(public auth: AuthService, private title: Title) {}

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
  }
}
