import { PlatformLocation } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-modal-layout',
  templateUrl: './modal-layout.component.html',
  styleUrls: ['./modal-layout.component.scss'],
})
export class ModalLayoutComponent {
  @Input() loading: boolean = false
  @Output() confirm = new EventEmitter()
  @Output() decline = new EventEmitter()

  readonly icons = {
    closeIcon: faTimesCircle,
    checkIcon: faCheck,
  }

  constructor(private location: PlatformLocation) {
    this.location.onPopState(() => this.onDecline())
  }

  onConfirm(): void {
    this.confirm.emit()
  }

  onDecline(): void {
    this.decline.emit()
  }
}
