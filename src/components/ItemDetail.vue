<template>
  <q-page>
    <q-toolbar>
      <q-btn flat icon="arrow_back" @click="router.push('/items')" />
      <q-toolbar-title>Product detail</q-toolbar-title>
    </q-toolbar>

    <q-card class="q-ma-md">
      <q-card-section>
        <div class="text-h5">{{ item?.name || "Product not found" }}</div>
        <div class="text-subtitle1">Price: ${{ item?.price || 0 }}</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="red" label="Delete" @click="confirmDelete = true" />
      </q-card-actions>
    </q-card>

    <q-dialog v-model="confirmDelete">
      <q-card>
        <q-card-section>
          <div class="text-h6">¿Really wanna delete this item?</div>
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
