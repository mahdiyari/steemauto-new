import { Component, OnInit, Input } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import config from '../../app.config'
import { SteemService } from 'src/app/services/steem.service'
import { CurationTrailComponent } from '../curation-trail.component'

@Component({
  selector: 'app-seaarch-trail',
  templateUrl: './seaarch-trail.component.html',
  styleUrls: ['./seaarch-trail.component.css']
})
export class SeaarchTrailComponent implements OnInit {
  public searchResult = {
    name: '',
    description: '',
    followers: '',
    valid: true,
    done: false,
    error: null
  }
  public startSearch
  public trailName
  constructor(
    public _http: HttpClient,
    public steem: SteemService,
    public _t: CurationTrailComponent
  ) {}
  public trailNameChange(n) {
    this.trailName = n
  }

  public searchTrail() {
    this.closeResult()
    this.startSearch = 1
    this.steem.validateAccount(this.trailName).then(res => {
      if (!res) {
        this.searchResult['valid'] = false
        this.searchResult['done'] = true
        this.startSearch = 0
        return
      }
      this._http
        .post(config.api.search_trail, { trail: this.trailName })
        .toPromise()
        .then(ress => {
          if (ress && ress['id'] === 1 && ress['result']) {
            this.searchResult['name'] = ress['result'].user
            this.searchResult['description'] = ress['result'].description
            this.searchResult['followers'] = ress['result'].followers
          } else if (ress && ress['id'] === 0 && ress['error']) {
            this.searchResult['error'] = ress['error']
          }
          this.searchResult['done'] = true
          this.startSearch = 0
        })
    })
  }
  public closeResult() {
    this.searchResult['name'] = ''
    this.searchResult['description'] = ''
    this.searchResult['valid'] = true
    this.searchResult['done'] = false
    this.searchResult['error'] = null
  }

  ngOnInit() {}
}
