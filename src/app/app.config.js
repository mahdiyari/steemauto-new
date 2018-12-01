const config = new function () {
  this.appName = 'steemauto'
  this.sc2 = {
    baseURL: 'https://steemconnect.com',
    app: 'steem.app',
    // url: 'https://dev.onsteem.com',
    callbackURL: 'http://localhost:4200',
    scope: ['login']
  }
  this.api = {}
  this.api.url = 'http://localhost:3001'
  this.api.login_api = `${this.api.url}/api/v1/login`
  this.rpc = {
    https: 'https://api.steemit.com'
  }
  this.navLogo = '/assets/img/logo.png'
}()
module.exports = config
