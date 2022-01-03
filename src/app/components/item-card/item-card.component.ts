import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Item } from 'src/app/common-shared/constants/model/item.model'

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent {
  @Input()
  public item: Item | undefined
  @Output() itemClicked = new EventEmitter<Item>()

  constructor() {}
}
