<template>
  <q-page class="q-pa-lg bg-grey-1">

    <q-toolbar class="bg-grey-2 text-black q-mb-xl rounded-borders shadow-1">
      <q-btn flat icon="arrow_back" @click="router.push('/items')" />
      <q-toolbar-title class="text-h5 text-bold text-primary">My Wishlist</q-toolbar-title>
    </q-toolbar>

    <div class="q-mx-auto" style="max-width: 900px;">

      <q-card flat bordered class="q-pa-md bg-white shadow-2 rounded-borders">
        <q-table
          flat
          bordered
          :rows="favoriteItems"
          :columns="columns"
          row-key="id"
          class="text-subtitle1"
          :rows-per-page-options="[5, 10, 20]"
          @row-click="goToDetail"
        >
          <template v-slot:body-cell-product="props">
            <q-td :props="props">
              <div class="row items-center q-gutter-md">
                <q-img
                  :src="props.row.image"
                  style="width: 60px; height: 60px;"
                  fit="cover"
                  class="bg-white rounded-borders shadow-1"
                />
                <div class="text-weight-medium text-body1">{{ props.row.name }}</div>
              </div>
            </q-td>
          </template>
        </q-table>
      </q-card>

      <q-banner v-if="favoriteItems.length === 0" class="bg-grey-3 text-center text-grey-8 q-mt-lg q-pa-md rounded-borders shadow-1">
        You haven't added any favorites yet.
      </q-banner>

    </div>
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
