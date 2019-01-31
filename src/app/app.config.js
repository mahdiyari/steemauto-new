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
  this.api.login_api = this.api.url + '/api/v1/login'
  // dashboard api
  this.api.price = this.api.url + '/api/v1.1/dashboard/price'
  this.api.stats = this.api.url + '/api/v1.1/dashboard/stats'
  this.api.set_limits = this.api.url + '/api/v1.1/dashboard/set_limits'
  this.api.get_limits = this.api.url + '/api/v1.1/dashboard/get_limits'
  this.api.successful_votes = this.api.url + '/api/v1.1/dashboard/successful_votes'
  this.api.failed_votes = this.api.url + '/api/v1.1/dashboard/failed_votes'
  // curation trail api
  this.api.following_trails = this.api.url + '/api/v1.1/curation-trail/following'
  this.api.top_trails = this.api.url + '/api/v1.1/curation-trail/top_trails'
  this.api.search_trail = this.api.url + '/api/v1.1/curation-trail/search'
  this.api.follow_trail = this.api.url + '/api/v1/dashboard/curation-trail/follow'
  this.api.unfollow_trail = this.api.url + '/api/v1/dashboard/curation-trail/unfollow'
  this.api.enable_trail = this.api.url + '/api/v1.1/curation-trail/enable'
  this.api.disable_trail = this.api.url + '/api/v1.1/curation-trail/disable'
  this.api.get_trail_info = this.api.url + '/api/public/curation-trail/get_info'
  this.rpc = {
    https: 'https://api.steemit.com'
  }
  this.navLogo = '/assets/img/logo.png'
}()
module.exports = config
