// AppNavigator.js
import React, { useContext } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";

// Screens
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";

// import SupplierTabs from "../screens/SupplierTabs";
// import ResidentTabs from "../screens/ResidentTabs";


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#2563eb"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          user
            ? user.role === "retailer"
              ? "ResidentTabs"
              : "SupplierTabs"
            : "Login"
        }
      >
        {/* Auth screens */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "SMS" }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: "SMS" }} />

        {/* Supplier tabs (with bottom nav) */}
        {/* <Stack.Screen
          name="SupplierTabs"
          component={SupplierTabs}
          options={{ title: 'SMS' }}
        /> */}

        {/* <Stack.Screen
          name="ResidentTabs"
          component={ResidentTabs}
          options={{ title: 'BizLink' }}
        /> */}
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
