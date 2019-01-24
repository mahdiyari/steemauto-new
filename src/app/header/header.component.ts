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
  public isOpenSidebar

  constructor(public auth: AuthService) {}

  public toggleSidebar(action?) {
    const sidebar = document.getElementById('sidebar')
    const sidebarToggle = document.getElementById('sidebar-toggle')
    if (!sidebar && !sidebarToggle) {
      return
    }
    if (this.isOpenSidebar || action === 'close') {
      sidebar.style.width = '0px'
      sidebarToggle.style.marginLeft = '0px'
      const element = document.getElementById('sidebar-toggle-icon')
      element.className = element.className.replace(/\bclose\b/g, 'menu')
      this.isOpenSidebar = 0
    } else {
      sidebar.style.width = '200px'
      sidebarToggle.style.marginLeft = '200px'
      const element = document.getElementById('sidebar-toggle-icon')
      element.className = element.className.replace(/\bmenu\b/g, 'close')
      this.isOpenSidebar = 1
    }
  }

  ngOnInit() {
  }

}

