import { Component, HostListener, OnInit } from '@angular/core'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { TranslateService } from '@ngx-translate/core'

import { ItemsService } from 'src/app/services/items.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  langs: string[] = []
  activeLang: string | undefined
  likeIconSolid = faHeart
  mobileClass: boolean = false

  constructor(
    private _translate: TranslateService,
    private itemsService: ItemsService
  ) {
    if (window.innerWidth < 700) {
      this.mobileClass = true
    }
  }

  ngOnInit(): void {
    this.langs = this._translate.getLangs()
    this.activeLang = this._translate.currentLang
  }

  setLang(lang: string): void {
    this.activeLang = lang
    this._translate.use(lang)
  }

  onInputChange(value: string): void {
    this.itemsService.searchValue$.next(value)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (window.innerWidth < 700) {
      this.mobileClass = true
    } else {
      this.mobileClass = false
    }
  }
}
