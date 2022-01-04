import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

import { ItemList } from '../common-shared/constants/model/item.model'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  items$: BehaviorSubject<ItemList | undefined> = new BehaviorSubject<
    ItemList | undefined
  >(undefined)

  constructor(private http: HttpClient) {}

  getItems(): Observable<ItemList> {
    return this.http.get<ItemList>(
      `${environment.apiUrl.itemsService}/items.json`
    )
  }
}
