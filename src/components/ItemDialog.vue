<template>
  <q-dialog v-model="localIsOpen">
    <q-card>
      <q-card-section>
        <div class="text-h6">¿You sure you wanna delete this item?</div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn color="red" label="Delete" @click="confirmDelete" />
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
