<script setup>
import { onMounted, ref, defineProps } from 'vue'
import { FormKit } from '@formkit/vue'
import { reset } from '@formkit/core'
import { store } from '../store.js'
import getAllCategories from '../api/categories'

const { product } = defineProps(['product'])

const emit = defineEmits(['setEditingStatus', 'updateProduct'])

const categories = ref([])

const title = ref(product.title)
const brand = ref(product.brand)
const category = ref(product.category)
const description = ref(product.description)
const discountPercentage = ref(product.discountPercentage)
const mainImage = ref(product.thumbnail)
const images = ref(product.images)
const price = ref(product.price)
const rating = ref(product.rating)
const stock = ref(product.stock)

onMounted(() => {
  const getCategories = async () => {
    try {
      const res = await getAllCategories()
      categories.value = [...res.data]
    } catch (error) {
      console.error(error)
    }
  }

  getCategories()
})

const onCancel = () => {
  emit('setEditingStatus', false)
}

const onSubmit = async () => {
  const newData = {
    title: title.value,
    brand: brand.value,
    category: category.value,
    description: description.value,
    discountPercentage: discountPercentage.value,
    thumbnail: mainImage.value,
    images: images.value,
    price: price.value,
    rating: rating.value,
    stock: stock.value
  }
  store.products = store.products.map((item) => {
    if (item.id === product.id) {
      return {
        ...product,
        ...newData
      }
    } else {
      return item
    }
  })

  // this part will be used with the server, not the simulator
  // const updatedProduct = await updateProduct(id, newData);

  const updatedProduct = store.products.find((item) => item.id === product.id)

  emit('updateProduct', updatedProduct)
  reset('create_product_form')
  onCancel()
}
</script>

<template>
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Update product</p>
        <button class="delete" aria-label="close" @click="onCancel"></button>
      </header>
      <section class="modal-card-body">
        <FormKit
          type="form"
          id="create_product_form"
          label="Submit"
          outer-class="field control"
          input-class="button is-link"
          submit-label="Submit"
          @submit="onSubmit"
          :actions="false"
        >
          <FormKit
            outer-class="field"
            input-class="input"
            label-class="label"
            message-class="has-text-danger"
            label="Title"
            type="text"
            placeholder="Your title"
            v-model="title"
            validation="required|length:3"
          />
          <FormKit
            outer-class="field"
            input-class="input"
            label-class="label"
            message-class="has-text-danger"
            label="Brand"
            type="text"
            placeholder="Brand"
            v-model="brand"
            validation="required|length:2"
          />
          <FormKit
            outer-class="field"
            inner-class="select"
            label-class="label"
            message-class="has-text-danger"
            label="Category"
            type="select"
            placeholder="Select category"
            v-model="category"
            validation="required"
            :options="categories"
          />
          <FormKit
            outer-class="field"
            input-class="input"
            label-class="label"
            message-class="has-text-danger"
            label="Price"
            type="number"
            placeholder="Price"
            v-model="price"
            validation="required|min:1"
          />
          <FormKit
            outer-class="field"
            input-class="input"
            label-class="label"
            message-class="has-text-danger"
            label="Discount"
            type="number"
            placeholder="Discount %"
            v-model="discountPercentage"
            validation="required|min:0|max:99.99|step:0.01"
            step="0.01"
          />
          <FormKit
            outer-class="field"
            input-class="input"
            label-class="label"
            message-class="has-text-danger"
            label="Main image"
            type="url"
            placeholder="Image link"
            v-model="mainImage"
            validation="required|url"
          />
          <FormKit
            outer-class="field"
            input-class="input"
            label-class="label"
            message-class="has-text-danger"
            label="Additional images"
            type="url"
            multiple
            placeholder="Images links"
            v-model="images"
            validation="required|url"
          />
          <FormKit
            outer-class="field"
            input-class="textarea"
            label-class="label"
            message-class="has-text-danger"
            label="Description"
            type="textarea"
            placeholder="Describe your product"
            v-model="description"
            validation="required"
          />
          <FormKit
            outer-class="field"
            input-class="input"
            label-class="label"
            message-class="has-text-danger"
            label="Rating"
            type="number"
            placeholder="Rating of your product"
            v-model="rating"
            validation="required|min:0|max:5|step:0.1"
            step="0.01"
          />
          <FormKit
            outer-class="field"
            input-class="input"
            label-class="label"
            message-class="has-text-danger"
            label="In stock"
            type="number"
            placeholder="Amount in stock"
            v-model="stock"
            validation="required|min:1"
          />
          <div class="field buttons is-grouped">
            <div class="control">
              <FormKit
                type="submit"
                label="Submit"
                outer-class="field control"
                input-class="button is-link"
                @submit="onSubmit"
              />
            </div>
            <div class="control">
              <button class="button is-link is-light" @click="onCancel">Cancel</button>
            </div>
          </div>
        </FormKit>
      </section>
    </div>
  </div>
</template>
