import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [flatNo, setFlatNo] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("resident");

  const handleSignup = () => {
    if (!name || !mobile || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const payload = {
      name,
      mobile,
      flatNo,
      password,
      role,
    };

    console.log("Signup Data:", payload);

    Alert.alert("Success", "Signup successful!");
  };

  return (
    <LinearGradient
      colors={["#4facfe", "#00f2fe"]}
      style={{ flex: 1, justifyContent: "center" }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          padding: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 20,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 20,
              color: "#333",
            }}
          >
            Create Account
          </Text>

          {/* Name */}
          <TextInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 10,
              padding: 12,
              marginBottom: 15,
              fontSize: 16,
            }}
          />

          {/* Mobile */}
          <TextInput
            placeholder="Mobile Number"
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={setMobile}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 10,
              padding: 12,
              marginBottom: 15,
              fontSize: 16,
            }}
          />

          {/* Flat No (only for residents) */}
          {role === "resident" && (
            <TextInput
              placeholder="Flat Number"
              value={flatNo}
              onChangeText={setFlatNo}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 10,
                padding: 12,
                marginBottom: 15,
                fontSize: 16,
              }}
            />
          )}

          {/* Password */}
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 10,
              padding: 12,
              marginBottom: 15,
              fontSize: 16,
            }}
          />

          {/* Role Selection */}
          <View
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 10,
              marginBottom: 20,
            }}
          >
            <Picker selectedValue={role} onValueChange={(itemValue) => setRole(itemValue)}>
              <Picker.Item label="Resident" value="resident" />
              <Picker.Item label="Committee" value="committee" />
              <Picker.Item label="Security" value="security" />
              <Picker.Item label="Admin" value="admin" />
            </Picker>
          </View>

          {/* Submit Button */}
          <TouchableOpacity onPress={handleSignup}>
            <LinearGradient
              colors={["#43e97b", "#38f9d7"]}
              style={{
                padding: 15,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
                Sign Up
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Already account */}
          <TouchableOpacity style={{ marginTop: 15 }}>
            <Text style={{ textAlign: "center", color: "#007AFF", fontSize: 16 }}>
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
