<script setup>
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'

const { product } = defineProps(['product'])
</script>

<template>
  <div class="card box">
    <div class="card-image title">
      <figure class="image is-1by1">
        <img :src="product.thumbnail" alt="Placeholder image" style="object-fit: cover" />
      </figure>
    </div>
    <div class="content has-text-centered">
      <p class="title is-4">{{ product.title }}</p>
      <p class="tag subtitle is-6 is-light is-success">{{ product.category }}</p>
      <br />
      <p class="tag subtitle is-6 is-light is-info">{{ product.brand }}</p>
      <p class="subtitle is-5">{{ `${product.price} $` }}</p>
      <RouterLink :to="`/product/${product.id}`" class="button is-link">View details</RouterLink>
    </div>
  </div>
</template>
