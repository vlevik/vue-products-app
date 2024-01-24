<script setup>
import { ref, onMounted, watch, watchEffect } from 'vue'
import { store } from '../store.js'
import ProductCard from './ProductCard.vue'
import Loader from './TheLoader.vue'
import ErrorMessage from './ErrorMessage.vue'
import ThePagination from './ThePagination.vue'
import getProducts from '../api/products'

const sortByCategories = ['Default', 'By rating', 'By title']

const filteredProducts = ref([])
const productsToRender = ref([])
const loading = ref(false)
const hasError = ref(false)
const page = ref(1)
const pages = ref(1)
const search = ref('')
const sortBy = ref('Default')

onMounted(() => {
  if (!store.products.length) {
    loading.value = true

    const getAndSetProducts = async () => {
      try {
        const res = await getProducts()
        filteredProducts.value = res.data.products
        store.products = res.data.products
        productsToRender.value = [...res.data.products].slice(
          (page.value - 1) * 12,
          page.value * 12
        )
        pages.value = Math.ceil(res.data.products.length / 12)
      } catch {
        hasError.value = true
      } finally {
        loading.value = false
      }
    }

    getAndSetProducts()
  }

  filteredProducts.value = store.products
})

watch(search, () => {
  filteredProducts.value = [...store.products].filter((product) =>
    product.title.toLowerCase().includes(search.value.toLowerCase())
  )

  pages.value = Math.ceil(filteredProducts.value.length / 12)
  page.value = 1
})

watch(sortBy, () => {
  switch (sortBy.value) {
    case 'By rating':
      filteredProducts.value = [...filteredProducts.value].sort((a, b) => b.rating - a.rating)
      break

    case 'By title':
      filteredProducts.value = [...filteredProducts.value].sort((a, b) =>
        a.title.localeCompare(b.title)
      )
      break

    default:
      break
  }
})

watchEffect(() => {
  productsToRender.value = [...filteredProducts.value].slice((page.value - 1) * 12, page.value * 12)
	pages.value = Math.ceil(filteredProducts.value.length / 12)
})

const changePage = (pageNumber) => {
  page.value = pageNumber
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <ErrorMessage v-if="hasError" />
  <Loader v-if="loading" />
  <div class="grid" v-else>
    <div class="grid_area grid box">
      <p class="title grid_filter">Filters area</p>
      <input class="input grid_filter" type="text" placeholder="Search..." v-model.trim="search" />
      <div class="select">
        <select v-model="sortBy">
          <option
            v-for="category in sortByCategories"
            :key="category"
            :value="category"
            :disabled="category === 'Default'"
          >
            {{ category }}
          </option>
        </select>
      </div>
    </div>
    <ProductCard
      v-for="product in productsToRender"
      :key="product.id"
      :product="product"
      class="grid_product"
    />
    <div class="grid_area box">
      <ThePagination
        v-if="filteredProducts.length"
        :currentPage="page"
        :pages="pages"
        @setPage="changePage"
      />
    </div>
  </div>
</template>
