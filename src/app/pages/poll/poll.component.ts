import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { AuthService } from "./../../auth/auth.service";
import { ApiService } from "./../../core/api.service";
import { UtilsService } from "./../../core/utils.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { PollModel } from "./../../core/models/poll.model";

@Component({
  selector: 'app-poll',
  templateUrl: "./poll.component.html",
  styleUrls: ["./poll.component.scss"]
})
export class PollComponent implements OnInit, OnDestroy {
  pageTitle: string;
  id: string;
  routeSub: Subscription;
  pollSub: Subscription;
  poll: PollModel;
  loading: boolean;
  error: boolean;
  errorMsg: string;
  submitVoteObj: any;
  public myPoll = false;
  // Pie
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType = 'pie';

  constructor(
    private route: ActivatedRoute,
    public auth: AuthService,
    private api: ApiService,
    private title: Title,
    public utils: UtilsService,
    public router: Router
  ) {}

  ngOnInit() {
    // Set poll Id from route params and subscribe
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this._getPoll();
    });
  }

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
          this.pieChartLabels.push(option.title.toString());
          this.pieChartData.push(option.count.toString());
        });
        this._setPageTitle(this.poll.title);
        if (this.auth.userProfile) {
          if (this.auth.userProfile.name === this.poll.owner) {
            this.myPoll = true;
          }
        }
        this.loading = false;
      },
      err => {
        console.error(err);
        this.loading = false;
        this.error = true;
        this.errorMsg = 'There was an error retreiving this poll.';
        this._setPageTitle('Poll Details');
      }
    );
  }

  makeVote(option: string) {
    if (!this.auth.userProfile) {
      this.auth.login();
    }
    this.loading = true;
    this.submitVoteObj = {
      title: this.poll.title,
      option: option,
      voter: this.auth.userProfile.name
    };
    console.log(this.submitVoteObj);
    this.api.postVote$(this.poll._id, this.submitVoteObj).subscribe(
      res => {
        this.poll = res;
        this.poll.options.forEach(option => {
          for (let i = 0; i < this.pieChartLabels.length; i++) {
            if (this.pieChartLabels[i] === option.title.toString()) {
              this.pieChartData[i] = option.count;
            }
          }
        });
        this._setPageTitle(this.poll.title);
        this.loading = false;
      },
      err => {
        console.error(err);
        this.loading = false;
        this.error = true;
        this.errorMsg = 'You have already voted on this poll.';
        this._setPageTitle('Poll Details');
      }
    );
  }

  deletePoll() {
    this.api.deletePoll$(this.poll._id).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/']);
      },
      error => console.error(error)
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
