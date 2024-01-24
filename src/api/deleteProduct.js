import { client } from '@/httpClient'

export default function deleteProduct(id) {
  return client.delete(`/products/${id}`)
}
