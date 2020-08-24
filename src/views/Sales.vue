<template>
  <div id="sales">
    <b-container>
      <p>Revenues: {{ revenues }}$</p>
      <p>Sales: {{ sales }} item(s)</p>
      <p>Total Expense: {{ totalExpense }}$</p>
      <hr>
      <p :class="profit > 0 ? 'text-success' : 'text-danger'"><strong>Profit: {{ profit }}$</strong></p>
      <br>
      <b-table hover :items="detailsTable"></b-table>
    </b-container>
  </div>
</template>

<script>
import { ordersDB, expensesDB, menuDB } from '../data/db'

export default {
  data () {
    return {
      orders: [],
      expenses: [],
      menu: [],
      revenues: 0,
      sales: 0,
      totalExpense: 0,
      profit: 0,
      detailsTable: []
    }
  },
  firestore: {
    orders: ordersDB,
    expenses: expensesDB,
    menu: menuDB
  },
  watch: {
    orders: {
      immediate: true,
      handler (orders) {
        this.revenues = orders.reduce((total, order) => total + order.total, 0)
        this.sales = orders.reduce((total, order) => total + order.itemsCount, 0)
        this.profit = this.revenues - this.totalExpense
        this.detailsTable = this.createTable(this.menu, orders)
      }
    },
    menu: {
      immediate: true,
      handler (menu) {
        this.detailsTable = this.createTable(menu, this.orders)
      }
    },
    expenses: {
      immediate: true,
      handler (expenses) {
        this.totalExpense = this.expenses.reduce((total, expense) => total + expense.amount, 0)
        this.profit = this.revenues - this.totalExpense
      }
    }
  },
  methods: {
    createTable: (menu, orders) => {
      return menu.map(item => {
        let itemSales = 0
        orders.forEach(order => {
          const targetItem = order.items.find(orderedItem => orderedItem.id === item.id)
          itemSales += targetItem ? targetItem.quantity : 0
        })
        return {
          item: item.name,
          unit_price: item.price,
          sales: itemSales,
          revenues: itemSales * item.price + '$'
        }
      })
    }
  }
}
</script>
