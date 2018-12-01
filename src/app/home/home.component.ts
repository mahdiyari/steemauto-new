import { Component, OnInit } from '@angular/core'
import { HeaderComponent } from '../header/header.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HeaderComponent]
})
export class HomeComponent implements OnInit {
  public Home_logo_img = '/assets/img/logo1.png'
  constructor(public head: HeaderComponent) { }
  ngOnInit() {
  }

}
