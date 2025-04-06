<template>
  <q-page class="q-pa-md bg-grey-1">

    <div
      v-if="item"
      :style="`background-image: url(${item.image});`"
      class="blurred-background"
    ></div>

    <div class="q-mx-auto" style="max-width: 800px; position: relative; z-index: 1">
      <q-card class="q-pa-xl q-mb-xl shadow-3 bg-white rounded-borders">

        <q-toolbar class="bg-grey-2 text-black rounded-borders q-mb-md">
          <q-btn flat icon="arrow_back" @click="router.push('/items')" />
          <q-toolbar-title class="text-h5 text-primary">Product Details</q-toolbar-title>
        </q-toolbar>

        <q-card-section v-if="item" class="q-gutter-md">

          <div class="flex flex-center">
            <q-img
              :src="item.image"
              style="width: 280px; height: 280px; object-fit: contain; background-color: white;"
              class="rounded-borders shadow-2"
            />
          </div>

          <div class="text-h4 text-bold text-primary text-center">
            {{ item.name }}
          </div>

          <div class="text-h5 text-dark text-center q-mb-sm">
            <q-icon name="attach_money" class="q-mr-xs" />
            {{ item.price.toFixed(2) }}
          </div>

          <q-separator class="q-my-md" />

          <div class="text-body1 q-mb-md" style="font-size: 1.1rem;">
            <strong>Description:</strong><br />
            {{ item.description || 'No description available.' }}
          </div>

          <div class="text-caption text-grey-7 text-center">
            Category: <span class="text-weight-medium">{{ item.category || 'N/A' }}</span>
          </div>
        </q-card-section>

        <q-card-section v-else class="text-negative text-h6 text-center">
          Product not found
        </q-card-section>

        <q-card-actions align="center" v-if="item">
          <q-btn
            label="Delete Product"
            color="red"
            icon="delete"
            class="q-mt-md"
            unelevated
            size="lg"
            rounded
            @click="confirmDelete = true"
          />
        </q-card-actions>
      </q-card>
    </div>

    <q-dialog v-model="confirmDelete">
      <q-card class="q-pa-md" style="width: 400px; max-width: 90vw;">
        <q-card-section class="text-h6 text-center">
          Are you sure you want to delete this product?
        </q-card-section>
        <q-card-actions align="center">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn color="red" label="Delete" @click="deleteItem" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const item = ref(null)
const confirmDelete = ref(false)

const loadProduct = () => {
  const storedItems = JSON.parse(localStorage.getItem('productos')) || []
  item.value = storedItems.find(i => String(i.id) === String(route.params.id))

  if (!item.value) {
    console.warn(`Product with ID ${route.params.id} not found`)
    router.push('/items')
  }
}

const deleteItem = () => {
  let storedItems = JSON.parse(localStorage.getItem('productos')) || []
  storedItems = storedItems.filter(i => String(i.id) !== String(route.params.id))
  localStorage.setItem('productos', JSON.stringify(storedItems))
  router.push('/items')
}

onMounted(loadProduct)
watchEffect(loadProduct)
</script>

<style scoped>
.blurred-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(15px) brightness(0.65);
  z-index: 0;
}
</style>
