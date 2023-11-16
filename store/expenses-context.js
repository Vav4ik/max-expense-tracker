import { createContext, useReducer } from "react";

// const DUMMY_EXPENSES = [
//   {
//     id: "e1",
//     description: "Pair of shoes",
//     amount: 39.99,
//     date: new Date("2023-09-22"),
//   },
//   {
//     id: "e2",
//     description: "Book",
//     amount: 19.9,
//     date: new Date("2023-10-12"),
//   },
//   {
//     id: "e3",
//     description: "Jacket",
//     amount: 89.99,
//     date: new Date("2023-10-19"),
//   },
//   {
//     id: "e4",
//     description: "Some bananas",
//     amount: 1.99,
//     date: new Date("2023-10-20"),
//   },
//   {
//     id: "e5",
//     description: "Sport equipment, dumbell",
//     amount: 399.0,
//     date: new Date("2023-08-12"),
//   },
// ];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().getTime().toString() + Math.random().toString();
      return [{ id, ...action.payload }, ...state];
    case "SET":
      return action.payload;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    case "UPDATE":
      const updataleExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updataleExpenseIndex];
      //that's how we override/merge values
      const updatedExpense = {
        ...updatableExpense,
        ...action.payload.expenseData,
      };
      //create new array (not to mutate original state)
      const updatedExpenses = [...state];
      updatedExpenses[updataleExpenseIndex] = updatedExpense;
      return updatedExpenses;
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };

  const setExpenses = (expenses) => {
    dispatch({ type: "SET", payload: expenses });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id, expenseData } });
  };

  const value = {
    expenses: expensesState,
    addExpense,
    setExpenses,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
