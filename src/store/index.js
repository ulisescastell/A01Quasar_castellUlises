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
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        commit(
          'setItems',
          response.data.map((post) => ({
            id: post.id,
            name: post.title,
            price: post.id * 10,
          })),
        )
      } catch (error) {
        console.error('Error al cargar los datos:', error)
      }
    },
  },
})

export default store
