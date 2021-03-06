import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from './../auth/auth.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ENV } from './env.config';
import { PollModel } from './models/poll.model';

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
  // GET a users Polls
  getUserPolls$(user: string): Observable<PollModel> {
    return this.authHttp
      .get(`${ENV.BASE_API}${user}/polls`)
      .map(this._handleSuccess)
      .catch(this._handleError);
  }

  // POST a new poll
  postPoll$(poll: PollModel): Observable<PollModel> {
    return this.authHttp
      .post(`${ENV.BASE_API}poll/new`, poll)
      .map(this._handleSuccess)
      .catch(this._handleError);
  }
  // POST a vote to existing poll
  postVote$(id: string, obj: any) {
    return this.authHttp
      .put(`${ENV.BASE_API}poll/${id}`, obj)
      .map(this._handleSuccess)
      .catch(this._handleError);
  }

  // DELETE a poll option
  deletePoll$(id: string) {
    return this.authHttp
      .delete(`${ENV.BASE_API}poll/${id}`)
      .map(this._handleSuccess)
      .catch(this._handleError);
  }

  private _handleSuccess(res: Response) {
    return res.json();
  }

  private _handleError(err: Response | any) {
    const body = JSON.parse(err._body)
    const errorMsg = body.message || 'Error: Unable to complete request.';
    if (err.message && err.message.indexOf('No JWT present') > -1) {
      this.auth.login();
    }
    return Observable.throw(errorMsg);
  }
}
