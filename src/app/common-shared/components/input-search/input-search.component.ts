import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { faBackspace, faSearch } from '@fortawesome/free-solid-svg-icons'

import { ClearAllSetTimeouts } from '../../utility/timeout.utility'

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
})
export class InputSearchComponent implements OnDestroy {
  @Input() placeholder = ''
  @Input()
  get value(): string {
    return this.val
  }
  set value(val: string) {
    this.val = val
  }
  @Output() inputChange = new EventEmitter()
  val = ''
  focus = false
  clearTimeouts = new ClearAllSetTimeouts()
  showRemoveButton: boolean = false
  readonly icons = {
    searchIcon: faSearch,
    delete: faBackspace,
  }

  constructor(private _router: Router) {
    _router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.value = ''
        this.inputChange.emit('')
      }
    })
  }

  onValueChange(value: any): void {
    this.value = value
    this.showRemoveButton = this.value !== ''
  }

  handleKeyPress($event: any): void {
    const keyCode = $event.keyCode
    if (keyCode === 13) {
      this.handleSendClick()
    }
  }

  handleSendClick(): void {
    this.inputChange.emit(this.value?.trim())
  }

  resetValue(): void {
    this.showRemoveButton = false
    this.clearTimeouts.add = setTimeout(() => {
      this.value = ''
      this.handleSendClick()
    }, 0)
  }

  ngOnDestroy(): void {
    this.clearTimeouts.clearAll()
  }
}
