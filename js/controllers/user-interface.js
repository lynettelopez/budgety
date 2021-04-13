const UserInterfaceController = (function () {
  const DOMStrings = {
    inputBtn: ".add__btn",
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container",
    itemPercentageLabel: ".item__percentage",
    dateLabel: ".budget__title--month",
  };

  const formatNumber = function (num, type) {
    let numSplit, int, dec;
    num = Math.abs(num);
    num = num.toFixed(2);
    numSplit = num.split(".");
    int = numSplit[0];
    dec = numSplit[1];
    if (int.length > 3)
      int =
        int.substring(0, int.length - 3) + "," + int.substring(int.length - 3);
    return (type === "expenses" ? "-" : "+") + " " + int + "." + dec;
  };

  return {
    getDOMStrings: function () {
      return DOMStrings;
    },
    getInput: function () {
      return {
        type: document.querySelector(DOMStrings.inputType).value, // Will receive either "income" or "expenses"
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMStrings.inputValue).value),
      };
    },
    addListItem: function (obj, type) {
      let html, newHtml, element;
      if (type === "income") {
        element = DOMStrings.incomeContainer;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div ' +
          'class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn" > <i class="ion-ios-' +
          'close - outline"></i></button ></div ></div ></div >';
      } else {
        element = DOMStrings.expensesContainer;
        html =
          '<div class="item clearfix" id="expenses-%id%"><div class="item__description">%description%</div><div class="right clearfix">' +
          '<div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item_' +
          '_delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },
    deleteListItem: function (elementID) {
      let element = document.getElementById(elementID);
      element.parentNode.removeChild(element); // You can only remove child elements in HTML
    },
    clearFields: function () {
      let fields, fieldsArray;
      fields = document.querySelectorAll(
        DOMStrings.inputDescription + ", " + DOMStrings.inputValue
      );
      fieldsArray = Array.prototype.slice.call(fields);
      fieldsArray.forEach(function (current) {
        current.value = "";
      });
      fieldsArray[0].focus();
    },
    displayBudget: function (obj) {
      let type = obj.budget > 0 ? "income" : "expenses";
      document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(
        obj.budget,
        type
      );
      document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(
        obj.totalIncome,
        "income"
      );
      document.querySelector(
        DOMStrings.expensesLabel
      ).textContent = formatNumber(obj.totalExpenses, "expenses");
      if (obj.percentage > 0)
        document.querySelector(DOMStrings.percentageLabel).textContent =
          obj.percentage + "%";
      else
        document.querySelector(DOMStrings.percentageLabel).textContent = "--";
    },
    displayPercentages: function (percentages) {
      let fields = document.querySelectorAll(DOMStrings.itemPercentageLabel);
      fields.forEach(function (current, index) {
        if (percentages[index] > 0)
          current.textContent = percentages[index] + "%";
        else current.textContent = "--";
      });
    },
    displayDate: function () {
      let now, year, month, months;
      now = new Date();
      year = now.getFullYear();
      month = now.getMonth();
      months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      document.querySelector(DOMStrings.dateLabel).textContent =
        months[month] + " " + year;
    },
    changeType: function () {
      let fields = document.querySelectorAll(
        DOMStrings.inputType +
          "," +
          DOMStrings.inputDescription +
          "," +
          DOMStrings.inputValue
      );
      fields.forEach(function (current) {
        current.classList.toggle("red-focus");
      });
      document.querySelector(DOMStrings.inputBtn).classList.toggle("red");
    },
  };
})();

export default UserInterfaceController;
