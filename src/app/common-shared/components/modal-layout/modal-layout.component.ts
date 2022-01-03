import { PlatformLocation } from '@angular/common'
import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-modal-layout',
  templateUrl: './modal-layout.component.html',
  styleUrls: ['./modal-layout.component.scss'],
})
export class ModalLayoutComponent {
  @Output() confirm = new EventEmitter()
  @Output() decline = new EventEmitter()

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
