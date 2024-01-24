<script setup>
	import { onMounted, ref } from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	import { store } from '../store.js';
	import UpdateModal from './UpdateModal.vue';
	// import getProductById from '../api/productById.js';
	// import deleteProduct from '@/api/deleteProduct';

	const route = useRoute();
	const router = useRouter();
	const product = ref({});
	const isEditing = ref(false);

	const id = +route.params.id

	onMounted(() => {
		// this part will be used with the server, not the simulator
		// product.value = await getProductById(id);

		product.value = store.products.find(item => item.id === id);
	})

	const removeProduct = async () => {
		// this part will be used with the server, not the simulator
		// const deletedProduct = await deleteProduct(id);

		store.products = store.products.filter(product => product.id !== id);
		router.push({ path: '/' })
	}

	const startEditing = () => {
		isEditing.value = true;
	}
</script>

<template>
	<div class="moveDown">
		<UpdateModal
			v-if="isEditing"
			:product="product"
			:class="{ 'is-active': isEditing }"
			@setEditingStatus="isEditing = $event"
			@updateProduct="product = $event"
		/>
		<div class="box">
			<article class="media columns">
					<figure class="image main_photo is-one-quarter-desktop is-half-tablet">
						<img :src="product.thumbnail" alt="Image">
					</figure>
				<div class="media is-one-quarter-desktop is-half-tablet">
					<div class="content">
						<h1 class="title is-3">{{ product.title }}</h1>
						<div class="block"> 
							<p class="title is-5">Brand: {{ product.brand }}</p>
							<p class="title is-5">Category: {{ product.category }}</p>
							<p class="title is-5">
								Price: {{ product.price }}
								<i class="fa-solid fa-dollar-sign"></i>
							</p>
							<p class="title is-5">
								Discount: {{ product.discountPercentage }}
								<i class="fa-solid fa-percent"></i>
							</p>
							<p class="title is-5">
								Rating: {{ product.rating }}
								<i class="fa-regular fa-star"></i>
							</p>
							<p class="title is-5">
								{{ product.stock }} in stock
							</p>
						</div>

						<div class="block buttons">
							<button 
								class="button is-primary"
								@click="startEditing"
							>
								Update
							</button>
							<button 
								class="button is-danger"
								@click="removeProduct"
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</article>

			<div class="content">
				<h3 class="title is-5 block">Description</h3>
				<p class="subtitle block">{{ product.description }}</p>
			</div>

			<h3 class="title is-5 block">Product images</h3>
			<div class="columns is-multiline">
				<div 
					v-for="image in product.images" 
					:key="image" 
					class="column is-one-quarter-desktop is-half-tablet"
				>
					<div class="card">
						<div class="card-image">
							<figure 
								class="image is-3by2"
							>
								<img :src="image" alt="Product image" class="pretty_photo">
							</figure>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.main_photo {
		width: 50%;
		object-fit: contain;
		margin-right: 16px;
	}

	.pretty_photo {
		object-fit: contain;
	}
</style>