import React from "react";
import { View } from "react-native";

import Input from "./Input";

const ExpenseForm = () => {
  const amountChangeHandler = () => {};
  const dateChangeHandler = () => {};
  const descriptionChangeHandler = () => {};

  return (
    <View>
      <Input
        label="Amount"
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: amountChangeHandler,
        }}
      />
      <Input
        label="Date"
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: dateChangeHandler,
        }}
      />
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

export default ExpenseForm;
