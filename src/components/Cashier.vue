<template>
  <b-modal id="cashier" scrollable>
    <template v-slot:modal-title>
      <i class="fas fa-cash-register fa-lg"></i> Cash Register
    </template>
    <div class="items">
      <MenuItem
        v-for="item in menu"
        v-bind:key="item.id"
        v-bind:item="item"
      />
    </div>
    <template v-slot:modal-footer>
      <div id="payment" class="d-flex justify-content-between">
        <h4 class="my-1"><i class="fas fa-money-bill-wave"></i> {{ totalPrice }}$</h4>
        <b-button-group>
          <b-button v-b-toggle.collapse-1 variant="info" class="shadow px-4 mr-2"><i class="fas fa-pen-alt"></i></b-button>
          <b-button @click="registerOrder()" variant="primary" class="shadow px-3"><strong>OK <i class="far fa-check-circle"></i></strong></b-button>
        </b-button-group>
      </div>
      <b-collapse id="collapse-1" class="mt-2">
        <hr>
        <b-form-group
          label="Customer name"
          label-for="customer-name"
          description="By default order name will be: Order of ... item(s)"
        >
          <b-form-input
            id="customer-name"
            placeholder="Enter customer name"
            v-model="customerName"
          ></b-form-input>
        </b-form-group>
      </b-collapse>
    </template>
  </b-modal>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { ordersDB, menuDB, Timestamp } from '@/data/db'
// import { Timestamp, GeoPoint } from '@/data/db'
import MenuItem from '@/components/Menu/MenuItem'

export default {
  name: 'Cashier',
  components: {
    MenuItem
  },
  data () {
    return {
      menu: [],
      customerName: ''
    }
  },
  firestore: {
    menu: menuDB
  },
  computed: {
    ...mapState([
      'cart'
    ]),
    ...mapGetters([
      'totalPrice',
      'getAuth'
    ])
  },
  methods: {
    ...mapActions([
      'clearCart'
    ]),
    registerOrder () {
      if (this.cart.length > 0) {
        const itemsCount = this.cart.reduce((total, item) => total + parseInt(item.quantity), 0)
        ordersDB.add({
          name: (this.customerName === '') ? 'Order of ' + itemsCount + ' item(s)' : 'Order for ' + this.customerName,
          items: [...this.cart],
          itemsCount: itemsCount,
          total: parseInt(this.totalPrice),
          completed: false,
          time: Timestamp.fromDate(new Date())
        })
        this.clearCart()
        this.customerName = ''
      } else {
        alert('There is no item registered!!!')
      }
    }
  }
}
</script>

<style>
#cashier .modal-footer {
  display: initial;
}

@media screen and (max-width: 768px) {
  #cashier .modal-dialog {
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    max-width: none !important;
  }

  #cashier .modal-content {
    height: auto !important;
    min-height: 100% !important;
    border-radius: 0 !important;
  }

  #cashier .modal-dialog-scrollable {
    max-height: none !important;
  }
}
</style>
