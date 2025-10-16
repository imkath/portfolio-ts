export type Category = "beauty" | "editorial" | "commercial" | "film" | "grooming" | "bridal" | "sfx"

export type CreditRole =
  | "photography"
  | "hair"
  | "styling"
  | "art"
  | "model"
  | "production"
  | "director"
  | "dop"
  | "brand"
  | "publication"

export type ImageFocus = "eyes" | "lips" | "skin" | "fx" | "complexion"

export interface Credit {
  role: CreditRole
  name: string
}

export interface ImageItem {
  src: string
  width: number
  height: number
  alt: string
  focus?: ImageFocus
}

export interface BeforeAfterPair {
  before: ImageItem
  after: ImageItem
}

export interface Project {
  slug: string
  title: string
  clientOrPublication?: string
  year?: number
  country?: string
  categories: Category[]
  images: ImageItem[]
  credits: Credit[]
  videoUrl?: string
  featured?: boolean
  beforeAfter?: BeforeAfterPair[]
  filmStrip?: ImageItem[]
  aboutLook?: string
}
