import axios from "axios";

const BACKEND_URL =
  "https://shwarzmuller-react-http-default-rtdb.europe-west1.firebasedatabase.app";

export const storeExpense = (expenseData) => {
  axios.post(BACKEND_URL + "/react-native-expenses.json", expenseData);
};

export const fetchExpenses = async () => {
  const response = await axios.get(BACKEND_URL + "/react-native-expenses.json");

  const expenses = [];

  for (key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
};
