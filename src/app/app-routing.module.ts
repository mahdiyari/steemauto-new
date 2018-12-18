import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { AboutComponent } from './about/about.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { CurationTrailComponent } from './curation-trail/curation-trail.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'curation-trail', component: CurationTrailComponent },
  // { path: 'about', component: AboutComponent, outlet: 'two' },
  // { path: 'path/:routeParam', component: HomeComponent },
  // { path: 'staticPath', component: HomeComponent },
  { path: '**', component: NotFoundComponent },
  // { path: 'oldPath', redirectTo: '/staticPath' },
  // { path: ..., component: ..., data: { message: 'Custom' } }
  ]

  const routing = RouterModule.forRoot(routes)


@NgModule({
  exports: [ RouterModule ],
  imports: [ routing ]
})
export class AppRoutingModule {}
