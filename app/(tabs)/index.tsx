import { Ionicons } from "@expo/vector-icons";
import React, { ComponentProps } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

//cards
type IconName = ComponentProps<typeof Ionicons>["name"];

type CardProps = {
  icon: IconName;
  title: string;
  value: string | number;
  color: string;
};

export default function Dashboard() {

  const sampleItems = [
    { id: "1", title: "New user registered", date: "2026-04-22", priority: "High" },
    { id: "2", title: "Order placed", date: "2026-04-25", priority: "High" },
    { id: "3", title: "Payment received", date: "2026-04-29", priority: "High" },
    { id: "4", title: "Server alert resolved", date: "2026-04-23", priority: "Medium" },
    { id: "5", title: "New user registered", date: "2026-04-22", priority: "Low" },
    { id: "6", title: "Order placed", date: "2026-04-25", priority: "High" },
    { id: "7", title: "Payment received", date: "2026-04-29", priority: "High" },
    { id: "8", title: "Server alert resolved", date: "2026-04-23", priority: "Medium" },
    { id: "9", title: "Order placed", date: "2026-04-22", priority: "Low" },
    { id: "10", title: "Payment received", date: "2026-04-25", priority: "High" }
  ];

  const priorityColors = {
    High: '#FF4D4D',
    Medium: '#FFA500',
    Low: '#00a300',
  };

  return (
    <View style={styles.container}>

      {/* Cards */}
      <View style={styles.grid}>
        <Card icon="bulb-outline" title="Total" value="125" color="#4f46e5" />
        <Card icon="build-outline" title="Todo" value="52" color="#ef4444" />
        <Card icon="time-outline" title="In Progress" value="23" color="#ca8000" />
        <Card icon="checkmark-circle-outline" title="Done" value="12" color="#0f9468" />
      </View>

      {/* List Card | Upcoming */}

      <View style={styles.listCard}>
        <Text style={styles.listTitle}>Upcoming Activity</Text>

        {/* <View style={styles.dotcategory}>
              <Ionicons name="ellipse" size={15} color="#FF4D4D" /><Text >High</Text>
              <Ionicons name="ellipse" size={15} color="#FFA500" /><Text >Medium</Text>
              <Ionicons name="ellipse" size={15} color="#00a300" /><Text >Low</Text>
              </View> */}

        <FlatList
          data={sampleItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (

            <View style={styles.listItem}>

              {/* LEFT */}
              <View style={styles.left}>
                {item.priority && (
                  <View style={[styles.priorityTag, { backgroundColor: priorityColors[item.priority as keyof typeof priorityColors] || '#888' }]}>
                    <Text style={styles.priorityDot}>{item.priority}</Text>
                  </View>
                )}
                <Text style={styles.itemText}>{item.title}</Text>
              </View>

              {/* RIGHT */}
              <Text style={styles.itemRight}>{item.date}</Text>
            </View>
          )}
        />
      </View>
    </View>
  )
}

/* Cards */
function Card({ icon, title, value, color }: CardProps) {
  return (
    <View style={styles.card}>

      <View style={[styles.iconWrap, { backgroundColor: color + "20" }]}>
        <Ionicons name={icon} size={26} color={color} />
      </View>

      <Text style={styles.titleCard}>{title}</Text>
      <Text style={styles.valueCard}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
  },

  /* CARDS */
  grid: {
    width: "95%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },

  card: {
    width: "49%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginBottom: 5,
  },

  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  titleCard: {
    fontSize: 12,
    color: "#6b7280",
  },

  valueCard: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 2,
  },

  /* LIST CARD */
  listCard: {
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginTop: 2,
    flex: 1,
    marginBottom: 10,
  },

  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#111827",
  },

  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  itemText: {
    fontSize: 14,
    color: "#111827",
  },

  itemRight: {
    fontSize: 12,
    color: "#6b7280",
  },

  itemTime: {
    fontSize: 12,
    color: "#6b7280",
  },

  /*Priority Label */
  priorityTag: {
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 1,
    marginRight: 10,
    marginLeft: 5,
  },
  priorityDot: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },

  dotcategory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },

})