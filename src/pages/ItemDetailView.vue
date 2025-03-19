<template>
  <q-page>
    <q-toolbar>
      <q-btn flat icon="arrow_back" @click="router.push('/items')" />
      <q-toolbar-title>Detalle del Producto</q-toolbar-title>
    </q-toolbar>

    <q-card class="q-ma-md">
      <q-card-section>
        <div class="text-h5">{{ item?.name || "Producto no encontrado" }}</div>
        <div class="text-subtitle1">Precio: ${{ item?.price || 0 }}</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="red" label="Eliminar Producto" @click="confirmDelete = true" />
      </q-card-actions>
    </q-card>

    <q-dialog v-model="confirmDelete">
      <q-card>
        <q-card-section>
          <div class="text-h6">¿Seguro que quieres eliminar este producto?</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn color="red" label="Eliminar" @click="deleteItem" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const item = ref(null);
const confirmDelete = ref(false);

onMounted(() => {
  const storedItems = JSON.parse(localStorage.getItem('productos')) || [];
  item.value = storedItems.find(i => i.id == route.params.id);
});

const deleteItem = () => {
  let storedItems = JSON.parse(localStorage.getItem('productos')) || [];
  storedItems = storedItems.filter(i => i.id != route.params.id); // Eliminar el producto
  localStorage.setItem('productos', JSON.stringify(storedItems)); // Guardar cambios

  router.push('/items');
};
</script>
