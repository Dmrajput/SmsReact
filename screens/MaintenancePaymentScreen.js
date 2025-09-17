import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

// Dummy dues data
const duesData = [
  { id: "1", month: "August 2025", amount: "₹1500", status: "Pending" },
  { id: "2", month: "July 2025", amount: "₹1500", status: "Paid" },
  { id: "3", month: "June 2025", amount: "₹1500", status: "Paid" },
];

export default function MaintenancePaymentScreen() {
  const renderDueCard = ({ item }) => {
    const isPaid = item.status === "Paid";

    return (
      <LinearGradient
        colors={isPaid ? ["#d1fae5", "#a7f3d0"] : ["#fef3c7", "#fde68a"]}
        style={styles.card}
      >
        <View style={styles.cardRow}>
          <Text style={styles.cardMonth}>{item.month}</Text>
          <Ionicons
            name={isPaid ? "checkmark-circle" : "alert-circle"}
            size={22}
            color={isPaid ? "#059669" : "#f59e0b"}
          />
        </View>
        <Text style={styles.cardAmount}>{item.amount}</Text>
        <Text style={[styles.cardStatus, { color: isPaid ? "#059669" : "#b45309" }]}>
          {isPaid ? "✅ Paid" : "⏳ Pending"}
        </Text>
      </LinearGradient>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>💰 Maintenance Payment</Text>
      <Text style={styles.subHeader}>
        Pay and track your society bills easily
      </Text>

      {/* Pay Now Button */}
      <TouchableOpacity activeOpacity={0.9}>
        <LinearGradient colors={["#93c5fd", "#60a5fa"]} style={styles.payButton}>
          <Ionicons
            name="card-outline"
            size={22}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.payButtonText}>Pay Maintenance Bill</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Dues List */}
      <Text style={styles.sectionTitle}>📋 Payment History</Text>
      <FlatList
        data={duesData}
        keyExtractor={(item) => item.id}
        renderItem={renderDueCard}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 6,
  },
  subHeader: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 20,
  },
  payButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: 28,
    shadowColor: "#60a5fa",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 14,
  },
  card: {
    padding: 16,
    borderRadius: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  cardMonth: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
  },
  cardAmount: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  cardStatus: {
    fontSize: 14,
    fontWeight: "500",
  },
});
