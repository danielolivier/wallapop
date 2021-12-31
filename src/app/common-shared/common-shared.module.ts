import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component'

@NgModule({
  declarations: [HeaderComponent, ButtonComponent],
  imports: [CommonModule],
  exports: [HeaderComponent],
})
export class CommonSharedModule {}
