export class ItemList {
  items?: Item[]
}

export class Item {
  title?: string
  description?: string
  price?: number
  email?: string
  image?: string
}

export type ItemProperty = 'title' | 'description' | 'price' | 'email' | 'image'
