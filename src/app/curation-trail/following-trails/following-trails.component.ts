import { Component, OnInit } from '@angular/core'
import { CurationTrailComponent } from '../curation-trail.component'
import { HttpClient } from '@angular/common/http'
import config from '../../app.config'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-following-trails',
  templateUrl: './following-trails.component.html',
  styleUrls: ['./following-trails.component.css']
})
export class FollowingTrailsComponent implements OnInit {
  public followingTrails = []
  public followingPage = {page: 1}
  constructor(public _t: CurationTrailComponent, public _http: HttpClient, public auth: AuthService) {
    this.getFollowing()
  }

  public getFollowing() {
    this._http
      .post(config.api.following_trails, {
        user: this.auth.username
      })
      .toPromise()
      .then(res => {
        if (res['id'] === 1) {
          this.followingTrails = res['result']
        }
      })
  }
  ngOnInit() {
  }

}
