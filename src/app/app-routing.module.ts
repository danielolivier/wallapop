import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { FavouritesComponent } from './containers/favourites/favourites.component'

import { HomeComponent } from './containers/home/home.component'

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'favourites',
    component: FavouritesComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
