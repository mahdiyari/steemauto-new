import { Component, OnInit } from '@angular/core'
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
    public auth: AuthService,
    public steem: SteemService
  ) {}

  public exportUserDetails() {
    const ud = this.auth.userDetails
    let ud2 = true
    if (ud) {
      this.getSp(ud)
    }
    if (!ud || !ud.balance || !ud.sbd_balance || !ud.last_vote_time) {
      ud2 = false
    } else {
      ud2 = true
    }
    return ({
      balance: ud && ud2 ? ud.balance.replace('STEEM', '') : null,
      sbd_balance: ud && ud2 ? ud.sbd_balance.replace('SBD', '') : null,
      last_vote_time: ud && ud2 ? ud.last_vote_time : null,
      actual_sp: this.spObject ? this.spObject.actual_sp : null,
      received_sp: this.spObject ? this.spObject.received_sp : null,
      delegated_sp: this.spObject ? this.spObject.delegated_sp : null,
      total_sp: this.spObject ? this.spObject.total_sp : null,
      effective_sp: this.spObject ? this.spObject.effective_sp : null,
      voting_mana: parseInt(ud && ud2 ? this.steem.getMana(ud) : null, 10),
      rc_mana: ud && ud2 ? this.steem.getRc(ud) : null
    })
  }
  private getSp(ud) {
    this.spObject = this.steem.SteempowerFormatter(ud)
  }
  ngOnInit() {}
}
