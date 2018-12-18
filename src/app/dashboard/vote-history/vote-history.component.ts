import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AuthService } from 'src/app/services/auth.service'
import config from '../../app.config'
import { getPages, changePage, disableNxtBtn, tablePageSize } from '../../utils/pagination'

@Component({
  selector: 'app-vote-history',
  templateUrl: './vote-history.component.html',
  styleUrls: ['./vote-history.component.css']
})
export class VoteHistoryComponent implements OnInit {
  public successfulVotes = []
  public failedVotes = []
  public successVotesPage = { page: 1 }
  public failedVotesPage = { page: 1 }
  public tablePageSize = tablePageSize
  public getPages = getPages
  public changePage = changePage
  public disableNxtBtn = disableNxtBtn
  constructor(public _http: HttpClient, public auth: AuthService) {
    this.getSuccessfulVotes()
    this.getFailedVotes()
  }

  // this method will receive successful votes from the API
  public getSuccessfulVotes() {
    this._http
      .post(config.api.successful_votes, {
        user: this.auth.username
      })
      .toPromise()
      .then(res => {
        if (res['id'] === 1) {
          this.successfulVotes = res['result']
        }
      })
  }

  // this method will receive failed votes from the API
  public getFailedVotes() {
    this._http
      .post(config.api.failed_votes, {
        user: this.auth.username
      })
      .toPromise()
      .then(res => {
        if (res['id'] === 1) {
          this.failedVotes = res['result']
        }
      })
  }

  ngOnInit() {}
}
