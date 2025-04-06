import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    items: []
  },
  mutations: {
    setItems(state, items) {
      state.items = items
    },
    removeItem(state, id) {
      state.items = state.items.filter(item => item.id !== id)
    }
  },
  actions: {
    async fetchItems({ commit }) {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        const raw = response.data.meals || []

        const items = raw.map(meal => ({
          id: parseInt(meal.idMeal),
          name: meal.strMeal,
          price: Math.floor(Math.random() * 50) + 10,
          image: meal.strMealThumb,
          description: meal.strInstructions.slice(0, 200) + '...',
          category: meal.strCategory,
          isFavorite: false
        }))

        commit('setItems', items)
      } catch (error) {
        console.error('error', error)
      }
    }
  }
})

export default store
