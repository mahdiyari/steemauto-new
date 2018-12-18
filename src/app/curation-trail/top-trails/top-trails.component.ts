import { Component, OnInit } from '@angular/core'
import { CurationTrailComponent } from '../curation-trail.component'
import { HttpClient } from '@angular/common/http'
import { AuthService } from 'src/app/services/auth.service'
import config from '../../app.config'
declare var $: any

@Component({
  selector: 'app-top-trails',
  templateUrl: './top-trails.component.html',
  styleUrls: ['./top-trails.component.css']
})
export class TopTrailsComponent implements OnInit {
  public topTrails = []
  public topTrailsPage = { page: 1 }

  constructor(public _t: CurationTrailComponent, public _http: HttpClient, public auth: AuthService) {
    this.getTopTrails()
  }
  public getTopTrails() {
    this._http
      .post(config.api.top_trails, {})
      .toPromise()
      .then(res => {
        if (res['id'] === 1) {
          this.topTrails = res['result']
        }
      })
  }

  ngOnInit() {
  }

}
