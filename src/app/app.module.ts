import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { HomeComponent } from './home/home.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'
import { AnnouncementComponent } from './announcement/announcement.component'
import { AboutComponent } from './about/about.component'
import { HttpClientModule } from '@angular/common/http'
import { SidebarComponent } from './header/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LimitsComponent } from './dashboard/limits/limits.component';
import { BalanceComponent } from './dashboard/balance/balance.component';
import { StatsComponent } from './dashboard/stats/stats.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    AnnouncementComponent,
    AboutComponent,
    SidebarComponent,
    DashboardComponent,
    LimitsComponent,
    BalanceComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
