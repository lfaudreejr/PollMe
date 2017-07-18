import { Component, OnInit, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { AuthService } from "./../../auth/auth.service";
import { ApiService } from "./../../core/api.service";
import { UtilsService } from "./../../core/utils.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { PollModel } from "./../../core/models/poll.model";

@Component({
  selector: "app-poll",
  templateUrl: "./poll.component.html",
  styleUrls: ["./poll.component.scss"]
})
export class PollComponent implements OnInit {
  pageTitle: string;
  id: string;
  routeSub: Subscription;
  pollSub: Subscription;
  poll: PollModel;
  loading: boolean;
  error: boolean;

  constructor(
    private route: ActivatedRoute,
    public auth: AuthService,
    private api: ApiService,
    private title: Title,
    public utils: UtilsService
  ) {}

  ngOnInit() {
    // Set poll Id from route params and subscribe
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params["id"];
      this._getPoll();
    });
  }

  // Pie
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType: string = "pie";

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  private _getPoll() {
    this.loading = true;
    this.pollSub = this.api.getPoll$(this.id).subscribe(
      res => {
        this.poll = res;
        console.log(res);
        this.poll.options.forEach(option => {
          this.pieChartLabels.push(option.title);
          this.pieChartData.push(option.count);
        });
        this._setPageTitle(this.poll.title);
        this.loading = false;
      },
      err => {
        console.error(err);
        this.loading = false;
        this.error = true;
        this._setPageTitle("Poll Details");
      }
    );
  }

  private _setPageTitle(title: string) {
    this.pageTitle = title;
    this.title.setTitle(title);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.pollSub.unsubscribe();
  }
}
