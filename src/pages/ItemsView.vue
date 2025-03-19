<template>
  <q-page class="q-pa-md">
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title>Lista de Productos</q-toolbar-title>
    </q-toolbar>

    <!-- 🔹 Contenedor para los botones -->
    <div class="q-mt-md q-mb-md row q-gutter-md">
      <q-btn label="Agregar Nuevo" color="green" @click="showForm = true" />
      <q-btn label="Restablecer Lista" color="red" @click="resetItems" />
    </div>

    <!-- 🔹 Contenedor de los filtros -->
    <div class="row q-gutter-md q-mb-md">
      <q-input filled v-model="searchQuery" label="Buscar producto..." clearable />
      <q-select filled v-model="selectedPrice" :options="priceOptions" label="Filtrar por precio" clearable />
    </div>

    <!-- 🔹 Tabla de productos filtrados -->
    <div class="q-pa-md q-gutter-md">
      <q-table class="shadow-2" flat bordered :rows="filteredItems" :columns="columns" row-key="id"
        @row-click="showDetails" />
    </div>

    <q-banner v-if="filteredItems.length === 0" class="bg-grey-3 q-pa-md text-center">
      No hay productos disponibles.
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
const searchQuery = ref(''); // 📌 Estado para búsqueda
const selectedPrice = ref(null); // 📌 Estado para filtro de precio

const columns = [
  { name: 'name', label: 'Nombre', field: 'name', align: 'left' },
  { name: 'price', label: 'Precio', field: 'price', align: 'left' }
];

// 📌 Opciones de filtro de precios
const priceOptions = ['Menos de 100', '100 - 500', 'Más de 500'];

// 📌 Filtrar productos según la búsqueda y precio
const filteredItems = computed(() => {
  return items.value.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.value.toLowerCase());

    let matchesPrice = true;
    if (selectedPrice.value) {
      if (selectedPrice.value === 'Menos de 100') matchesPrice = item.price < 100;
      if (selectedPrice.value === '100 - 500') matchesPrice = item.price >= 100 && item.price <= 500;
      if (selectedPrice.value === 'Más de 500') matchesPrice = item.price > 500;
    }

    return matchesSearch && matchesPrice;
  });
});

// 📌 Cargar productos desde LocalStorage o API
const loadItems = async () => {
  const storedItems = localStorage.getItem('productos');

  if (storedItems) {
    items.value = JSON.parse(storedItems);
    nextId.value = Math.max(...items.value.map(i => i.id)) + 1;
  } else {
    await fetchAPIItems();
  }
};

// 📌 Obtener productos de la API
const fetchAPIItems = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    items.value = response.data.slice(0, 100).map(post => ({
      id: post.id,
      name: post.title,
      price: post.id * 10
    }));

    nextId.value = 101; // Reiniciar contador de IDs
    saveItems();
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
};

// 📌 Guardar productos en LocalStorage
const saveItems = () => {
  localStorage.setItem('productos', JSON.stringify(items.value));
};

// 📌 Agregar un nuevo producto al inicio
const addItem = (newItem) => {
  items.value.unshift({
    id: nextId.value,
    name: newItem.name,
    price: newItem.price
  });

  nextId.value++;
  saveItems();
  showForm.value = false;
};

// 📌 Restablecer la lista a los datos originales de la API
const resetItems = async () => {
  localStorage.removeItem('productos');
  await fetchAPIItems();
};

// 📌 Redirigir a los detalles del producto
const showDetails = (evt, row) => {
  window.location.href = `/items/${row.id}`;
};

// 📌 Cargar productos al iniciar
onMounted(() => {
  loadItems();
});
</script>
