import { client } from '@/httpClient'

export default function getAllCategories() {
  return client.get('/products/categories')
}
