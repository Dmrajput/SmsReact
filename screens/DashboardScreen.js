import React from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

// Unified sections data
const sections = [
  {
    id: "news",
    title: "🏠 Society News",
    color: ["#4facfe", "#00f2fe"],
    data: [
      { id: "1", title: "New Park Inauguration", date: "2025-09-20", icon: "leaf-outline" },
      { id: "2", title: "Water Supply Schedule Update", date: "2025-09-18", icon: "water-outline" },
    ],
  },
  {
    id: "notice",
    title: "📢 Notice Board",
    color: ["#43e97b", "#38f9d7"],
    data: [
      { id: "1", title: "Maintenance Work on Block A", date: "2025-09-17", icon: "build-outline" },
      { id: "2", title: "Parking Rules Updated", date: "2025-09-15", icon: "car-outline" },
    ],
  },
  {
    id: "events",
    title: "🎉 Upcoming Events",
    color: ["#fa709a", "#fee140"],
    data: [
      { id: "1", title: "Annual Cultural Fest", date: "2025-10-01", icon: "musical-notes-outline" },
      { id: "2", title: "Yoga Session for Residents", date: "2025-09-25", icon: "fitness-outline" },
    ],
  },
];

// Reusable card component
const InfoCard = ({ item, colors }) => (
  <TouchableOpacity activeOpacity={0.85}>
    <LinearGradient colors={colors} style={styles.card}>
      <Ionicons name={item.icon} size={28} color="#fff" style={{ marginBottom: 10 }} />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDate}>{item.date}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

// Reusable section component
const Section = ({ title, data, colors }) => (
  <View style={{ marginBottom: 28 }}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <LinearGradient colors={colors} style={styles.sectionUnderline} />
    </View>
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <InfoCard item={item} colors={colors} />}
      contentContainerStyle={{ paddingVertical: 6 }}
    />
  </View>
);

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      {sections.map((section) => (
        <Section
          key={section.id}
          title={section.title}
          data={section.data}
          colors={section.color}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  sectionUnderline: {
    width: 50,
    height: 3,
    borderRadius: 2,
  },
  card: {
    width: 170,
    padding: 16,
    borderRadius: 16,
    marginRight: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 12,
    color: "#e0f7ff",
  },
});
