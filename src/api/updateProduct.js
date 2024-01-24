import { client } from '@/httpClient'

export default function addProduct(id, newData) {
  return client.put(`/products/${id}`, newData)
}
