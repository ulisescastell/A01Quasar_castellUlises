<template>
  <q-page class="q-pa-md">

    <q-toolbar class="bg-grey-2 text-black rounded-borders q-px-md q-mb-lg">
      <q-toolbar-title class="text-h5 text-bold text-primary">
        🛍️ Product Catalog
      </q-toolbar-title>
    </q-toolbar>

    <div class="row q-gutter-md q-mb-md">
      <q-btn label="Add New" color="primary" outline icon="add" @click="showForm = true" />
      <q-btn label="Reset List" color="negative" outline icon="refresh" @click="resetItems" />
      <q-btn outline color="pink-8" label="MY WISHLIST" icon="favorite" @click="router.push('/wishlist')" />
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <q-input filled dense v-model="searchQuery" label="Search product..." clearable @clear="onClear" class="col" />
      <q-select filled dense v-model="selectedPrice" :options="priceOptions" label="Filter by price" clearable
        class="col" />
    </div>

    <div class="q-pa-md bg-grey-1 rounded-borders">
      <q-table flat bordered :rows="filteredItems" :columns="columns" row-key="id" :rows-per-page-options="[5, 10, 20]"
        @row-click="showDetails" class="rounded-borders">

        <template v-slot:body-cell-product="props">
          <q-td :props="props">
            <div class="row items-center q-gutter-sm">
              <q-img :src="props.row.image" style="width: 40px; height: 40px;" fit="contain" class="rounded-borders" />
              <div class="text-weight-medium">{{ props.row.name }}</div>
              <q-btn dense flat round size="sm" :icon="isFavorite(props.row.id) ? 'favorite' : 'favorite_border'"
                color="pink" @click.stop="toggleFavorite(props.row.id)" />
            </div>
          </q-td>
        </template>

      </q-table>

    </div>

    <q-banner v-if="filteredItems.length === 0" class="bg-grey-3 q-pa-md text-center q-mt-md text-grey-8">
      No products available.
    </q-banner>

    <q-dialog v-model="showForm" persistent>
      <q-card class="q-pa-md" style="width: 500px; max-width: 90vw;">
        <q-card-section>
          <ItemForm @save="addItem" @cancel="showForm = false" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-footer class="bg-grey-2 text-center q-pa-sm text-caption text-grey-8">
      Made with ❤️ using Quasar & FakestoreAPI<br />
      © 2025 - Uli
    </q-footer>
  </q-page>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import ItemForm from '../components/ItemForm.vue'

const router = useRouter()

const items = ref([])
const showForm = ref(false)
const nextId = ref(1000)
const searchQuery = ref('')
const selectedPrice = ref(null)

const priceOptions = ['Less than 100', '100 - 500', 'More than 500']

const columns = [
  {
    name: 'product',
    label: 'Product',
    field: row => row.name,
    align: 'left',
    sortable: true
  },
  {
    name: 'price',
    label: 'Price',
    field: 'price',
    align: 'left',
    sortable: true
  }
]

const filteredItems = computed(() => {
  return items.value.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.value.toLowerCase())

    let matchesPrice = true
    if (selectedPrice.value) {
      if (selectedPrice.value === 'Less than 100') matchesPrice = item.price < 100
      if (selectedPrice.value === '100 - 500') matchesPrice = item.price >= 100 && item.price <= 500
      if (selectedPrice.value === 'More than 500') matchesPrice = item.price > 500
    }

    return matchesSearch && matchesPrice
  })
})

const loadItems = async () => {
  const storedItems = JSON.parse(localStorage.getItem('productos'))

  if (storedItems && storedItems.length > 0) {
    items.value = storedItems
    nextId.value = Math.max(...items.value.map(i => i.id)) + 1
  } else {
    await fetchAPIItems()
  }
}

const fetchAPIItems = async () => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products')
    items.value = response.data.map(product => ({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category
    }))
    nextId.value = Math.max(...items.value.map(i => i.id)) + 1
    saveItems()
  } catch (error) {
    console.error('Error loading data:', error)
  }
}

const saveItems = () => {
  localStorage.setItem('productos', JSON.stringify(items.value))
}

const addItem = (newItem) => {
  const newProduct = {
    id: nextId.value,
    name: newItem.name,
    price: newItem.price,
    image: newItem.image?.trim() || 'https://img.icons8.com/?size=100&id=68826&format=png&color=000000',
    description: newItem.description || '',
    category: newItem.category || ''
  }

  items.value.unshift(newProduct)
  nextId.value++
  saveItems()
  showForm.value = false
}

const resetItems = async () => {
  localStorage.removeItem('productos')
  items.value = []
  nextId.value = 1000
  await fetchAPIItems()
}

const onClear = () => {
  searchQuery.value = ''
}

const showDetails = (evt, row) => {
  window.location.href = `/items/${row.id}`
}

const favoriteIds = ref(JSON.parse(localStorage.getItem('wishlist') || '[]'))

const isFavorite = (id) => favoriteIds.value.includes(id)

const toggleFavorite = (id) => {
  if (favoriteIds.value.includes(id)) {
    favoriteIds.value = favoriteIds.value.filter(i => i !== id)
  } else {
    favoriteIds.value.push(id)
  }
  localStorage.setItem('wishlist', JSON.stringify(favoriteIds.value))
}

onMounted(() => {
  loadItems()
})


</script>
