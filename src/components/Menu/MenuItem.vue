<template>
  <div class="menu-item my-3">
    <b-button-group size="lg" class="d-flex">
      <b-button
        variant="warning"
        class="w-100 clearfix py-3"
        @click="addQuantity()"
      >
        <span class="float-left">{{ item.name }} <small class="text-secondary">{{ item.price }}$</small></span>
        <span class="float-right"><b-badge variant="light" v-if="itemQuantity > 0"><i class="fas fa-times fa-xs"></i> {{ itemQuantity }}</b-badge></span>
      </b-button>
      <b-button
        variant="outline-dark"
        class="w-10 py-3"
        @click="clearQuantity()"
      >
        <i class="fas fa-backspace"></i>
      </b-button>
    </b-button-group>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'MenuItem',
  props: {
    item: Object
  },
  data () {
    return {
      quantity: 0
    }
  },
  computed: {
    ...mapState([
      'cart'
    ]),
    itemQuantity () {
      const item = this.cart.find(cartItem => cartItem.id === this.item.id)
      return (typeof item !== 'undefined') ? item.quantity : 0
    }
  },
  methods: {
    ...mapActions([
      'addItem',
      'clearItems'
    ]),
    addQuantity () {
      this.addItem(this.item)
      this.quantity++
    },
    clearQuantity () {
      this.clearItems(this.item.id)
      this.quantity = 0
    }
  }
}
</script>

<style scoped>
.menu-item {
  cursor: pointer;
}
</style>
