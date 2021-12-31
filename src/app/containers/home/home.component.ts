import { Component, OnDestroy, OnInit } from '@angular/core'
import { ItemList } from 'src/app/common-shared/constants/model/item.model'
import { unfreeze } from 'src/app/common-shared/utility/object.utility'
import { SubSink } from 'src/app/common-shared/utility/subsink.utility'
import { ItemsService } from 'src/app/services/items.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  subscriptions = new SubSink()
  items: ItemList | undefined
  max: number = 5

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.subscriptions.sink = this.itemsService
      .getItems()
      .subscribe((items: ItemList) => {
        this.items = unfreeze(items)
      })
  }

  toggle(): void {
    this.max = this.max + 5
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
