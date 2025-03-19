<template>
  <q-table class="shadow-2" flat bordered :rows="items" :columns="columns" row-key="id" @row-click="showDetails" />
</template>

<script setup>
import { useRouter } from 'vue-router';

defineProps(['items']);
const router = useRouter();

const columns = [
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { name: 'price', label: 'Price', field: 'price', align: 'left' }
];

const showDetails = (evt, row) => {
  router.push(`/items/${row.id}`);
};
</script>
