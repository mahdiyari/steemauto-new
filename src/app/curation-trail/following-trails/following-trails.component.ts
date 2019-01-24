import { Component, OnInit } from '@angular/core'
import { CurationTrailComponent } from '../curation-trail.component'
import { HttpClient } from '@angular/common/http'
import { AuthService } from 'src/app/services/auth.service'
import { sort } from '../../utils/sort'

@Component({
  selector: 'app-following-trails',
  templateUrl: './following-trails.component.html',
  styleUrls: ['./following-trails.component.css']
})
export class FollowingTrailsComponent implements OnInit {
  public sort = sort

  constructor(public _http: HttpClient, public auth: AuthService, public _t: CurationTrailComponent) {}

  ngOnInit() {
  }

}
