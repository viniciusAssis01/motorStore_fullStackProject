export interface iAnnouncements {
  id: string,
  brand: string,
  model: string,
  color: string,
  coverImage: string,
  description: string,
  fipeTablePrice: string,
  fuel: string,
  images: Record<string, string>[],
  mileage: number,
  price: number
  year: number,
  user: {
    id: string,
    name: string,
    description: string,
    color: string,
    cellphone: string,
  }
}