import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { AuthHttp } from "angular2-jwt";
import { AuthService } from "./../auth/auth.service";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { ENV } from "./env.config";
import { PollModel } from "./models/poll.model";

@Injectable()
export class ApiService {
  constructor(
    private http: Http,
    private authHttp: AuthHttp,
    private auth: AuthService
  ) {}

  // GET list of polls
  getPolls$(): Observable<PollModel[]> {
    return this.http
      .get(`${ENV.BASE_API}polls`)
      .map(this._handleSuccess)
      .catch(this._handleError);
  }
  // Get a single poll
  getPoll$(id: string): Observable<PollModel> {
    return this.http
      .get(`${ENV.BASE_API}poll/${id}`)
      .map(this._handleSuccess)
      .catch(this._handleError);
  }

  private _handleSuccess(res: Response) {
    return res.json();
  }

  private _handleError(err: Response | any) {
    const errorMsg = err.message || "Error: Unable to complete request.";
    if (err.message && err.message.indexOf("No JWT present") > -1) {
      this.auth.login();
    }
    return Observable.throw(errorMsg);
  }
}
