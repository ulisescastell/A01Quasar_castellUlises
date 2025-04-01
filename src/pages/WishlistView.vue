<template>
  <q-page class="q-pa-md">
    <q-toolbar class="bg-grey-2 text-black q-mb-md">
      <q-btn flat icon="arrow_back" @click="router.push('/items')" />
      <q-toolbar-title>My Wishlist</q-toolbar-title>
    </q-toolbar>

    <q-table flat bordered :rows="favoriteItems" :columns="columns" row-key="id" @row-click="goToDetail">
      <template v-slot:body-cell-product="props">
        <q-td :props="props">
          <div class="row items-center q-gutter-sm">
            <q-img :src="props.row.image" style="width: 40px; height: 40px;" fit="contain" class="rounded-borders" />
            <div class="text-weight-medium">{{ props.row.name }}</div>
          </div>
        </q-td>
      </template>
    </q-table>

    <q-banner v-if="favoriteItems.length === 0" class="text-center text-grey-7 q-mt-md">
      No favorites added yet.
    </q-banner>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const allItems = ref([])
const favoriteIds = ref([])

onMounted(() => {
  allItems.value = JSON.parse(localStorage.getItem('productos') || '[]')
  favoriteIds.value = JSON.parse(localStorage.getItem('wishlist') || '[]')
})

const favoriteItems = computed(() =>
  allItems.value.filter(i => favoriteIds.value.includes(i.id))
)

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

const goToDetail = (evt, row) => {
  router.push(`/items/${row.id}`)
}
</script>
