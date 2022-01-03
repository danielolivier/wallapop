import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  langs: string[] = []
  activeLang: string | undefined

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.langs = this.translate.getLangs()
    this.activeLang = this.translate.currentLang
  }

  setLang(lang: string): void {
    this.activeLang = lang
    this.translate.use(lang)
  }
}
