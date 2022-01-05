import { Component } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private _translate: TranslateService) {
    _translate.addLangs(['es', 'en'])
    _translate.setDefaultLang('es')
    _translate.use('es')
  }
}
