<template>
  <q-dialog v-model="localIsOpen">
    <q-card>
      <q-card-section>
        <div class="text-h6">¿Seguro que quieres eliminar este producto?</div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancelar" v-close-popup />
        <q-btn color="red" label="Eliminar" @click="confirmDelete" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({ isOpen: Boolean });
const emit = defineEmits(['delete']);

const localIsOpen = ref(props.isOpen);

watch(() => props.isOpen, (newValue) => {
  localIsOpen.value = newValue;
});


const confirmDelete = () => {
  emit('delete');
  localIsOpen.value = false;
};
</script>
