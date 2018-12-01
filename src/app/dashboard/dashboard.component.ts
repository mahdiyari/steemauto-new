import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AuthService } from '../services/auth.service'
import { SteemService } from '../services/steem.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public spObject
  constructor(
    private _http: HttpClient,
    public auth: AuthService,
    public steem: SteemService
  ) { }

  public exportUserDetails() {
    const ud = this.auth.userDetails
    if (ud) {
      this.getSp(ud)
    }
    return ({
      balance: ud ? ud.balance.replace('STEEM', '') : null,
      sbd_balance: ud ? ud.sbd_balance.replace('SBD', '') : null,
      last_vote_time: ud ? ud.last_vote_time : null,
      actual_sp: this.spObject ? this.spObject.actual_sp : null,
      received_sp: this.spObject ? this.spObject.received_sp : null,
      delegated_sp: this.spObject ? this.spObject.delegated_sp : null,
      total_sp: this.spObject ? this.spObject.total_sp : null,
      effective_sp: this.spObject ? this.spObject.effective_sp : null,
      voting_mana: ud ? this.steem.getMana(ud) : null,
      rc_mana: ud ? this.steem.getRc(ud) : null
    })
  }
  private getSp(ud) {
    this.spObject = this.steem.SteempowerFormatter(ud)
  }
  ngOnInit() {
  }

}
