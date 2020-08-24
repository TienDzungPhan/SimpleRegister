import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from '@/data/db'

// import { menuDB } from '@/data/db'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [],
    auth: auth
  },
  mutations: {
    appendItem (state, item) {
      // state.cart.push(item)
      const itemIndex = state.cart.findIndex(cartItem => cartItem.id === item.id)
      if (itemIndex < 0) { // itemIndex = -1 if no item found
        state.cart.push({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1
        })
      } else {
        state.cart[itemIndex].quantity++
      }
    },
    removeItems (state, itemID) {
      // This will create a new cart array that do not contain the itemID
      state.cart = state.cart.filter(item => item.id !== itemID)
    },
    emptyCart (state) {
      state.cart = []
    }
  },
  actions: {
    addItem ({ commit }, item) {
      commit('appendItem', item)
    },
    clearItems ({ commit }, itemID) {
      commit('removeItems', itemID)
    },
    clearCart ({ commit }) {
      commit('emptyCart')
    }
  },
  getters: {
    quantityOf (state, itemID) {
      const item = state.cart.find(cartItem => cartItem.id === itemID)
      return (typeof item !== 'undefined') ? item.quantity : 0
    },
    totalPrice (state) {
      let totalPrice = 0
      state.cart.map(item => {
        totalPrice += (item.price * item.quantity)
      })
      return totalPrice
    },
    getAuth (state) {
      return state.auth
    }
  },
  modules: {
  }
})
