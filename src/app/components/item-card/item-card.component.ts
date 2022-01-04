import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import { faHeart, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { Item } from 'src/app/common-shared/constants/model/item.model'

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent {
  @Input() item: Item | undefined
  @Input() showFavouriteView: boolean = false
  @Output() favouriteAction = new EventEmitter<Item>()

  selectedItem: Item = new Item()
  readonly icons = {
    likeIconOutlined: faHeart,
    likeIcon: faHeartSolid,
    delete: faTrashAlt,
  }

  constructor() {}

  saveDeleteFavourite(item: Item): void {
    item.favourite = !this.item?.favourite
    this.favouriteAction.emit(item)
  }
}
