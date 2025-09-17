// screens/RetailerTabs.js
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";

import DashboardScreen from "../screens/DashboardScreen";
import MaintenancePaymentScreen from "../screens/MaintenancePaymentScreen";
import ComplaintsScreen from "../screens/ComplaintsScreen";

// import SupplierListScreen from "../screens/BrowseSuppliersScreen";
// import ProfileScreen from "../screens/RetailerProfile";

const Tab = createBottomTabNavigator();

export default function RetailerTabs() {
  const { user } = useContext(AuthContext);

  // Icon mapping by route name
  const getTabIcon = (routeName, focused, color, size) => {
    let iconName;
    switch (routeName) {
      case "Dashboard":
        iconName = focused ? "home" : "home-outline";
        break;
      case "MaintenancePayment":
        iconName = focused ? "card" : "card-outline";
        break;
      case "Complaints":
        iconName = focused ? "storefront" : "storefront-outline";
        break;
      case "Profile":
        iconName = focused ? "person-circle" : "person-circle-outline";
        break;
      default:
        iconName = "ellipse-outline";
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 65,
          paddingBottom: 8,
          elevation: 8,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarActiveTintColor: "#2563EB", // Blue
        tabBarInactiveTintColor: "#94A3B8", // Gray
        tabBarIcon: ({ focused, color, size }) =>
          getTabIcon(route.name, focused, color, size),
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        initialParams={{ userId: user.id, supplierId: user.supplier }}
        options={{ tabBarLabel: "Dashboard" }}
      />

      <Tab.Screen
        name="MaintenancePayment"
        component={MaintenancePaymentScreen}
        initialParams={{ userId: user.id }}
        options={{ tabBarLabel: "Payments" }}
      />

      <Tab.Screen
        name="Complaints"
        component={ComplaintsScreen}
        initialParams={{ userId: user.id }}
        options={{ tabBarLabel: "Complaints" }}
      />

      {/* <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{ userId: user.id }}
        options={{ tabBarLabel: "Profile" }}
      /> */}
    </Tab.Navigator>
  );
}
