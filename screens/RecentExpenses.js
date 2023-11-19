import { useContext, useEffect, useState } from "react";

import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { fetchExpenses } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        setError(null);
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        if (error.message) {
          setError(error.message);
        } else {
          setError("Something went wrong! Please try again later...");
        }
      }
      setIsFetching(false);
    };
    getExpenses();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const dateWeekAgo = getDateMinusDays(today, 7);
    return expense.date > dateWeekAgo;
  });

  const errorHandler = () => {
    setError(null);
  };

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 days"
      expenses={recentExpenses}
      fallbackText="You have no expenses in last 7 days"
    />
  );
};

export default RecentExpenses;
