import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    items: [],
  },
  mutations: {
    setItems(state, items) {
      state.items = items
    },
  },
  actions: {
    async fetchItems({ commit }) {
      try {
        const response = await axios.get('https://fakestoreapi.com/products')
        const items = response.data.map((product) => ({
          id: product.id,
          name: product.title,
          price: product.price,
          image: product.image,
          description: product.description,
          category: product.category,
        }))
        commit('setItems', items)
      } catch (error) {
        console.error('Error al cargar productos reales:', error)
      }
    },
  },
})

export default store
