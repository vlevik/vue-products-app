<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <RouterLink class="navbar-item" to="/vue-products-app">
        <img src="https://www.rcpe.ac.uk/sites/default/files/yourlogo.png" />
      </RouterLink>

      <RouterLink class="navbar-item button is-primary is-outlined mt-2" to="/vue-products-app/new">
        Create
      </RouterLink>
    </div>
  </nav>
</template>
