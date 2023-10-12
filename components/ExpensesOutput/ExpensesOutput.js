import React from "react";
import { View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "Pair of shoes",
    amount: 39.99,
    date: new Date("2023-09-22"),
  },
  {
    id: "e2",
    description: "Book",
    amount: 19.9,
    date: new Date("2023-10-12"),
  },
  {
    id: "e3",
    description: "Jacket",
    amount: 89.99,
    date: new Date("2023-10-11"),
  },
  {
    id: "e4",
    description: "Some bananas",
    amount: 1.99,
    date: new Date("2023-10-10"),
  },
  {
    id: "e5",
    description: "Sport equipment, dumbell",
    amount: 399.00,
    date: new Date("2023-08-12"),
  },
];

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
};

export default ExpensesOutput;
