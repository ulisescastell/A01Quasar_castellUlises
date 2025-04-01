<template>
  <q-page class="q-pa-md">

    <q-toolbar class="bg-grey-2 text-black q-mb-md">
      <q-btn flat icon="arrow_back" @click="router.push('/items')" />
      <q-toolbar-title>Product Details</q-toolbar-title>
    </q-toolbar>

    <div class="q-pa-lg flex flex-center">
      <q-card flat bordered class="q-pa-md" style="max-width: 500px; width: 100%;">
        <q-card-section v-if="item" class="q-gutter-md">

          <div class="flex flex-center">
            <q-img :src="item.image" style="width: 200px; height: 200px; object-fit: contain; background-color: white;"
              class="rounded-borders" />
          </div>

          <div class="text-h5 text-bold text-primary text-center">
            {{ item.name }}
          </div>

          <div class="text-subtitle1 text-dark text-center">
            <q-icon name="attach_money" class="q-mr-xs" />
            {{ item.price.toFixed(2) }}
          </div>

          <div class="text-body1">
            <strong>Description:</strong>
            <div class="q-mt-xs">
              {{ item.description || 'No description available.' }}
            </div>
          </div>

          <div class="text-caption text-grey-7">
            Category:
            <span class="text-weight-medium">{{ item.category || 'N/A' }}</span>
          </div>

        </q-card-section>

        <q-card-section v-else class="text-negative text-h6 text-center">
          Product not found
        </q-card-section>

        <q-card-actions align="right" v-if="item">
          <q-btn label="Delete Product" color="red" @click="confirmDelete = true" />
        </q-card-actions>
      </q-card>
    </div>

    <q-dialog v-model="confirmDelete">
      <q-card>
        <q-card-section>
          <div class="text-h6">Are you sure you want to delete this product?</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn color="red" label="Delete" @click="deleteItem" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-footer class="bg-grey-2 text-center q-pa-sm text-caption text-grey-8">
      Made with ❤️ using Quasar & FakestoreAPI<br />
      © 2025 - Uli
    </q-footer>
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

onMounted(loadProduct)
watchEffect(loadProduct)

const deleteItem = () => {
  let storedItems = JSON.parse(localStorage.getItem('productos')) || []
  storedItems = storedItems.filter(i => String(i.id) !== String(route.params.id))
  localStorage.setItem('productos', JSON.stringify(storedItems))
  router.push('/items')
}
</script>
