import { Component, Input } from '@angular/core'

import { LoaderSize } from '../../constants/model/loader.model'

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  @Input() detail = ''
  @Input() size: LoaderSize = 'large'
}
