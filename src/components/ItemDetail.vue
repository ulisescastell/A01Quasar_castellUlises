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
        <q-btn color="red" label="Eliminar" @click="confirmDelete = true" />
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
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const router = useRouter();
const store = useStore();
const confirmDelete = ref(false);

const item = computed(() => store.state.items.find(i => i.id == route.params.id) || null);

const deleteItem = () => {
  if (item.value) {
    store.commit('removeItem', item.value.id);
  }
  router.push('/items');
};
</script>
