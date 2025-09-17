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
import { Ionicons } from "@expo/vector-icons";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [block, setBlock] = useState("");
  const [floor, setFloor] = useState("");
  const [flatNo, setFlatNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("resident");

  const handleSignup = async () => {
  if (!name || !mobile || !password || !confirmPassword) {
    Alert.alert("Error", "Please fill all required fields");
    return;
  }
  if (password !== confirmPassword) {
    Alert.alert("Error", "Passwords do not match");
    return;
  }

  try {
    const payload = { name, email, mobile, block, floor, flatNo, password, role };

    const response = await fetch("http://192.168.8.62:5000/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (response.status === 201) {
      Alert.alert("Success", data.message);
    } else {
      Alert.alert("Error", data.message);
    }
  } catch (error) {
    console.log(error);
    Alert.alert("Error", "Something went wrong");
  }
};

//   const handleSignup = () => {
//     if (!name || !mobile || !password || !confirmPassword) {
//       Alert.alert("Error", "Please fill all required fields");
//       return;
//     }
//     if (password !== confirmPassword) {
//       Alert.alert("Error", "Passwords do not match");
//       return;
//     }

//     const payload = {
//       name,
//       email,
//       mobile,
//       block,
//       floor,
//       flatNo,
//       password,
//       role,
//     };

//     console.log("Signup Data:", payload);
//     Alert.alert("Success", "Signup successful!");
//   };

  return (
    <LinearGradient
      colors={["#6a11cb", "#2575fc"]}
      style={{ flex: 1, justifyContent: "center" }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          padding: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 25,
            borderRadius: 25,
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 6,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 25,
              color: "#333",
            }}
          >
            Create Account
          </Text>

          {/* Full Name */}
          <InputField
            icon="person-outline"
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />

          {/* Email */}
          <InputField
            icon="mail-outline"
            placeholder="Email Address"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          {/* Mobile */}
          <InputField
            icon="call-outline"
            placeholder="Mobile Number"
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={setMobile}
          />

          {/* Role Selection */}
          <Text style={{ fontSize: 14, marginBottom: 8, color: "#555" }}>
            Select Role
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 12,
              marginBottom: 18,
            }}
          >
            <Picker selectedValue={role} onValueChange={(itemValue) => setRole(itemValue)}>
              <Picker.Item label="Resident" value="resident" />
              <Picker.Item label="Committee" value="committee" />
              <Picker.Item label="Security" value="security" />
              <Picker.Item label="Admin" value="admin" />
            </Picker>
          </View>

          {/* Society Fields (only for residents) */}
          {role === "resident" && (
            <>
              <InputField
                icon="business-outline"
                placeholder="Block / Wing"
                value={block}
                onChangeText={setBlock}
              />

              <InputField
                icon="layers-outline"
                placeholder="Floor"
                value={floor}
                onChangeText={setFloor}
              />

              <InputField
                icon="home-outline"
                placeholder="Flat Number"
                value={flatNo}
                onChangeText={setFlatNo}
              />
            </>
          )}

          {/* Password */}
          <InputField
            icon="lock-closed-outline"
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Confirm Password */}
          <InputField
            icon="lock-closed-outline"
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {/* Submit Button */}
          <TouchableOpacity onPress={handleSignup} style={{ marginTop: 10 }}>
            <LinearGradient
              colors={["#43e97b", "#38f9d7"]}
              style={{
                padding: 15,
                borderRadius: 15,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
                Sign Up
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Already account */}
          <TouchableOpacity style={{ marginTop: 18 }} onPress={() => navigation.navigate("Login")}>
            <Text style={{ textAlign: "center", color: "#007AFF", fontSize: 16 }}>
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

/* 🔹 Reusable Input Component with Icon */
const InputField = ({ icon, ...props }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: 18,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Ionicons name={icon} size={20} color="#666" style={{ marginRight: 8 }} />
      <TextInput
        style={{ flex: 1, paddingVertical: 10, fontSize: 16 }}
        {...props}
      />
    </View>
  );
};
