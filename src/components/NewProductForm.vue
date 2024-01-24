<script setup>
import { onMounted, ref } from 'vue'
import { FormKit } from '@formkit/vue'
import { reset } from '@formkit/core'
import { useRouter } from 'vue-router'
import Loader from './TheLoader.vue'
import ErrorMessage from './ErrorMessage.vue'
import { store } from '../store.js'
import addProduct from '../api/addProduct'
import getAllCategories from '../api/categories'

const router = useRouter()
const categories = ref([])
const loading = ref(true)
const hasError = ref(false)

const title = ref('')
const brand = ref('')
const category = ref('')
const description = ref('')
const discountPercentage = ref('')
const mainImage = ref('')
const images = ref([])
const price = ref('')
const rating = ref('')
const stock = ref('')

onMounted(() => {
  const getCategories = async () => {
    try {
      const res = await getAllCategories()
      categories.value = [...res.data]
    } catch {
      hasError.value = true
    } finally {
      loading.value = false
    }
  }

  getCategories()
})

const onCancel = () => {
  reset('create_product_form')
  router.push({ path: '/' })
}

const onSubmit = async () => {
  try {
    const newProductInfo = {
      title: title.value,
      brand: brand.value,
      category: category.value,
      description: description.value,
      discountPercentage: discountPercentage.value,
      thumbnail: mainImage.value,
      images: images.value.split(', '),
      price: price.value,
      rating: rating.value,
      stock: stock.value
    }
    const { data: newProduct } = await addProduct(newProductInfo)

    // when I send more than 10 properties in on object, DummyJSON returns only the first 10 so I add discountPercentage in this way
    // I added my own id because it always returns the same id
    store.products.unshift({
      ...newProduct,
      discountPercentage: discountPercentage.value,
      id: Date.now()
    })
    reset('create_product_form')
    router.push({ path: '/' })
  } catch {
    hasError.value = true
  }
}
</script>

<template>
  <ErrorMessage v-if="hasError" />
  <Loader v-if="loading" />
  <div class="box moveDown" v-else>
    <h1 class="title">Add new product</h1>
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
  </div>
</template>
