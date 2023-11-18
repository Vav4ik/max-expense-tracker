import axios from "axios";

const BACKEND_URL =
  "https://shwarzmuller-react-http-default-rtdb.europe-west1.firebasedatabase.app";

export const storeExpense = async (expenseData) => {
  const response = await axios.post(
    BACKEND_URL + "/react-native-expenses.json",
    expenseData
  );
  const id = response.data.name; //that's id from reltime db apparently
  return id;
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

export const updateExpense = (id, expenseData) => {
  return axios.put(
    BACKEND_URL + `/react-native-expenses/${id}.json`,
    expenseData
  );
};

export const deleteExpense = (id) => {
  return axios.delete(BACKEND_URL + `/react-native-expenses/${id}.json`);
};
