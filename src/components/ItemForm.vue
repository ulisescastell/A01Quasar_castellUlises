<template>
  <q-form @submit="saveItem">
    <q-input v-model="item.name" label="Nombre del producto" />
    <q-input v-model="item.price" label="Precio" type="number" />

    <q-btn label="Guardar" type="submit" color="primary" class="q-mt-md" />
    <q-btn label="Cancelar" color="red" class="q-mt-md" flat @click="$emit('cancel')" />
  </q-form>
</template>

<script setup>
import { ref } from 'vue';

const item = ref({ name: '', price: 0 });
const emit = defineEmits(['save', 'cancel']);

const saveItem = () => {
  if (!item.value.name || item.value.price <= 0) {
    console.error("❌ Error: Nombre y precio son requeridos.");
    return;
  }
  emit('save', item.value);
  item.value = { name: '', price: 0 };
};
</script>
