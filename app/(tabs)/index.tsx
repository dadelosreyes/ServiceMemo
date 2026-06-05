import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import React, { ComponentProps } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

//cards
type IconName = ComponentProps<typeof Ionicons>["name"];

type CardProps = {
  icon: IconName;
  title: string;
  value: string | number;
  color: string;
};

export default function Dashboard() {
  const router = useRouter();

  const sampleItems = [
    { id: "1", acctno: "024458", acctname: "John Cruz", contact: "09171234567", address: "12 Sampaguita St, Angeles City", request: "Reconnection", date: "2026-04-22", priority: "High", status: "In Progress", LM: "Alex Morgan", latitude: 0.3, longitude: 0.2 },
    { id: "2", acctno: "023158", acctname: "Maria Santos", contact: "09987654321", address: "90 National Highway, Bataan", request: "Disconnection", date: "2026-04-25", priority: "Medium", status: "Done", LM: "John Doe", latitude: 0.5, longitude: 0.5 },
    { id: "3", acctno: "022358", acctname: "Kevin Reyes", contact: "09223334444", address: "78 Kalaklan Rd, Zambales", request: "Check wiring", date: "2026-04-29", priority: "High", status: "In Progress", LM: "Michael", latitude: 0.1, longitude: 0.5 },
    { id: "4", acctno: "026258", acctname: "Angela Dizon", contact: "09175556666", address: "45 Gordon Ave, Subic", request: "Reconnection", date: "2026-04-23", priority: "Medium", status: "Todo", LM: "Sarah Jane Smith", latitude: 0.4, longitude: 0.7 },
    { id: "5", acctno: "023458", acctname: "Mark Flores", contact: "09334445555", address: "123 Rizal St, Olongapo City", request: "Relocation", date: "2026-04-22", priority: "Low", status: "In Progress", LM: "Jay Alcantara", latitude: 0.7, longitude: 0.4 },
  ];

  //Priority Badge
  const priorityColors = {
    High: {
      bg: "#FEE2E2",
      text: "#EF4444",
    },

    Medium: {
      bg: "#FEF3C7",
      text: "#D97706",
    },

    Low: {
      bg: "#DCFCE7",
      text: "#16A34A",
    },
  };

  //get avatar initials
  const getAvatarLetter = (name = "") => {
    return name
      .trim()
      .split(" ")
      .filter(Boolean)
      .map(part => part[0].toUpperCase())
      .slice(0, 2)
      .join("");
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.subtitle}>Welcome back, User!</Text>
        <Text style={styles.title}>You have 3 tasks coming up today. 👍</Text>
      </View>

      {/* Cards */}
      <View style={styles.grid}>
        <DashboardCard icon="settings-outline" title="Todo" value="22" color="#6C63FF" />
        <DashboardCard icon="time-outline" title="Pending" value="12" color="#FF7A00" />
        <DashboardCard icon="checkmark-done-sharp" title="Done" value="15" color="#00C897" />
      </View>

      {/* Upcoming */}
      <View style={styles.upcoming}>
        <Text style={styles.titleupc}>Upcoming Tasks</Text>

        <TouchableOpacity onPress={() => router.navigate('/tasks')}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>

      </View>

      <FlatList
        data={sampleItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (

          <TouchableOpacity style={styles.taskCard}>
            <View style={styles.taskIcon}>
              <Text style={styles.avatarText}> {getAvatarLetter(item.LM)}</Text>
            </View>

            <View style={styles.taskInfo}>
              <Text style={styles.taskTitle}>{item.request}</Text>
              <Text style={styles.taskAddress}>{item.date}</Text>
            </View>

            {item.priority && (
              <View style={[styles.priorityBadge, { backgroundColor: priorityColors[item.priority as keyof typeof priorityColors].bg || '#888' }]}>
                <Text style={[styles.priorityText, { color: priorityColors[item.priority as keyof typeof priorityColors].text || '#888' }]}>{item.priority}</Text>
              </View>
            )}

          </TouchableOpacity>
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
        <Ionicons name={icon} size={16} color={color} />
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

  /* header */
  header: {
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E1E2D',
  },
  subtitle: {
    fontSize: 15,
    color: '#7A7A8C',
  },

  /* Cards */
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  card: {
    width: "31%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 25,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },

  iconWrapper: {
    width: 30,
    height: 30,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  titleCard: {
    fontSize: 12,
    fontWeight: '400',
    color: '#333',
  },

  valueCard: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },

  /*Priority Badge */

  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 99,
  },
  priorityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },

  /* Upcoming Tasks */
  upcoming: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 20,
    marginBottom: 15,
  },

  titleupc: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginTop: 20,
    marginBottom: 15,
  },

  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  taskIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  taskInfo: {
    flex: 1
  },

  taskTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827"
  },

  taskAddress: {
    fontSize: 12,
    color: "#6b7280"
  },

  avatarText: {
    color: "#475569",
    fontWeight: "700",
    fontSize: 13,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
  },
})