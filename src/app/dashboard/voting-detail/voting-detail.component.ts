import { Component, OnInit } from '@angular/core'
import { DashboardComponent } from '../dashboard.component'
import { SteemService } from 'src/app/services/steem.service'

@Component({
  selector: 'app-voting-detail',
  templateUrl: './voting-detail.component.html',
  styleUrls: ['./voting-detail.component.css']
})
export class VotingComponent implements OnInit {
  constructor(public dash: DashboardComponent, public steem: SteemService) {}

  ngOnInit() {}
}
