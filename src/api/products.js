import { client } from "@/httpClient"

export default function getProducts() {
	return client.get('/products')
}
