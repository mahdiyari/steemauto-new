import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { HomeComponent } from './home/home.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'
import { AboutComponent } from './about/about.component'
import { HttpClientModule } from '@angular/common/http'
import { SidebarComponent } from './header/sidebar/sidebar.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { LimitsComponent } from './dashboard/limits/limits.component'
import { BalanceComponent } from './dashboard/balance/balance.component'
import { StatsComponent } from './dashboard/stats/stats.component'
import { PriceComponent } from './dashboard/price/price.component'
import { VotingComponent } from './dashboard/voting-detail/voting-detail.component'
import { TimeAgoPipe } from 'time-ago-pipe'
import { VoteHistoryComponent } from './dashboard/vote-history/vote-history.component';
import { AnnouncementComponent } from './dashboard/announcement/announcement.component';
import { CurationTrailComponent } from './curation-trail/curation-trail.component';
import { PromotedPostComponent } from './promoted-post/promoted-post.component';
import { FollowingTrailsComponent } from './curation-trail/following-trails/following-trails.component';
import { TopTrailsComponent } from './curation-trail/top-trails/top-trails.component';
import { SeaarchTrailComponent } from './curation-trail/seaarch-trail/seaarch-trail.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    SidebarComponent,
    DashboardComponent,
    LimitsComponent,
    BalanceComponent,
    StatsComponent,
    PriceComponent,
    VotingComponent,
    TimeAgoPipe,
    VoteHistoryComponent,
    AnnouncementComponent,
    CurationTrailComponent,
    PromotedPostComponent,
    FollowingTrailsComponent,
    TopTrailsComponent,
    SeaarchTrailComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
