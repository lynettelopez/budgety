const BudgetController = (function () {
  class Income {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    }
  }

  class Expense {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
      this.percentage = -1;
    }
    calcPercentage(totalIncome) {
      if (totalIncome > 0)
        this.percentage = Math.round((this.value / totalIncome) * 100);
      else this.percentage = -1;
    }
    getPercentage() {
      return this.percentage;
    }
  }

  const calculateTotal = function (type) {
    var sum = 0;
    data.items[type].forEach(function (current) {
      sum += current.value;
    });
    data.total[type] = sum;
  };

  const data = {
    items: {
      income: [],
      expenses: [],
    },
    total: {
      income: 0,
      expenses: 0,
    },
    budget: 0,
    percentage: -1,
  };

  return {
    addItem: function (type, des, val) {
      let id, newItem;
      if (data.items[type].length > 0)
        id = data.items[type][data.items[type].length - 1].id + 1;
      else id = 0;
      if (type === "income") newItem = new Income(id, des, val);
      else newItem = new Expense(id, des, val);
      data.items[type].push(newItem);
      return newItem;
    },
    deleteItem: function (type, ID) {
      let ids, index;
      ids = data.items[type].map(function (current) {
        return current.id;
      });
      index = ids.indexOf(ID);
      if (index !== -1) data.items[type].splice(index, 1);
    },
    calculateBudget: function () {
      calculateTotal("income");
      calculateTotal("expenses");
      data.budget = data.total.income - data.total.expenses;
      if (data.total.income > 0)
        data.percentage = Math.round(
          (data.total.expenses / data.total.income) * 100
        );
      else data.percentage = -1;
    },
    getBudget: function () {
      return {
        budget: data.budget,
        totalIncome: data.total.income,
        totalExpenses: data.total.expenses,
        percentage: data.percentage,
      };
    },
    calculatePercentages: function () {
      data.items.expenses.forEach(function (current) {
        current.calcPercentage(data.total.income);
      });
    },
    getPercentages: function () {
      let allPercentages = data.items.expenses.map(function (current) {
        return current.getPercentage();
      });
      return allPercentages;
    },
  };
})();

export default BudgetController;
