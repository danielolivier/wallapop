import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() disabled: boolean = false
  @Input() icon: IconProp | undefined
  @Input() loading: boolean = false
  @Output() clicked = new EventEmitter()
  @HostBinding('class.disabled') get t(): boolean {
    return this.disabled || this.loading
  }
  constructor() {}
}
