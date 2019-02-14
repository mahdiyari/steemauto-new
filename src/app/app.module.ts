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
import { VoteHistoryComponent } from './dashboard/vote-history/vote-history.component'
import { AnnouncementComponent } from './dashboard/announcement/announcement.component'
import { CurationTrailComponent } from './curation-trail/curation-trail.component'
import { PromotedPostComponent } from './promoted-post/promoted-post.component'
import { FollowingTrailsComponent } from './curation-trail/following-trails/following-trails.component'
import { TopTrailsComponent } from './curation-trail/top-trails/top-trails.component'
import { SearchTrailComponent } from './curation-trail/search-trail/search-trail.component'
import { TrailPageComponent } from './curation-trail/trail-page/trail-page.component'
import { FollowButtonComponent } from './curation-trail/buttons/follow-button/follow-button.component'
import { UnfollowButtonComponent } from './curation-trail/buttons/unfollow-button/unfollow-button.component'
import { ViewButtonComponent } from './curation-trail/buttons/view-button/view-button.component'
import { DisableButtonComponent } from './curation-trail/buttons/disable-button/disable-button.component'
import { EnableButtonComponent } from './curation-trail/buttons/enable-button/enable-button.component'
import { TrailSettingsComponent } from './curation-trail/trail-settings/trail-settings.component'
import { NgHttpLoaderModule } from 'ng-http-loader'

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
    SearchTrailComponent,
    TrailPageComponent,
    FollowButtonComponent,
    UnfollowButtonComponent,
    ViewButtonComponent,
    DisableButtonComponent,
    EnableButtonComponent,
    TrailSettingsComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgHttpLoaderModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
