<template>
  <div id="expenses">
    <b-list-group flush>
      <b-list-group-item
        v-for="expense in expenses"
        :key="expense.id"
        class="clearfix"
      >
        <div class="float-left">
          <div class="expense-title">{{ expense.title }} <small class="text-secondary">{{ expense.amount }}$</small></div>
          <div class="expense-subtitle"><small>{{ expense.buyer }}</small></div>
        </div>
        <b-button-group class="float-right">
          <b-button v-b-modal.expense-change @click="setUpdateData(expense)" variant="outline-primary" size="sm"><i class="fas fa-edit"></i></b-button>
          <b-button @click="deleteExpense(expense)" variant="outline-danger" size="sm"><i class="fas fa-trash-alt"></i></b-button>
        </b-button-group>
      </b-list-group-item>
    </b-list-group>
    <b-button v-b-modal.expense-change block variant="success" class="mt-3"><i class="fas fa-plus"></i> Add new expense</b-button>
    <b-modal
      title="Expense Change"
      id="expense-change"
      ok-title="Save"
      @ok="saveExpense()"
      @cancel="resetData()"
    >
      <b-form-group
        label="Expense Title"
        label-for="expense-title"
      >
        <b-form-input id="expense-title" v-model="expenseTitle"></b-form-input>
      </b-form-group>
      <b-form-group
        label="Expense Amount"
        label-for="expense-amount"
      >
        <b-form-input type="number" min="0" id="expense-amount" v-model="expenseAmount"></b-form-input>
      </b-form-group>
      <b-form-group
        label="Buyer"
        label-for="expense-buyer"
      >
        <b-form-input id="expense-buyer" v-model="expenseBuyer"></b-form-input>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
import { expensesDB } from '@/data/db'

export default {
  data () {
    return {
      expenses: [],
      expenseId: '',
      expenseTitle: '',
      expenseAmount: 0,
      expenseBuyer: ''
    }
  },
  firestore: {
    expenses: expensesDB
  },
  methods: {
    saveExpense () {
      if (this.expenseId !== '') {
        expensesDB.doc(this.expenseId).update({
          title: this.expenseTitle,
          amount: parseInt(this.expenseAmount),
          buyer: this.expenseBuyer
        })
      } else {
        expensesDB.add({
          title: this.expenseTitle,
          amount: parseInt(this.expenseAmount),
          buyer: this.expenseBuyer
        })
      }
      this.expenseId = ''
      this.expenseTitle = ''
      this.expenseAmount = ''
      this.expenseBuyer = 0
    },
    setUpdateData (expense) {
      this.expenseId = expense.id
      this.expenseTitle = expense.title
      this.expenseAmount = expense.amount
      this.expenseBuyer = expense.buyer
    },
    resetData () {
      this.expenseId = ''
      this.expenseTitle = ''
      this.expenseAmount = 0
      this.expenseBuyer = ''
    },
    deleteExpense (expense) {
      expensesDB.doc(expense.id).delete()
    }
  }
}
</script>
