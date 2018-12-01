import { Component, OnInit } from '@angular/core'
import { DashboardComponent } from '../dashboard.component'

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  constructor(public dash: DashboardComponent) { }

  ngOnInit() {
  }

}
