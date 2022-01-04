import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClient, HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal'
import { TooltipModule } from 'ngx-bootstrap/tooltip'

import { CommonSharedModule } from './common-shared/common-shared.module'

import { HomeComponent } from './containers/home/home.component'
import { ItemCardComponent } from './components/item-card/item-card.component'
import { FavouritesComponent } from './containers/favourites/favourites.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ItemCardComponent,
    FavouritesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonSharedModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    FontAwesomeModule,
    NgbModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  providers: [AppRoutingModule, BsModalRef],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http)
}
