import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import * as config from '../app.config'

@Injectable({
  providedIn: 'root'
})
export class SteemService {
  private tvs
  private tvfs
  private callGlobal = 0
  private callRewardFund = 0
  public rbPrc
  public steemMedianPrice
  public callRc = 0
  public rcnow
  public acHisThreshold = {}
  public acHis = {}
  constructor(private _http: HttpClient) {}
  public call(method, params, bypass?) {
    const byp = bypass ? '?bypass' : ''
    return this._http
      .post(config.rpc.https + byp, {
        jsonrpc: '2.0',
        method: method,
        params: params,
        id: 1
      })
      .toPromise()
      .catch(e => console.error('Error in call():', e))
  }

  public ReputaionFormatter(_reputation) {
    if (_reputation == null) {
      return _reputation
    }
    _reputation = parseInt(_reputation, 10)
    let rep = String(_reputation)
    const neg = rep.charAt(0) === '-'
    rep = neg ? rep.substring(1) : rep
    const str = rep
    const leadingDigits = parseInt(str.substring(0, 4), 10)
    const log = Math.log(leadingDigits) / Math.log(10)
    const n = str.length - 1
    let out = n + (log - Math.trunc(log))
    if (isNaN(out)) {
      out = 0
    }
    out = Math.max(out - 9, 0)
    out = (neg ? -1 : 1) * out
    out = out * 9 + 25
    return Math.trunc(out)
  }

  /**
   * This method will convert vests to the steem
   * and will return an object of actual, effective, total, delegated, and received vests
   * @param account get_accounts received from RPC node
   */
  public SteempowerFormatter(account) {
    if (!this.callGlobal) {
      this.getGlobals()
    }
    this.callGlobal = 1
    if (!account || !this.tvfs || !this.tvs) {
      return null
    }
    const delegated = parseInt(
      account.delegated_vesting_shares.replace('VESTS', ''),
      10
    )
    const received = parseInt(
      account.received_vesting_shares.replace('VESTS', ''),
      10
    )
    const vesting = parseInt(account.vesting_shares.replace('VESTS', ''), 10)
    const totalvest = vesting + received - delegated
    const spv = this.tvfs / this.tvs
    const total_sp = (totalvest * spv).toFixed(3)
    const actual_sp = (vesting * spv).toFixed(3)
    const delegated_sp = (delegated * spv).toFixed(3)
    const received_sp = (received * spv).toFixed(3)
    const withdrawRate = Math.min(
      parseInt(account.vesting_withdraw_rate.replace('VESTS', ''), 10),
      (account.to_withdraw - account.withdrawn) / 1000000
    )
    const effective_sp = (totalvest - withdrawRate) * spv
    return {
      actual_sp,
      total_sp,
      delegated_sp,
      received_sp,
      effective_sp
    }
  }

  public vestToSteem(vest) {
    if (!this.callGlobal) {
      this.getGlobals()
    }
    this.callGlobal = 1
    if (!this.tvfs || !this.tvs) {
      return null
    }
    const spv = this.tvfs / this.tvs
    return (vest * spv).toFixed(3)
  }

  private getGlobals() {
    this.call('condenser_api.get_dynamic_global_properties', [])
      .then(res => {
        this.tvfs = res['result'].total_vesting_fund_steem.replace('STEEM', '')
        this.tvs = res['result'].total_vesting_shares.replace('VESTS', '')
      })
      .catch(e => console.error('Error in getGlobals:', e))
  }

  public getMana(account) {
    const withdrawRate = Math.min(
      parseInt(account.vesting_withdraw_rate.replace('VESTS', ''), 10),
      (account.to_withdraw - account.withdrawn) / 1000000
    )
    const delegated = parseInt(
      account.delegated_vesting_shares.replace('VESTS', ''),
      10
    )
    const received = parseInt(
      account.received_vesting_shares.replace('VESTS', ''),
      10
    )
    const vesting = parseInt(account.vesting_shares.replace('VESTS', ''), 10)
    const totalvest = vesting + received - delegated
    const maxMana = Number((totalvest - withdrawRate) * Math.pow(10, 6))
    const powernow = this.calculateManabar(maxMana, account.voting_manabar)
    return powernow
  }

  public getRc(account) {
    if (!this.callRc) {
      this.calcRc(account)
      this.callRc = 1
    }
    return this.rcnow ? this.rcnow : null
  }

  private calcRc(account) {
    this.call('rc_api.find_rc_accounts', { accounts: [account.name] })
      .then(result => {
        const res = result['result']
        const rcnow = this.calculateManabar(
          res.rc_accounts[0].max_rc,
          res.rc_accounts[0].rc_manabar
        )
        this.rcnow = rcnow
      })
      .catch(e => console.error('Error in rc calculation:', e))
  }

  private calculateManabar(max_mana, { last_update_time, current_mana }) {
    const delta = Date.now() / 1000 - last_update_time
    const currentMana = Number(current_mana) + (delta * max_mana) / 432000
    let percentage = Math.round((currentMana / max_mana) * 10000)
    if (!isFinite(percentage)) {
      percentage = 0
    }
    if (percentage > 10000) {
      percentage = 10000
    } else if (percentage < 0) {
      percentage = 0
    }
    const powernow = (percentage / 100).toFixed(2)
    return powernow
  }

  public getVoteValue(sp) {
    if (!this.callGlobal) {
      this.getGlobals()
    }
    if (!this.callRewardFund) {
      this.getRewardFund()
    }
    this.callGlobal = 1
    this.callRewardFund = 1
    if (
      isNaN(sp) ||
      !this.tvfs ||
      !this.tvs ||
      !this.steemMedianPrice ||
      !this.rbPrc
    ) {
      return null
    }
    const spv = this.tvfs / this.tvs
    const r = sp / spv
    const p = (10000 + 49) / 50
    return (r * p * 100 * this.rbPrc * this.steemMedianPrice).toFixed(4)
  }

  private getRewardFund() {
    this.call('condenser_api.get_reward_fund', ['post'])
      .then(res => {
        res = res['result']
        const n = res['reward_balance'],
          r = res['recent_claims'],
          i = n.replace(' STEEM', '') / r
        this.rbPrc = i
      })
      .catch(e => console.error('Error in getRewardFund:', e))
    this.call('condenser_api.get_current_median_history_price', [])
      .then(res => {
        res = res['result']
        this.steemMedianPrice =
          res['base'].replace(' SBD', '') / res['quote'].replace(' STEEM', '')
      })
      .catch(e => console.error('Error in getRewardFund:', e))
  }

  public async validateAccount(user) {
    try {
      let result = await this.call('condenser_api.get_accounts', [[user]])
      result = result ? result['result'] : null
      if (result && result[0] && result[0].name === user) {
        return true
      } else {
        return false
      }
    } catch (e) {
      console.error('Error in validateAccount:', e)
    }
  }

  public getAccountHistory(user) {
    if (!this.acHisThreshold[user] || this.acHis[user]) {
      this.acHisThreshold[user] = true
      return new Promise((resolve, reject) => {
        if (this.acHis[user]) {
          // return cached data
          // since account_hisotiry_api takes too long to respond
          resolve(this.acHis[user])
        } else {
          this.call('account_history_api.get_account_history', {
            account: user,
            start: -1,
            limit: 10000
          }, 1).then((res: any) => {
            // store data in object for chaching purpose
            this.acHis[user] = res
            resolve(res)
          })
        }
      })
    }
    return new Promise((resolve, reject) => {
      resolve(1)
    })
  }
}
