<template>
  <q-table class="shadow-2" flat bordered :rows="items" :columns="columns" row-key="id" @row-click="showDetails">
    <template v-slot:body-cell-product="props">
      <q-td :props="props">
        <div class="row items-center q-gutter-sm">
          <q-img :src="props.row.image" style="width: 40px; height: 40px;" spinner-color="grey-5" fit="contain" />
          <div>{{ props.row.name }}</div>
        </div>
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { useRouter } from 'vue-router';

defineProps(['items']);
const router = useRouter();

const columns = [
  {
    name: 'product',
    label: 'Product',
    align: 'left',
    field: row => row.name,
    sortable: true
  },
  {
    name: 'price',
    label: 'Price',
    field: 'price',
    align: 'left',
    sortable: true
  }
];

const showDetails = (evt, row) => {
  router.push(`/items/${row.id}`);
};
</script>
