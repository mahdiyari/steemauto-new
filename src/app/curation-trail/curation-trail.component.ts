import { Component, OnInit } from '@angular/core'
import config from '../app.config'
import { AuthService } from '../services/auth.service'
import { HttpClient } from '@angular/common/http'
import {
  changePage,
  getPages,
  disableNxtBtn,
  tablePageSize
} from '../utils/pagination'

@Component({
  selector: 'app-curation-trail',
  templateUrl: './curation-trail.component.html',
  styleUrls: ['./curation-trail.component.css']
})
export class CurationTrailComponent implements OnInit {
  public changePage = changePage
  public disableNxtBtn = disableNxtBtn
  public getPages = getPages
  public tablePageSize = tablePageSize

  constructor(public auth: AuthService, public _http: HttpClient) {}

  ngOnInit() {}
}
