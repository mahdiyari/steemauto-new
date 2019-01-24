import { Component, OnInit } from '@angular/core'
import { Router, RouterEvent, NavigationStart } from '@angular/router'
import { HeaderComponent } from '../header.component'

@Component({
  selector: 'app-header-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router, public head: HeaderComponent) {
    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.head.toggleSidebar('close')
      }
    })
  }

  ngOnInit() {}
}
