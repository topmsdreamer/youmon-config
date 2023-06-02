import React, { useState } from "react";
import { SafeAreaView, TextInput, View, StyleSheet, ScrollView } from "react-native";
import DefaultButton from "../components/DefaultButton";
import { DefaultText } from "../components/DefaultText";

export const Signup = (props: any) => {
  const { navigation, theme } = props;
  const [data, setData] = useState({
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const _onTextInputChange = (value: string, field: string): void => {
    setData((prevState: any) => {
      return {
        ...prevState,
        [field]: value
      };
    });
  };

  const _onSignup = () => {};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}>
        <View style={{ marginHorizontal: 10 }}>
          <DefaultText tag={"h1"}>Sign up </DefaultText>
          <DefaultText>Create your Youmoni account by adding your email address and password</DefaultText>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            value={data.email}
            onChangeText={(text) => _onTextInputChange(text, "email")}
            placeholderTextColor="#000"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="#000"
            onChangeText={(text) => _onTextInputChange(text, "password")}
            secureTextEntry
            autoCorrect={false}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Confirm password"
            onChangeText={(text) => _onTextInputChange(text, "passwordConfirm")}
            placeholderTextColor="#000"
            secureTextEntry
            autoCorrect={false}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: 10,
            marginBottom: 10,
            justifyContent: "flex-end"
          }}
        >
          <DefaultButton color="secondary" text="Sign up" onPress={() => _onSignup()}></DefaultButton>
          <DefaultButton
            style={{ marginVertical: 10 }}
            text="Close"
            onPress={() => navigation.goBack()}
          ></DefaultButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginTop: 10,
    height: 45,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderRadius: 5,
    fontSize: 18,
    padding: 10
  }
});
