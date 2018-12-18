import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import config from '../../app.config'

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {
  public sbdPrice
  public steemPrice
  constructor(public _http: HttpClient) {
    this.getPrices()
  }

  public getPrices() {
    this._http.post(
      config.api.price,
      {}
    ).toPromise()
    .then(res => {
      this.sbdPrice = res['sbd_price']
      this.steemPrice = res['steem_price']
    })
  }

  ngOnInit() {}
}
