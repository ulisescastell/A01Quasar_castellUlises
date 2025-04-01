<template>
  <div>
    <q-input v-model="name" label="Product name" />
    <q-input v-model.number="price" type="number" label="Price" />
    <q-input v-model="image" label="Image URL (optional)" />
    <q-input v-model="description" type="textarea" label="Description" />
    <q-input v-model="category" label="Category" />

    <div class="row justify-end q-gutter-sm q-mt-md">
      <q-btn label="Save" color="primary" @click="submit" />
      <q-btn label="Cancel" flat color="red" @click="$emit('cancel')" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const price = ref(0)
const image = ref('')
const description = ref('')
const category = ref('')

const emit = defineEmits(['save', 'cancel'])

const submit = () => {
  if (!name.value || price.value <= 0) return

  const product = {
    name: name.value,
    price: price.value,
    image: image.value,
    description: description.value,
    category: category.value
  }

  emit('save', product)
}
</script>
