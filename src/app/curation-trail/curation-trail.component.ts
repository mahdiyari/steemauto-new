import { Component, OnInit } from '@angular/core'
import config from '../app.config'
import { AuthService } from '../services/auth.service'
import { HttpClient } from '@angular/common/http'
import { notifyResult } from '../utils/notify'
import {
  changePage,
  getPages,
  disableNxtBtn,
  tablePageSize
} from '../utils/pagination'

// declare $ as a variabe to use JQuery
declare var $: any

@Component({
  selector: 'app-curation-trail',
  templateUrl: './curation-trail.component.html',
  styleUrls: ['./curation-trail.component.css']
})
export class CurationTrailComponent implements OnInit {
  public followingTrails = []
  public followingPage = { page: 1 }

  // imported functions
  public changePage = changePage
  public disableNxtBtn = disableNxtBtn
  public getPages = getPages
  public tablePageSize = tablePageSize
  public notifyResult = notifyResult

  constructor(public auth: AuthService, public _http: HttpClient) {
    // update list of following trails
    this.getFollowing()
  }

  /** this method can be used in any component to follow a trail */
  public follow(trail) {
    if (!confirm(`Follow @${trail}, confirm?`)) {
      return
    }
    $('.btn-follow').attr('disabled', true)
    this.auth.postCall(config.api.follow_trail, { trail }).then(res => {
      this.notifyResult(res)
      this.getFollowing()
      $('.btn-follow').removeAttr('disabled')
    })
  }

  /** this method can be used in any component to unfollow a trail */
  public unfollow(trail) {
    if (!confirm(`Unfollow @${trail}, confirm?`)) {
      return
    }
    $('.btn-unfollow').attr('disabled', true)
    this.auth.postCall(config.api.unfollow_trail, { trail }).then(res => {
      this.notifyResult(res)
      this.getFollowing()
      $('.btn-unfollow').removeAttr('disabled')
    })
  }

  /**
   * update list of curation trails which are followed by the user
   * @param this.followingTrails received result
   */
  public getFollowing() {
    this.auth.postCall(config.api.following_trails, {
      user: this.auth.username
    }).then(res => {
      if (res['id'] === 1) {
        this.followingTrails = res['result']
      } else {
        this.followingTrails = []
      }
    })
  }

  /** returns index of a trail object inside the array of trails list */
  public indexOf(arr, trail) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].trailer === trail) {
        return i
      }
    }
    return -1
  }

  public disableTrail(trail) {
    if (!confirm(`Disable @${trail}?`)) {
      return
    }
    $('.en-icon').attr('disabled', true)
    this.auth.postCall(config.api.disable_trail, { trail }).then(res => {
      notifyResult(res)
      this.getFollowing()
      $('.en-icon').removeAttr('disabled')
    })
  }

  public enableTrail(trail) {
    if (!confirm(`Enable @${trail}?`)) {
      return
    }
    $('.dis-icon').attr('disabled', true)
    this.auth.postCall(config.api.enable_trail, { trail }).then(res => {
      notifyResult(res)
      this.getFollowing()
      $('.dis-icon').removeAttr('disabled')
    })
  }

  ngOnInit() {}
}
