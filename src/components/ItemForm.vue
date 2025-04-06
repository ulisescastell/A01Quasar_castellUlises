<template>
  <div class="q-gutter-md">
    <q-input
      v-model="form.name"
      label="Product name"
      filled
      rounded
      dense
      input-class="text-subtitle1"
    />

    <q-input
      v-model.number="form.price"
      type="number"
      label="Price"
      filled
      rounded
      dense
      input-class="text-subtitle1"
    />

    <q-input
      v-model="form.image"
      label="Image URL (optional)"
      filled
      rounded
      dense
      input-class="text-subtitle1"
    />

    <q-input
      v-model="form.description"
      type="textarea"
      label="Description"
      filled
      rounded
      dense
      input-class="text-subtitle1"
    />

    <q-input
      v-model="form.category"
      label="Category"
      filled
      rounded
      dense
      input-class="text-subtitle1"
    />

    <div class="row justify-end q-gutter-sm q-mt-md">
      <q-btn label="Cancel" color="negative" flat @click="$emit('cancel')" />
      <q-btn label="Save" color="primary" @click="save" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  price: 0,
  image: '',
  description: '',
  category: ''
})

const emit = defineEmits(['save', 'cancel'])

const save = () => {
  if (!form.value.name.trim()) return
  emit('save', { ...form.value })
}
</script>
