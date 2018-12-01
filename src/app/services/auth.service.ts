/**
 * Authorizing service
 * Used in the login process
 */
import { Injectable } from '@angular/core'
import { Initialize as sc2 } from 'sc2-sdk'
import { Router, ActivatedRoute } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import * as config from '../app.config'
import { setCookie, getCookie } from '../utils/cookies'
import { nodeCall } from '../utils/nodeCall'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // steemconnect api
  public api
  public isAuth
  public username = getCookie('username')
  public access_token
  public userDetails
  public postingAuthorized

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _http: HttpClient
  ) {
    this.initialize()
    this.consoleWarning()
    this.checkLogin()
  }
  // Redirect to steemconnect
  public login() {
    window.location.href = this.api.getLoginURL()
  }
  public logout() {
    setCookie('username', '', 0)
    setCookie('access_key', '', 0)
    this.isAuth = false
    this._router.navigate(['/'])
  }

  // initializing steemconnect app
  private initialize() {
    this.api = sc2({
      baseURL: config.sc2.baseURL,
      app: config.sc2.app,
      callbackURL: config.sc2.callbackURL,
      scope: config.sc2.scope
    })
  }

  // this method will redirect callback from steemconnect to the homepage
  public checkLogin() {
    if (getCookie('access_key') && getCookie('username')) {
      this.getLogin()
    }
    this._activatedRoute.queryParams.subscribe(params => {
      if (params.username && params.access_token && params.expires_in) {
        this.access_token = params.access_token
        this.getLogin()
        this._router.navigate(['/'])
      }
    })
  }

  // This method will send post request to the login API
  public getLogin() {
    if (!this.isAuth) {
      this._http
        .post(config.api.login_api, {
          username: this.access_token ? null : getCookie('username'),
          access_key: this.access_token ? null : getCookie('access_key'),
          access_token: this.access_token
        })
        .toPromise()
        .then((res: any) => {
          if (res && res.id === 1) {
            this.isAuth = true
            this.getUserDetails()
            if (res.access_key && res.username) {
              setCookie('username', res.username, 7)
              setCookie('access_key', res.access_key, 7)
              this.username = res.username
              this.getUserDetails()
            }
          } else {
            console.log(res)
          }
        })
        .catch(err => console.log(err))
    }
  }

  // This method will get user details by get_accounts from blockchain
  public getUserDetails() {
    nodeCall(config.rpc.https, 'condenser_api.get_accounts', [
      [getCookie('username')]
    ]).then(([result]) => {
      this.userDetails = result
      console.log(result)
      this.checkPostingAuth()
    })
  }

  public checkPostingAuth() {
    if (this.userDetails) {
      const accounts = this.userDetails.posting.account_auths.map(acc => {
        return acc[0]
      })
      if (accounts.indexOf(config.appName) > -1) {
        this.postingAuthorized = true
      }
    }
  }

  // This function will print warning message in the browser console
  public consoleWarning() {
    console.log(
      '%c%s',
      'color: red; background: blue; font-size: 68px;',
      'Warning!'
    )
    console.log(
      '%c%s',
      'color: red; background: yellow; font-size: 16px;',
      'This is a developer console, you must read and understand anything you paste or type here' +
        ' or you could compromise your steemauto account.'
    )
    console.log(
      '%c%s',
      'color: red; background: yellow; font-size: 16px;',
      'We suggest to contact us before using developer console.'
    )
  }
}
