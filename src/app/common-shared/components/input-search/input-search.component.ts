import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { faBackspace, faSearch } from '@fortawesome/free-solid-svg-icons'
import { ClearAllSetTimeouts } from '../../utility/timeout.utility'

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
})
export class InputSearchComponent implements OnInit, OnDestroy {
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
  readonly icons = {
    searchIcon: faSearch,
    delete: faBackspace,
  }
  showRemoveButton: boolean = false

  @ViewChildren('input') input: QueryList<ElementRef> = new QueryList()

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.value = ''
        this.inputChange.emit('')
      }
    })
  }

  ngOnInit(): void {}

  onValueChange(value: any): void {
    this.showRemoveButton = this.value !== '' || this.value !== undefined
    this.value = value
  }

  setFocus(): void {
    this.focus = true
  }

  focusInput(): void {
    this.clearTimeouts.add = setTimeout(() => {
      this.input.first.nativeElement.focus()
    }, 0)
  }

  handleKeyPress($event: any): void {
    const keyCode = $event.keyCode
    if (keyCode === 13) {
      this.handleSendClick()
    }
  }

  handleSendClick(): void {
    if (this.focus) {
      this.focusInput()
    }
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
