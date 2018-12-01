import { Component, OnInit } from '@angular/core'
import { AuthService } from '../services/auth.service'
import * as config from '../app.config'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public navLogo = config.navLogo

  constructor(public auth: AuthService) {}

  ngOnInit() {
  }

}

