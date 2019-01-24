import { Component, OnInit, Input } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AuthService } from 'src/app/services/auth.service'
import { getCookie } from 'src/app/utils/cookies'
import config from '../../app.config'
import { notifyResult } from '../../utils/notify'
declare var $: any

@Component({
  selector: 'app-limits',
  templateUrl: './limits.component.html',
  styleUrls: ['./limits.component.css']
})
export class LimitsComponent implements OnInit {
  public displayMana = true
  public displayRC = true
  public rcLimit
  public manaLimit
  public getLimitCall
  public notifyResult = notifyResult
  @Input() rcMana
  @Input() votingMana
  constructor(private _http: HttpClient, public auth: AuthService) {}

  public toggleInput(e) {
    if (e === 'mana') {
      this.displayMana = !this.displayMana
    } else if (e === 'rc') {
      this.displayRC = !this.displayRC
    }
  }

  public limits() {
    if (!this.getLimitCall && this.auth.userDetails) {
      this.getLimits(this.auth.userDetails['name'])
      this.getLimitCall = 1
    }
    return {
      rcLimit: this.rcLimit,
      votingLimit: this.manaLimit
    }
  }
  public getLimits(user) {
    this._http
      .post(config.api.get_limits, {
        user
      })
      .toPromise()
      .then(res => {
        if (res && res['id'] === 1) {
          this.rcLimit = res['rc_limit']
          this.manaLimit = res['mana_limit']
        }
      })
  }

  public setManaLimit() {
    const user = getCookie('username')
    $('btn').attr('disabled')
    this._http
      .post(config.api.set_limits, {
        user,
        type: 'mana',
        limit: document.getElementById('mana-limit-input')['value']
      })
      .toPromise()
      .then(res => {
        if (res) {
          $('btn').removeAttr('disabled')
          this.toggleInput('mana')
          this.getLimits(user)
          this.notifyResult(res)
        }
      })
  }
  public setRCLimit() {
    const user = getCookie('username')
    $('btn').attr('disabled')
    this._http
      .post(config.api.set_limits, {
        user,
        type: 'rc',
        limit: document.getElementById('rc-limit-input')['value']
      })
      .toPromise()
      .then(res => {
        if (res) {
          $('btn').removeAttr('disabled')
          this.toggleInput('rc')
          this.getLimits(user)
          this.notifyResult(res)
        }
      })
  }
  public votingStatus() {
    if (this.rcMana < this.limits().rcLimit || this.votingMana < this.limits().votingLimit) {
      return {
        text: 'Inactive',
        color: 'red',
        icon: 'remove'
      }
    }
    return {
      text: 'Active',
      color: 'green',
      icon: 'ok'
    }
  }
  ngOnInit() {}
}
