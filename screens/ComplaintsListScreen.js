// screens/ComplaintsScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const categories = [
  { id: "1", title: "Lift", icon: "business" },
  { id: "2", title: "Water", icon: "water" },
  { id: "3", title: "Electricity", icon: "flash" },
  { id: "4", title: "Cleaning", icon: "broom" },
  { id: "5", title: "Security", icon: "shield-checkmark" },
];

export default function ComplaintsScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [details, setDetails] = useState("");

  const handleSubmit = () => {
    if (!selectedCategory || !details.trim()) {
      Alert.alert("⚠️ Missing Info", "Please select a category and enter details.");
      return;
    }

    // TODO: Connect with API for saving complaints
    Alert.alert(
      "✅ Complaint Submitted",
      `Category: ${selectedCategory}\nDetails: ${details}`
    );

    setSelectedCategory(null);
    setDetails("");
  };

  const renderCategory = ({ item }) => {
    const isSelected = selectedCategory === item.title;
    return (
      <TouchableOpacity
        onPress={() => setSelectedCategory(item.title)}
        style={[styles.categoryCard, isSelected && styles.categorySelected]}
      >
        <Ionicons
          name={item.icon}
          size={26}
          color={isSelected ? "#fff" : "#2563EB"}
        />
        <Text
          style={[
            styles.categoryText,
            isSelected && { color: "#fff", fontWeight: "700" },
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛠️ Lodge a Complaint</Text>

      {/* Categories */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderCategory}
        contentContainerStyle={{ paddingVertical: 10 }}
      />

      {/* Complaint Input */}
      <Text style={styles.label}>Complaint Details</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Describe your issue..."
        value={details}
        onChangeText={setDetails}
      />

      {/* Submit Button */}
      <TouchableOpacity onPress={handleSubmit} style={{ marginTop: 20 }}>
        <LinearGradient
          colors={["#2563EB", "#4F46E5"]}
          style={styles.submitButton}
        >
          <Text style={styles.submitText}>Submit Complaint</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* View My Complaints Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("ComplaintsListScreen")}
        style={styles.viewButton}
      >
        <Text style={styles.viewButtonText}>📋 View My Complaints</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 20,
  },
  categoryCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    width: 100,
    height: 100,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  categorySelected: {
    backgroundColor: "#2563EB",
  },
  categoryText: {
    marginTop: 8,
    fontSize: 14,
    color: "#2563EB",
    fontWeight: "600",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginTop: 20,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    height: 120,
    textAlignVertical: "top",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  submitButton: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  submitText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  viewButton: {
    marginTop: 15,
    borderRadius: 12,
    paddingVertical: 12,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
  },
  viewButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
});
