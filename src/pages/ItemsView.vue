<template>
  <q-page class="q-pa-md">
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title>Product List</q-toolbar-title>
    </q-toolbar>

    <div class="q-mt-md q-mb-md row q-gutter-md">
      <q-btn label="Add New" color="green" @click="showForm = true" />
      <q-btn label="Reset List" color="red" @click="resetItems" />
    </div>

    <div class="row q-gutter-md q-mb-md">
      <q-input filled v-model="searchQuery" label="Search product..." clearable />
      <q-select filled v-model="selectedPrice" :options="priceOptions" label="Filter by price" clearable />
    </div>

    <div class="q-pa-md q-gutter-md">
      <q-table class="shadow-2" flat bordered :rows="filteredItems" :columns="columns" row-key="id"
        @row-click="showDetails" />
    </div>

    <q-banner v-if="filteredItems.length === 0" class="bg-grey-3 q-pa-md text-center">
      No products available.
    </q-banner>

    <q-dialog v-model="showForm">
      <q-card>
        <q-card-section>
          <ItemForm @save="addItem" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import ItemForm from '../components/ItemForm.vue';

const items = ref([]);
const showForm = ref(false);
const nextId = ref(101);
const searchQuery = ref('');
const selectedPrice = ref(null);

const columns = [
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { name: 'price', label: 'Price', field: 'price', align: 'left' }
];

const priceOptions = ['Less than 100', '100 - 500', 'More than 500'];

const filteredItems = computed(() => {
  return items.value.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.value.toLowerCase());

    let matchesPrice = true;
    if (selectedPrice.value) {
      if (selectedPrice.value === 'Less than 100') matchesPrice = item.price < 100;
      if (selectedPrice.value === '100 - 500') matchesPrice = item.price >= 100 && item.price <= 500;
      if (selectedPrice.value === 'More than 500') matchesPrice = item.price > 500;
    }

    return matchesSearch && matchesPrice;
  });
});

const loadItems = async () => {
  const storedItems = JSON.parse(localStorage.getItem('productos'));

  if (storedItems && storedItems.length > 0) {
    console.log("Loading stored products:", storedItems);
    items.value = storedItems;
    nextId.value = Math.max(...items.value.map(i => i.id)) + 1;
  } else {
    await fetchAPIItems();
  }
};


const fetchAPIItems = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    items.value = response.data.slice(0, 100).map(post => ({
      id: post.id,
      name: post.title,
      price: post.id * 10
    }));

    nextId.value = 101;
    saveItems();
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

const saveItems = () => {
  localStorage.setItem('products', JSON.stringify(items.value));
};

const addItem = (newItem) => {

  let storedItems = JSON.parse(localStorage.getItem('productos')) || [...items.value];

  const newProduct = {
    id: nextId.value,
    name: newItem.name,
    price: newItem.price
  };

  storedItems.unshift(newProduct);

  nextId.value++; 

  localStorage.setItem('productos', JSON.stringify(storedItems));
  console.log("Saved products (after adding new one):", storedItems);
  items.value = storedItems;
  showForm.value = false;
};



const resetItems = async () => {
  localStorage.removeItem('products');
  await fetchAPIItems();
};

const showDetails = (evt, row) => {
  window.location.href = `/items/${row.id}`;
};

onMounted(() => {
  loadItems();
});

</script>
