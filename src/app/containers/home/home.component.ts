import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import {
  faArrowDown,
  faArrowUp,
  faCommentDots,
  faEnvelope,
  faHeading,
  faSearchPlus,
  faSort,
} from '@fortawesome/free-solid-svg-icons'

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
  itemsSubscription = new SubSink()
  clearTimeouts = new ClearAllSetTimeouts()
  items: ItemList | undefined
  shownItems: Item[] | undefined
  max: number = 5
  mainLoading: boolean = false
  loading: boolean = false
  sortType: ItemProperty | undefined
  toggleSort: boolean = false
  reverse: boolean = false
  readonly icons = {
    plusIcon: faSearchPlus,
    sortIcon: faSort,
    title: faHeading,
    description: faCommentDots,
    arrowUp: faArrowUp,
    arrowDown: faArrowDown,
    email: faEnvelope,
  }

  @ViewChild('sortHeader', { static: true }) sortHeader: ElementRef | undefined
  @ViewChild('sortOptions', { static: false }) sortOptions:
    | ElementRef
    | undefined

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.subscriptions.sink = this.itemsService.items$.subscribe((items) => {
      if (items?.items?.length) {
        this.items = unfreeze(items)
        this.shownItems = unfreeze(items.items)
      } else {
        this.initData()
      }
    })
    this.subscriptions.sink = this.itemsService.searchValue$.subscribe(
      (value: string) => {
        this.mainLoading = true
        this.clearTimeouts.add = setTimeout(() => {
          if (value === '' || value === undefined) {
            this.shownItems = unfreeze(this.items?.items!)
          }
          if (this.items?.items) {
            this.shownItems = this.items.items.filter((item) =>
              JSON.stringify(Object.values(item))
                .toLowerCase()
                .includes(value.toLowerCase())
            )
          }
          this.mainLoading = false
        }, 300)
      }
    )
  }

  initData(): void {
    this.itemsSubscription.sink = this.itemsService
      .getItems()
      .subscribe((items: ItemList) => {
        this.items = unfreeze(items)
        this.shownItems = unfreeze(items?.items!)
        this.itemsSubscription.unsubscribe()
      })
  }

  sort(type: ItemProperty = 'title', reverse: boolean = false): void {
    this.mainLoading = true
    this.toggleSort = false
    this.sortType = type
    if (type === 'price') {
      this.reverse = reverse
      this.clearTimeouts.add = setTimeout(() => {
        this.shownItems?.sort((a: Item, b: Item) =>
          !reverse ? a[type]! - b[type]! : b[type]! - a[type]!
        )
        this.mainLoading = false
      }, 500)
      return
    }
    this.clearTimeouts.add = setTimeout(() => {
      this.shownItems?.sort((a: Item, b: Item) =>
        String(a[type])?.localeCompare(String(b[type]))
      )
      this.mainLoading = false
    }, 500)
  }

  toggle(): void {
    this.loading = true
    this.clearTimeouts.add = setTimeout(() => {
      this.max = this.max + 5
      this.loading = false
    }, 300)
  }

  handleFavouriteAction(item: Item): void {
    this.items!.items![
      this.items!.items!.findIndex((i) => i.title === item.title)
    ].favourite = item.favourite
  }

  ngOnDestroy(): void {
    this.itemsService.items$.next(this.items)
    this.clearTimeouts.clearAll()
    this.subscriptions.unsubscribe()
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: any): void {
    if (
      !this.sortOptions?.nativeElement.contains(event.target) &&
      !this.sortHeader?.nativeElement.contains(event.target)
    ) {
      this.toggleSort = false
    }
  }
}
