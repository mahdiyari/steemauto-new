import { Component, OnInit } from '@angular/core'
import { CurationTrailComponent } from '../curation-trail.component'
import { ActivatedRoute } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { SteemService } from 'src/app/services/steem.service'
import config from '../../app.config'
import Remarkable from 'remarkable'

@Component({
  selector: 'app-trail-page',
  templateUrl: './trail-page.component.html',
  styleUrls: ['./trail-page.component.css'],
  providers: [CurationTrailComponent]
})
export class TrailPageComponent implements OnInit {
  public trailNameUrl
  public trailObj
  public invalidName = false
  public RPCError = false
  public lastSP
  public trailAccHistory = []
  public historyThreshold = false
  public trailCR
  public trailInf
  public trailBod
  constructor(
    public _t: CurationTrailComponent,
    public route: ActivatedRoute,
    public auth: AuthService,
    public steem: SteemService
  ) {}

  /** Call get_accounts and validate trail name */
  public getTrailDetails() {
    if (!this.trailNameUrl) {
      return
    }
    this.steem
      .call('condenser_api.get_accounts', [[this.trailNameUrl]])
      .then(res => {
        if (res && res['result'] && res['result'].length && res['result'][0]) {
          this.trailObj = res['result'][0]
          this.getTrailInfo()
        } else if (res && res['result'] && !res['result'].length) {
          // the name provided by user is invalid
          this.invalidName = true
        } else {
          // unexpected result
          this.RPCError = true
        }
      })
  }

  /** get trail's info from steemauto's api */
  public getTrailInfo() {
    this.auth
      .postCall(config.api.get_trail_info, { trail: this.trailUsername() })
      .then(res => {
        if (res && res['id'] === 1) {
          this.trailInf = res['result']
        }
      })
  }

  /** Get trail's username */
  public trailUsername() {
    return this.trailObj && this.trailObj['name']
      ? this.trailObj['name']
      : null
  }

  /** Get trail's profile name */
  public trailName() {
    return this.hasProfile() && this.hasProfile()['name']
      ? this.hasProfile()['name']
      : null
  }

  /** Get trail's avatar */
  public trailAvatar() {
    const defaultAvatr = '/assets/img/default-avatar.png'
    const profileImage =
      this.hasProfile() && this.hasProfile()['profile_image']
        ? this.hasProfile()['profile_image']
        : null
    return profileImage ? profileImage : defaultAvatr
  }

  /** Get steem and sbd balance of trail */
  public trailBalance() {
    const steemBalance =
      this.trailObj && this.trailObj['balance']
        ? this.trailObj['balance']
        : '0 STEEM'
    const sbdBalance =
      this.trailObj && this.trailObj['sbd_balance']
        ? this.trailObj['sbd_balance']
        : '0 SBD'
    return {
      steem: steemBalance.replace(' STEEM', ''),
      sbd: sbdBalance.replace(' SBD', '')
    }
  }

  /** Returns json_metadata profile || null */
  private hasProfile() {
    return this.trailObj &&
      this.trailObj['json_metadata'] &&
      JSON.parse(this.trailObj['json_metadata']).profile
      ? JSON.parse(this.trailObj['json_metadata']).profile
      : null
  }

  /** Get details of the trail's steem power */
  public trailSP() {
    const sp = this.trailObj
      ? this.steem.SteempowerFormatter(this.trailObj)
      : null
    return {
      actual_sp: sp ? sp.actual_sp : 0,
      received_sp: sp ? sp.received_sp : 0,
      delegated_sp: sp ? sp.delegated_sp : 0,
      total_sp: sp ? sp.total_sp : 0
    }
  }

  /** get latest 10,000 transactions and calculate weekly curation reward */
  public calcTrailCurationReward() {
    if (this.trailObj && !this.historyThreshold) {
      this.historyThreshold = true
      this.steem.getAccountHistory(this.trailUsername()).then(res => {
        if (res && res['result'] && res['result']['history']) {
          this.trailAccHistory = res['result']['history']
        }

        if (this.trailAccHistory.length) {
          let totalVests = 0
          const history = this.trailAccHistory
          const now = Date.now()
          for (let i = history.length - 1; i >= 0; i--) {
            // 604800000 ms = 7 days
            if (now - Date.parse(history[i][1].timestamp) > 604800000) {
              break
            }
            const op = history[i][1].op
            // skip anything other than curation_reward_operation
            if (op.type !== 'curation_reward_operation') {
              continue
            }
            totalVests += op.value.reward.amount / 1000000
          }
          this.trailCR = this.steem.vestToSteem(totalVests)
        }
      })
    }
  }

  /** return 7 days curation trail after calculation */
  public trailCurationReward() {
    this.calcTrailCurationReward()
    return this.trailCR
  }

  /** get trail description from API */
  public trailDescription() {
    return this.trailInf && this.trailInf[0]
      ? this.trailInf[0].description
      : 'none'
  }

  /** get trail followers from API */
  public trailFollowers() {
    return this.trailInf && this.trailInf[0] ? this.trailInf[0].followers : 0
  }

  /** get trail website from steem json_metadata profile */
  public trailWebsite() {
    return this.hasProfile() && this.hasProfile().website
      ? this.hasProfile().website
      : null
  }

  /** Display image in the landing page - vip */
  public trailLandingImage() {
    // we may consider displaying default image
    // const defaultImg = '/assets/img/default-landing.png'
    const landingImg =
      this.trailInf &&
      this.trailInf[0] &&
      this.trailInf[0].vip &&
      this.trailInf[0].landing_img
        ? this.trailInf[0].landing_img
        : null
    return landingImg // || defaultImg
  }

  /** Display markdown text in landing page - vip */
  public trailLandingText() {
    if (
      this.trailInf &&
      this.trailInf[0] &&
      this.trailInf[0].vip &&
      this.trailInf[0].landing_text
    ) {
      const remarkable = new Remarkable({
        html: true,
        breaks: true,
        linkify: false,
        typographer: false,
        quotes: '“”‘’'
      })
      return remarkable.render(this.trailInf[0].landing_text)
    }
    return null
  }

  /** We will use this method in the interface to convert strings into number */
  public Number(x) {
    return Number(x)
  }

  ngOnInit() {
    // we should get the trail name from the URL by using a regex
    const userRegex = /^[\@]+[a-zA-Z0-9\-.]+$/
    this.route.url.subscribe(url => {
      if (url.length === 2 && url[1].path.match(userRegex)) {
        this.trailNameUrl = url[1].path.replace('@', '')
        this.getTrailDetails()
      }
    })
  }
}
