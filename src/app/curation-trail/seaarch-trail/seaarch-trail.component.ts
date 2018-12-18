import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import config from '../../app.config'
import { SteemService } from 'src/app/services/steem.service'

@Component({
  selector: 'app-seaarch-trail',
  templateUrl: './seaarch-trail.component.html',
  styleUrls: ['./seaarch-trail.component.css']
})
export class SeaarchTrailComponent implements OnInit {
  public searchResult = { name: '', description: '', followers: '', valid: true, done: false }
  public startSearch
  public trailName
  constructor(public _http: HttpClient, public steem: SteemService) {}
  public trailNameChange(n) {
    this.trailName = n
  }

  public searchTrail() {
    this.closeResult()
    this.startSearch = 1
    this.steem.validateAccount(this.trailName).then(res => {
      // if (!res) {
      //   this.searchResult['valid'] = false
      //   this.searchResult['done'] = true
      //   this.startSearch = 0
      //   return
      // }
      this._http
        .post(config.api.search_trail, { trail: this.trailName })
        .toPromise()
        .then(ress => {
          console.log(ress)
          if (ress && ress['id'] === 1 && ress['result']) {
            this.searchResult['name'] = ress['result'].user
            this.searchResult['description'] = ress['result'].description
            this.searchResult['followers'] = ress['result'].followers
          } else if (ress && ress['id'] === 0 && ress['error']) {
            this.searchResult['name'] = ress['result'].user
            this.searchResult['description'] = ress['result'].description
            this.searchResult['followers'] = ress['result'].followers
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
  }

  ngOnInit() {}
}
