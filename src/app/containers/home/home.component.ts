import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { faSearchPlus, faSort } from '@fortawesome/free-solid-svg-icons'
import {
  ItemList,
  Item,
  ItemProperty,
} from 'src/app/common-shared/constants/model/item.model'
import { unfreeze } from 'src/app/common-shared/utility/object.utility'
import { SubSink } from 'src/app/common-shared/utility/subsink.utility'
import { ClearAllSetTimeouts } from 'src/app/common-shared/utility/timeout.utility'
import { ItemsService } from 'src/app/services/items.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  subscriptions = new SubSink()
  clearTimeouts = new ClearAllSetTimeouts()
  items: ItemList | undefined
  max: number = 5
  plusIcon = faSearchPlus
  sortIcon = faSort
  loading = false
  sortType: ItemProperty = 'title'

  @ViewChild('scroll', { static: false }) private scrollContainer:
    | ElementRef
    | undefined

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.subscriptions.sink = this.itemsService
      .getItems()
      .subscribe((items: ItemList) => {
        this.items = unfreeze(items)
        this.sort()
      })
  }

  sort(type: ItemProperty = 'title'): void {
    this.sortType = type
    this.items?.items
      ?.slice(0, this.max)
      .sort((a: Item, b: Item) =>
        String(a[type])?.localeCompare(String(b[type]))
      )
  }

  toggle(): void {
    this.loading = true
    this.clearTimeouts.add = setTimeout(() => {
      this.max = this.max + 5
      this.loading = false
      this.scrollToBottom()
    }, 300)
  }

  scrollToBottom(): void {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight
    }
  }

  openSortModal(): void {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
    this.clearTimeouts.clearAll()
  }
}
