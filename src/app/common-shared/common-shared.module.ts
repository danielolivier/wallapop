import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { TranslateModule } from '@ngx-translate/core'

import { ButtonComponent } from './components/button/button.component'
import { HeaderComponent } from './components/header/header.component'
import { InputSearchComponent } from './components/input-search/input-search.component'
import { LoaderComponent } from './components/loader/loader.component'
import { ModalLayoutComponent } from './components/modal-layout/modal-layout.component'

@NgModule({
  declarations: [
    HeaderComponent,
    ButtonComponent,
    LoaderComponent,
    InputSearchComponent,
    ModalLayoutComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    TranslateModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    ButtonComponent,
    LoaderComponent,
    InputSearchComponent,
    ModalLayoutComponent,
  ],
})
export class CommonSharedModule {}
