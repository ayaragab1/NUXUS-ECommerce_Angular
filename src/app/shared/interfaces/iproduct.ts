import { Icategory } from "./icategory"

export interface IProduct {
  sold: number
  images: string[]
  subcategory: ISubcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: Icategory
  brand: IBrand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
}

export interface ISubcategory {
  _id: string
  name: string
  slug: string
  category: string
}


export interface IBrand {
  _id: string
  name: string
  slug: string
  image: string
}
