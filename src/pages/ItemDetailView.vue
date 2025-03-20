<template>
  <q-page class="q-pa-md">
    <q-toolbar>
      <q-btn flat icon="arrow_back" @click="router.push('/items')" />
      <q-toolbar-title>Product details</q-toolbar-title>
    </q-toolbar>

    <q-card class="q-ma-md">
      <q-card-section>
        <div class="text-h5">{{ item ? item.name : "Product not found" }}</div>
        <div class="text-subtitle1">Price: ${{ item ? item.price : 0 }}</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn v-if="item" color="red" label="DELETE PRODUCT" @click="confirmDelete = true" />
      </q-card-actions>
    </q-card>

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
  </q-page>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const item = ref(null);
const confirmDelete = ref(false);

const loadProduct = () => {
  const storedItems = JSON.parse(localStorage.getItem('productos')) || [];

  console.log("Stored products:", storedItems);

  item.value = storedItems.find(i => String(i.id) === String(route.params.id));

  if (!item.value) {
    console.warn(`Product with ID ${route.params.id} not found`);
    router.push('/items');
  }
};

onMounted(loadProduct);

watchEffect(loadProduct);

const deleteItem = () => {
  let storedItems = JSON.parse(localStorage.getItem('productos')) || [];
  storedItems = storedItems.filter(i => String(i.id) !== String(route.params.id));
  localStorage.setItem('productos', JSON.stringify(storedItems));

  router.push('/items');
};
</script>
