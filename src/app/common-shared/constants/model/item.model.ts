export class ItemList {
  items?: Item[]

  constructor() {
    this.items = []
  }
}

export class Item {
  title?: string
  description?: string
  price?: number
  email?: string
  image?: string
  favourite?: boolean = false
}

export type ItemProperty = 'title' | 'description' | 'price' | 'email' | 'image'
