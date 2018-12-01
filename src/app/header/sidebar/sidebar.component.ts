import { Component, OnInit } from '@angular/core'
import { Router, RouterEvent, NavigationStart } from '@angular/router'

@Component({
  selector: 'app-header-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private router: Router
  ) {
    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.toggleSidebar('close')
      }
    })
  }
  public isOpenSidebar

  public toggleSidebar(action?) {
    if (this.isOpenSidebar || action === 'close') {
      document.getElementById('sidebar').style.width = '0px'
      document.getElementById('sidebar-toggle').style.marginLeft = '0px'
      const element = document.getElementById('sidebar-toggle-icon')
      element.className = element.className.replace(/\bclose\b/g, 'menu')
      this.isOpenSidebar = 0
    } else {
      document.getElementById('sidebar').style.width = '200px'
      document.getElementById('sidebar-toggle').style.marginLeft = '200px'
      const element = document.getElementById('sidebar-toggle-icon')
      element.className = element.className.replace(/\bmenu\b/g, 'close')
      this.isOpenSidebar = 1
    }
  }
  ngOnInit() {

  }
}
