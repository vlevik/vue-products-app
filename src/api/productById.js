import { client } from '@/httpClient'

export default function getProductById(id) {
  return client.get(`/products/${id}`)
}
