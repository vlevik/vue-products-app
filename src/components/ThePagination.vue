<script setup>
import { defineProps, defineEmits } from 'vue'

const { pages, currentPage } = defineProps(['pages', 'currentPage'])
const emit = defineEmits(['setPage'])
</script>

<template>
  <nav class="pagination" role="navigation" aria-label="pagination">
    <button
      class="pagination-previous"
      :class="currentPage === 1 ? 'is-disabled' : ''"
      title="This is the first page"
      @click="emit('setPage', currentPage - 1)"
      :disabled="currentPage === 1"
    >
      Previous
    </button>

    <ul class="pagination-list">
      <li v-for="page in pages" :key="page">
        <a
          class="pagination-link"
          :class="page === currentPage ? 'is-current' : ''"
          aria-label="Page 1"
          aria-current="page"
          @click="emit('setPage', page)"
        >
          {{ page }}
        </a>
      </li>
    </ul>
    <button
      class="pagination-next"
      :class="currentPage === pages ? 'is-disabled' : ''"
      @click="emit('setPage', currentPage + 1)"
      :disabled="currentPage === pages"
    >
      Next page
    </button>
  </nav>
</template>
