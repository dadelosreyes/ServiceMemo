import { Ionicons } from "@expo/vector-icons";
import React, { ComponentProps, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

//cards
type IconName = ComponentProps<typeof Ionicons>["name"];

type CardProps = {
  icon: IconName;
  title: string;
  value: string | number;
  color: string;
};

//Upcoming cards
const upccards = ['Card 1', 'Card 2', 'Card 3'];

export default function Dashboard() {
  const [selected, setSelected] = useState<number | null>(null);

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

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.subtitle}>Welcome Back!</Text>
        <Text style={styles.title}>You have 3 tasks coming up today. 👍</Text>
      </View>

      {/* Cards */}
      <View style={styles.grid}>
        <DashboardCard icon="build-outline" title="Todo" value="22" color="#6C63FF" />
        <DashboardCard icon="calendar-outline" title="Pending" value="12" color="#FF7A00" />
        <DashboardCard icon="checkmark-circle-outline" title="Done" value="15" color="#00C897" />
      </View>

      {/* Upcoming */}
      <View style={styles.upcoming}>
        <Text style={styles.titleupc}>Upcoming Tasks</Text>

        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Upcoming cards */}
      {/* <View style={styles.upccard}>
        {upccards.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.cardupc,
              selected === index && styles.selectedCard
            ]}
            onPress={() => setSelected(index)}
          >
            <Text
              style={[
                styles.text,
                selected === index && styles.selectedText
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View> */}


      <FlatList
        data={sampleItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <View style={styles.listItem}>

            {/* LEFT */}
            <View style={styles.left}>
              <Text style={styles.itemText}>{item.title}</Text>
              <Text style={styles.itemRight}>{item.date}</Text>
            </View>

            {/* RIGHT */}

            {item.priority && (
              <View style={[styles.priorityTag, { backgroundColor: priorityColors[item.priority as keyof typeof priorityColors] || '#888' }]}>
                <Text style={styles.priorityDot}>{item.priority}</Text>
              </View>
            )}
          </View>
        )}
      />
    </View>
  )
}

/* Cards */
function DashboardCard({ icon, title, value, color }: CardProps) {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={[styles.iconWrapper, { backgroundColor: color + "20" }]}>
        <Ionicons name={icon} size={26} color={color} />
      </View>
      <Text style={styles.titleCard}>{title}</Text>
      <Text style={styles.valueCard}>{value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 15,
  },

  /* HEADER */
  header: {
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E1E2D',
    marginTop: 5,
  },
  subtitle: {
    fontSize: 15,
    color: '#7A7A8C',
  },

  /* CARDS */
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 6,
    paddingVertical: 20,
    borderRadius: 18,
    alignItems: 'center',
    marginRight: 10,

    // modern soft shadow
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  iconWrapper: {
    padding: 8,
    borderRadius: 18,
    marginBottom: 10,
  },

  titleCard: {
    fontSize: 12,
    fontWeight: '400',
    color: '#333',
  },

  valueCard: {
    fontSize: 20,
    fontWeight: '800',
    color: '#333',
  },

  /* LIST CARD */
  // listCard: {
  //   width: "95%",
  //   backgroundColor: "#fff",
  //   borderRadius: 8,
  //   padding: 16,
  //   marginTop: 10,
  //   flex: 1,
  //   marginBottom: 10,

  // },

  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 8,

    // modern soft shadow
    shadowColor: '#000',
    shadowOpacity: 0.09,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  left: {
    flexDirection: "column",
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

  /* Upcoming */

  upcoming: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2f95dc',
  },

  titleupc: {
    fontSize: 20,
    fontWeight: '500',
    color: '#1E1E2D',
    marginTop: 20,
    marginBottom: 15,
  },

  // upccard: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  // },
  // cardupc: {
  //   flex: 1,
  //   margin: 3,
  //   height: 25,
  //   borderRadius: 20,
  //   backgroundColor: '#eee',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // selectedCard: {
  //   backgroundColor: '#4e4e4e',
  // },
  // text: {
  //   fontSize: 12,
  // },
  // selectedText: {
  //   color: '#ffffff',
  //   fontWeight: 'bold',
  // },

})