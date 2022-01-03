import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'

import { HeaderComponent } from './components/header/header.component'
import { ButtonComponent } from './components/button/button.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { LoaderComponent } from './components/loader/loader.component'
import { InputSearchComponent } from './components/input-search/input-search.component'
import { ModalLayoutComponent } from './components/modal-layout/modal-layout.component'

@NgModule({
  declarations: [
    HeaderComponent,
    ButtonComponent,
    LoaderComponent,
    InputSearchComponent,
    ModalLayoutComponent,
  ],
  imports: [CommonModule, FontAwesomeModule, TranslateModule],
  exports: [
    HeaderComponent,
    ButtonComponent,
    InputSearchComponent,
    ModalLayoutComponent,
  ],
})
export class CommonSharedModule {}
