<template>
  <q-page class="q-pa-md bg-grey-1">

    <q-card flat bordered class="q-pa-md q-mb-lg rounded-borders shadow-1">
      <q-img
        src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1400&q=80"
        class="rounded-borders"
        style="height: 400px; object-fit: cover;"
      >
        <div class="absolute-bottom text-white q-pa-sm" style="background: rgba(0,0,0,0.4);">
          <div class="text-h4">Discover, explore and manage your favorite meals!</div>
        </div>
      </q-img>
    </q-card>

    <div class="q-gutter-sm q-mb-md row items-center">
      <q-btn label="Add New" color="primary" outline icon="add" @click="showForm = true" rounded size="md" />
      <q-btn label="Reset List" color="negative" outline icon="refresh" @click="resetItems" rounded size="md" />
      <q-btn label="My Wishlist" color="pink-6" outline icon="favorite" @click="router.push('/wishlist')" rounded size="md" />
    </div>

    <div class="row q-gutter-sm q-mb-lg">
      <q-input
        class="col"
        filled
        dense
        v-model="searchQuery"
        label="Search meal..."
        clearable
        @clear="onClear"
        rounded
        input-class="text-subtitle1"
      />
      <q-select
        class="col"
        filled
        dense
        v-model="selectedPrice"
        :options="priceOptions"
        label="Price range"
        clearable
        rounded
        input-class="text-subtitle1"
      />
      <q-select
        class="col"
        filled
        dense
        v-model="selectedCategory"
        :options="categories"
        label="Category"
        clearable
        rounded
        input-class="text-subtitle1"
      />
    </div>

    <q-table
      flat
      bordered
      :rows="filteredItems"
      :columns="columns"
      row-key="id"
      class="rounded-borders bg-white shadow-1 q-mb-xl text-subtitle1"
      :rows-per-page-options="[5, 10, 20]"
      @row-click="showDetails"
    >
      <template v-slot:body-cell-product="props">
        <q-td :props="props" class="q-py-md">
          <div class="row items-center q-gutter-sm">
            <q-img
              :src="props.row.image"
              style="width: 50px; height: 50px;"
              fit="cover"
              class="bg-white rounded-borders"
            />
            <div class="text-body1 text-weight-medium">{{ props.row.name }}</div>
            <q-btn
              dense flat round size="md"
              :icon="isFavorite(props.row.id) ? 'favorite' : 'favorite_border'"
              color="pink"
              @click.stop="toggleFavorite(props.row.id)"
            />
          </div>
        </q-td>
      </template>
    </q-table>

    <q-banner v-if="filteredItems.length === 0" class="bg-grey-3 text-center text-grey-8">
      No meals available.
    </q-banner>

    <q-dialog v-model="showForm" persistent>
      <q-card class="q-pa-md" style="width: 500px; max-width: 90vw;">
        <q-card-section>
          <ItemForm @save="addItem" @cancel="showForm = false" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-footer class="bg-grey-2 text-center q-pa-sm text-caption text-grey-8">
      Made with ❤️ using Quasar & TheMealDB API<br />
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
const selectedCategory = ref(null)

const priceOptions = ['Less than 20', '20 - 50', 'More than 50']
const categories = ref([])

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
      if (selectedPrice.value === 'Less than 20') matchesPrice = item.price < 20
      if (selectedPrice.value === '20 - 50') matchesPrice = item.price >= 20 && item.price <= 50
      if (selectedPrice.value === 'More than 50') matchesPrice = item.price > 50
    }

    const matchesCategory = selectedCategory.value ? item.category === selectedCategory.value : true

    return matchesSearch && matchesPrice && matchesCategory
  })
})


const favoriteIds = ref(JSON.parse(localStorage.getItem('wishlist') || '[]'))
const isFavorite = id => favoriteIds.value.includes(id)
const toggleFavorite = id => {
  if (isFavorite(id)) {
    favoriteIds.value = favoriteIds.value.filter(i => i !== id)
  } else {
    favoriteIds.value.push(id)
  }
  localStorage.setItem('wishlist', JSON.stringify(favoriteIds.value))
  saveItems()
}

const loadItems = async () => {
  const storedItems = JSON.parse(localStorage.getItem('productos'))
  if (storedItems && storedItems.length > 0) {
    storedItems.forEach(item => item.isFavorite = favoriteIds.value.includes(item.id))
    items.value = storedItems
    nextId.value = Math.max(...items.value.map(i => i.id)) + 1
    categories.value = [...new Set(items.value.map(i => i.category))].sort()
  } else {
    await fetchAPIItems()
  }
}

const fetchAPIItems = async () => {
  try {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    const raw = response.data.meals || []
    items.value = raw.map(meal => ({
      id: parseInt(meal.idMeal),
      name: meal.strMeal,
      price: Math.floor(Math.random() * 50) + 10,
      image: meal.strMealThumb,
      description: meal.strInstructions.slice(0, 200) + '...',
      category: meal.strCategory,
      isFavorite: favoriteIds.value.includes(parseInt(meal.idMeal))
    }))
    nextId.value = Math.max(...items.value.map(i => i.id)) + 1
    categories.value = [...new Set(items.value.map(i => i.category))].sort()
    saveItems()
  } catch (error) {
    console.error('Error loading meals:', error)
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
    image: newItem.image?.trim() || 'https://img.icons8.com/?size=100&id=68826&format=png',
    description: newItem.description || '',
    category: newItem.category || '',
    isFavorite: false
  }
  items.value.unshift(newProduct)
  nextId.value++
  saveItems()
  showForm.value = false
}

const resetItems = async () => {
  localStorage.removeItem('productos')
  localStorage.removeItem('wishlist')
  items.value = []
  nextId.value = 1000
  await fetchAPIItems()
}

const onClear = () => {
  searchQuery.value = ''
}

const showDetails = (evt, row) => {
  router.push(`/items/${row.id}`)
}

onMounted(() => {
  loadItems()
})
</script>
