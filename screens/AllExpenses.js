import { useContext } from "react";

import { ExpensesContext } from "../store/expenses-context";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expensesPeriod="Total"
      expenses={expensesCtx.expenses}
      fallbackText="You have not added any expenses yet..."
    />
  );
};

export default AllExpenses;
