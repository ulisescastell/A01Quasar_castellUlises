<template>
  <q-form @submit="saveItem">
    <q-input v-model="item.name" label="Product name" />
    <q-input v-model="item.price" label="Price" type="number" min="1"/>

    <q-btn label="save" type="submit" color="primary" class="q-mt-md" />
    <q-btn label="cancel" color="red" class="q-mt-md" flat @click="$emit('cancel')" />
  </q-form>
</template>

<script setup>
import { ref } from 'vue';

const item = ref({ name: '', price: 0 });
const emit = defineEmits(['save', 'cancel']);

const saveItem = () => {
  if (!item.value.name || item.value.price <= 0) {
    return;
  }
  emit('save', item.value);
  item.value = { name: '', price: 0 };
};
</script>
