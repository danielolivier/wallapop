import { Component, OnInit } from '@angular/core'
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

  constructor(
    private translate: TranslateService,
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this.langs = this.translate.getLangs()
    this.activeLang = this.translate.currentLang
  }

  setLang(lang: string): void {
    this.activeLang = lang
    this.translate.use(lang)
  }

  onInputChange(value: string): void {
    this.itemsService.searchValue$.next(value)
  }
}
