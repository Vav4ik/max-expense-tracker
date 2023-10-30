import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Input from "./Input";
import { GlobalStyles } from "../../constants/styles";

const ExpenseForm = () => {
  const amountChangeHandler = () => {};
  const dateChangeHandler = () => {};
  const descriptionChangeHandler = () => {};

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: amountChangeHandler,
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: dateChangeHandler,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          autoCorrect: false, //default is true
          // autoCapitalize: "words", //default is "sentences", also there is "none" and "characters"
          onCahngeText: descriptionChangeHandler,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 0,
  },
  title: {
    marginVertical: 24,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
});

export default ExpenseForm;
