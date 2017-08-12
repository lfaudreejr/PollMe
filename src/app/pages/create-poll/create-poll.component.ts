import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { AuthService } from "./../../auth/auth.service";
import { Subscription } from "rxjs/Subscription";
import { ApiService } from "./../../core/api.service";
import { PollModel } from "./../../core/models/poll.model";
import { forbiddenWordValidator } from "./../../shared/forbidden-word.directive";

@Component({
  selector: "app-create-poll",
  templateUrl: "./create-poll.component.html",
  styleUrls: ["./create-poll.component.scss"]
})
export class CreatePollComponent implements OnInit, OnDestroy {
  @Input() poll: PollModel;
  @Output() submitPoll = new EventEmitter();
  submitPollSub: Subscription;
  submitPollObj: PollModel;
  submitting: boolean;
  error: boolean;
  pollForm: FormGroup;

  options = [];

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private title: Title,
    private fb: FormBuilder,
    public router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.pollForm = this.fb.group({
      title: new FormControl("", [
        Validators.required,
        forbiddenWordValidator(
          /fuck|dick|shit|nigger|bitch|ass|pussy|cock|spic|twat|cunt/i
        )
      ]),
      options: new FormControl("", [
        forbiddenWordValidator(
          /fuck|dick|shit|nigger|bitch|ass|pussy|cock|spic|twat|cunt/i
        )
      ])
    });
  }

  saveOptions(option) {
    if (!option) {
      return 1;
    }
    this.options.push({ title: option, count: 0 });
    console.log(this.options);
    this.pollForm.get("options").setValue(null);
  }

  _getSubmitObj() {
    return new PollModel(
      this.pollForm.get("title").value,
      this.options,
      this.auth.userProfile.name,
      []
    );
  }

  submitForm() {
    this.submitting = true;
    this.submitPollObj = this._getSubmitObj();
    console.log(this.submitPollObj);
    this.submitPollSub = this.api
      .postPoll$(this.submitPollObj)
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
    this.router.navigate(["/"]);
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
