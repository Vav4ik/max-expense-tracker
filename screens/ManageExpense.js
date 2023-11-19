import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import IconButton from "../components/UI/IconButton";
import Button from "../components/UI/Buttton";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpense = ({ route, navigation }) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  const expenseCtx = useContext(ExpensesContext);

  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = async () => {
    setIsSending(true);
    try {
      await deleteExpense(editedExpenseId);
      expenseCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      if (error.message) {
        setError(error.message);
      } else {
        setError("Something went wrong! Please try again later...");
      }
    }
    setIsSending(false);
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expense) => {
    setIsSending(true);
    try {
      if (isEditing) {
        await updateExpense(editedExpenseId, expense);
        expenseCtx.updateExpense(editedExpenseId, expense);
      } else {
        const id = await storeExpense(expense);
        expenseCtx.addExpense({ id, ...expense });
      }
      navigation.goBack();
    } catch (error) {
      if (error.message) {
        setError(error.message);
      } else {
        setError("Something went wrong! Please try again later...");
      }
    }
    setIsSending(false);
  };

  if (isSending) {
    return <LoadingOverlay />;
  }

  const errorHandler = () => {
    setError(null);
  };

  if (error && !isSending) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        defaultValues={isEditing ? selectedExpense : null}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});

export default ManageExpense;
