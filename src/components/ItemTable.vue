<template>
  <q-table class="shadow-2" flat bordered :rows="items" :columns="columns" row-key="id" @row-click="showDetails" />
</template>

<script setup>
import { useRouter } from 'vue-router';

defineProps(['items']);
const router = useRouter();

const columns = [
  { name: 'name', label: 'Nombre', field: 'name', align: 'left' },
  { name: 'price', label: 'Precio', field: 'price', align: 'left' }
];

// 📌 Redirigir correctamente a la vista de detalles
const showDetails = (evt, row) => {
  router.push(`/items/${row.id}`);
};
</script>
