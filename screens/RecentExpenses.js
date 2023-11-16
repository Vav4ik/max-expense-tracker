import { useContext, useEffect } from "react";

import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { fetchExpenses } from "../utils/http";

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    const getExpenses = async () => {
      const expenses = await fetchExpenses();
      expensesCtx.setExpenses(expenses);
    };
    getExpenses();
  }, []);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const dateWeekAgo = getDateMinusDays(today, 7);
    return expense.date > dateWeekAgo;
  });

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 days"
      expenses={recentExpenses}
      fallbackText="You have no expenses in last 7 days"
    />
  );
};

export default RecentExpenses;
