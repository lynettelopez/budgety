import BudgetController from "./budget.js";
import UserInterfaceController from "./user-interface.js";

const MainController = (function (budgetCtrl, uiCtrl) {
  const setUpEventListeners = function () {
    let DOM = uiCtrl.getDOMStrings();
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
    document.addEventListener("keypress", function (event) {
      if (event.key === "Enter") ctrlAddItem();
    });
    document
      .querySelector(DOM.container)
      .addEventListener("click", ctrlDeleteItem);
    document
      .querySelector(DOM.inputType)
      .addEventListener("change", uiCtrl.changeType);
  };

  const ctrlAddItem = function () {
    let input, newItem;
    input = uiCtrl.getInput();
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      uiCtrl.addListItem(newItem, input.type);
      uiCtrl.clearFields();
      updateBudget();
      updatePercentages();
    }
  };

  const ctrlDeleteItem = function (event) {
    let itemID, splitItemID, type, ID;
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id; // Gives us "income-0"
    if (itemID) {
      splitItemID = itemID.split("-"); // Gives us ["income", "0"]
      type = splitItemID[0];
      ID = parseInt(splitItemID[1]);
      budgetCtrl.deleteItem(type, ID);
      uiCtrl.deleteListItem(itemID);
      updateBudget();
      updatePercentages();
    }
  };

  const updateBudget = function () {
    budgetCtrl.calculateBudget();
    let budget = budgetCtrl.getBudget();
    uiCtrl.displayBudget(budget);
  };

  const updatePercentages = function () {
    budgetCtrl.calculatePercentages();
    let percentages = budgetCtrl.getPercentages();
    uiCtrl.displayPercentages(percentages);
  };

  return {
    init: function () {
      uiCtrl.displayDate();
      uiCtrl.displayBudget({
        budget: 0,
        totalIncome: 0,
        totalExpenses: 0,
        percentage: -1,
      });
      setUpEventListeners();
    },
  };
})(BudgetController, UserInterfaceController);

export default MainController;
