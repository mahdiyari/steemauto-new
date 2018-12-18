import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import config from '../../app.config'

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  public stats: Object = {totalUsers: 0, dailyVotes: 0, dailyPosts: 0}

  constructor(public _http: HttpClient) {
    this.getStats()
  }
  public getStats() {
    this._http.post(
      config.api.stats,
      {}
    )
    .toPromise()
    .then(res => this.stats = res)
    .catch(err => console.error(err))
  }
  ngOnInit() {
  }

}
