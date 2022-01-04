import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import {
  Item,
  ItemList,
} from 'src/app/common-shared/constants/model/item.model'
import { unfreeze } from 'src/app/common-shared/utility/object.utility'
import { SubSink } from 'src/app/common-shared/utility/subsink.utility'
import { ClearAllSetTimeouts } from 'src/app/common-shared/utility/timeout.utility'
import { ItemsService } from 'src/app/services/items.service'

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit, OnDestroy {
  items: ItemList | undefined
  favourites: Item[] | undefined
  subscriptions = new SubSink()
  max: number = 5
  modalRef: BsModalRef = new BsModalRef()
  clearAllTimeouts = new ClearAllSetTimeouts()
  loading: boolean = false
  selectedItem: Item = new Item()

  @ViewChild('removeFavouriteModal', { static: false })
  removeFavouriteModal: TemplateRef<any> | undefined

  constructor(
    private itemsService: ItemsService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.subscriptions.sink = this.itemsService.items$.subscribe(
      (items: ItemList | undefined) => {
        if (items) {
          this.items = unfreeze(items)
          this.favourites = unfreeze(items).items?.filter(
            (i: Item) => i.favourite
          )
        }
      }
    )
  }

  deleteFavourite(): void {
    this.items!.items![
      this.items!.items!.findIndex((i) => i.title === this.selectedItem.title)
    ].favourite = false
    this.itemsService.items$.next(this.items)
  }

  openModal(item: Item): void {
    this.selectedItem = item
    this.modalRef = this.modalService.show(
      this.removeFavouriteModal as TemplateRef<any>,
      {
        ignoreBackdropClick: false,
        class: 'modal-dialog-centered modal-layout_small modal-layout_pb-3',
      }
    )
  }

  onConfirm(): void {
    this.loading = true
    this.deleteFavourite()
    this.clearAllTimeouts.add = setTimeout(() => {
      this.onDecline()
      this.loading = false
    }, 300)
  }

  onDecline(): void {
    this.modalRef?.hide()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
