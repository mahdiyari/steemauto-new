import { NgModule } from '@angular/core'
import { RouterModule, Routes, UrlSegment } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { AboutComponent } from './about/about.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { CurationTrailComponent } from './curation-trail/curation-trail.component'
import { TrailPageComponent } from './curation-trail/trail-page/trail-page.component'

/**
 * this will accept values like @mahdiyari, @mahdi-yari, @mahdi.yari
 * (just legal usernames on the steem blockchain)
 */
export function blogPath(url: UrlSegment[]) {
  return url.length === 2 &&
    url[0].path === 'curation-trail' && url[1].path.match(/^[\@]+[a-zA-Z0-9\-\.]+$/)
    ? { consumed: url }
    : null
}
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'curation-trail', component: CurationTrailComponent },
  { matcher: blogPath, component: TrailPageComponent },
  // { path: 'about', component: AboutComponent, outlet: 'two' },
  // { path: 'path/:routeParam', component: HomeComponent },
  // { path: 'staticPath', component: HomeComponent },
  { path: '**', component: NotFoundComponent }
  // { path: 'oldPath', redirectTo: '/staticPath' },
  // { path: ..., component: ..., data: { message: 'Custom' } }
]

const routing = RouterModule.forRoot(routes)

@NgModule({
  exports: [RouterModule],
  imports: [routing]
})
export class AppRoutingModule {}
