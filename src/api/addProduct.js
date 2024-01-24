import { client } from '@/httpClient'

export default function addProduct(newProduct) {
  return client.post('/products/add', newProduct)
}
