import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { Title } from "@angular/platform-browser";
import { AuthService } from "./../../auth/auth.service";
import { Subscription } from "rxjs/Subscription";
import { ApiService } from "./../../core/api.service";
import { PollModel } from "./../../core/models/poll.model";

@Component({
  selector: "app-create-poll",
  templateUrl: "./create-poll.component.html",
  styleUrls: ["./create-poll.component.scss"]
})
export class CreatePollComponent implements OnInit {
  @Input() poll: PollModel;
  @Output() submitPoll = new EventEmitter();
  pollForm: PollModel;
  submitPollSub: Subscription;
  submitting: boolean;
  error: boolean;

  options = [];

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private title: Title
  ) {}

  ngOnInit() {}

  addOption(option: string) {
    if (option) {
      this.options.push({ title: option });
    }
  }

  submitForm() {
    this.submitting = true;
    this.submitPollSub = this.api
      .postPoll$(this.pollForm)
      .subscribe(
        data => this._handleSubmitSuccess(data),
        error => this._handleSubmitError(error)
      );
  }

  private _handleSubmitSuccess(res) {
    const eventObj = {
      poll: res
    };
    this.submitPoll.emit(eventObj);
    this.error = false;
    this.submitting = false;
  }

  private _handleSubmitError(err) {
    const eventObj = {
      error: err
    };
    this.submitPoll.emit(eventObj);
    console.error(err);
    this.submitting = false;
    this.error = true;
  }

  ngOnDestroy() {
    if (this.submitPollSub) {
      this.submitPollSub.unsubscribe();
    }
  }
}
