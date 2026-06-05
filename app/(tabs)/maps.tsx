import { Ionicons } from "@expo/vector-icons";
import React from "react";

import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";


type ItemType = {
  id: string;
  acctno: string;
  acctname: string;
  contact: string;
  address: string;
  request: string;
  date: string;
  priority: string;
  status: string;
  LM: string;
  latitude: number;
  longitude: number;
};

const sampleItems: ItemType[] = [
  { id: "1", acctno: "024458", acctname: "John Cruz", contact: "09171234567", address: "12 Sampaguita St, Angeles City", request: "Reconnection", date: "2026-04-22", priority: "High", status: "In Progress", LM: "Alex Morgan", latitude: 0.3, longitude: 0.2 },
  { id: "2", acctno: "023158", acctname: "Maria Santos", contact: "09987654321", address: "90 National Highway, Bataan", request: "Disconnection", date: "2026-04-25", priority: "Medium", status: "Done", LM: "John Doe", latitude: 0.5, longitude: 0.5 },
  { id: "3", acctno: "022358", acctname: "Kevin Reyes", contact: "09223334444", address: "78 Kalaklan Rd, Zambales", request: "Check wiring", date: "2026-04-29", priority: "High", status: "In Progress", LM: "Michael", latitude: 0.1, longitude: 0.5 },
  { id: "4", acctno: "026258", acctname: "Angela Dizon", contact: "09175556666", address: "45 Gordon Ave, Subic", request: "Reconnection", date: "2026-04-23", priority: "Medium", status: "Todo", LM: "Sarah Jane Smith", latitude: 0.4, longitude: 0.7 },
  { id: "5", acctno: "023458", acctname: "Mark Flores", contact: "09334445555", address: "123 Rizal St, Olongapo City", request: "Relocation", date: "2026-04-22", priority: "Low", status: "In Progress", LM: "Jay Alcantara", latitude: 0.7, longitude: 0.4 },
  //{ id: "6", acctno: "023458", acctname: "Mark Flores", contact: "09334445555", address: "123 Rizal St, Olongapo City", request: "Relocation", date: "2026-04-22", priority: "Medium", status: "In Progress", LM: "Jay Alcantara", latitude:0.7, longitude:0.4 },
];

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

const windowWidth = Dimensions.get("window").width;

export default function Maps() {
  return (
    <View style={styles.container}>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="#94A3B8" />
        <TextInput
          placeholder="Search location or task"
          placeholderTextColor="#94A3B8"
          style={styles.searchInput}
        />
      </View>

      {/* Map Grid */}
      <View style={styles.mapContainer}>
        <View style={styles.mapArea}>

          {sampleItems.map((item) => (
            <View
              key={item.id}
              style={[
                styles.locationpin,
                {
                  backgroundColor: priorityColors[item.priority as keyof typeof priorityColors].bg || '#888',
                  left: item.latitude * windowWidth - 12,
                  top: item.longitude * 200 - 12, // map height = 200
                },
              ]}
            >
              <Ionicons name="radio-button-on" size={15} style={{ color: priorityColors[item.priority as keyof typeof priorityColors].text || '#888' }} />
            </View>
          ))}
          {/* Optional current location button
        <TouchableOpacity style={styles.currentLocationButton}>
          <Ionicons name="navigate-outline" size={22} color="#fff" />
        </TouchableOpacity> */}

          {/* Controls */}
          <View style={styles.topControls}>
            <TouchableOpacity style={styles.controlBtn}>
              <Ionicons name="layers-outline" size={18} color="#334155" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlBtn}>
              <Ionicons name="locate-outline" size={18} color="#334155" />
            </TouchableOpacity>
          </View>

          <View style={styles.zoomControls}>
            <TouchableOpacity style={styles.controlBtn}>
              <Ionicons name="add" size={20} color="#334155" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlBtn}>
              <Ionicons name="remove" size={20} color="#334155" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Selected Task */}
        <View style={styles.selectedTask}>
          <View style={styles.taskIcon}>
            <Ionicons name="location-outline" size={24} color="#fff" />
          </View>

          <View style={{ flex: 1 }}>
            <View style={styles.row}>
              <Text style={styles.taskTitleSelected}>Reconnection</Text>

              <View style={styles.urgentBadge}>
                <Text style={styles.urgentText}>Urgent</Text>
              </View>
            </View>

            {/* <Text style={styles.address}>
            </Text> */}

            <View style={styles.metaRow}>
              <Ionicons name="navigate-outline" size={13} color="#64748B" />
              <Text style={styles.metaText}>1.2 km</Text>

              <Ionicons name="time-outline" size={13} color="#64748B" />
              <Text style={styles.metaText}>6 min</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.goButton}>
            <Ionicons name="navigate" size={16} color="#fff" />
            <Text style={styles.goText}></Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Nearby Tasks List */}
      <Text style={styles.sectionTitle}>Nearby Tasks</Text>

      <FlatList
        data={sampleItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (

          <TouchableOpacity style={styles.taskCard}>

            <View style={[styles.taskIcon, { backgroundColor: priorityColors[item.priority as keyof typeof priorityColors].bg || '#888' }]}>
              <Ionicons name="location-sharp" size={20} style={{ color: priorityColors[item.priority as keyof typeof priorityColors].text || '#888' }} />
            </View>

            <View style={styles.taskInfo}>
              <Text style={styles.taskTitle}>{item.request}</Text>
              <Text style={styles.taskAddress}>{item.address}</Text>
            </View>
            
            {/* <Text style={styles.taskDistance}>{item.distance}</Text> */}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 15,
    marginTop: 2,
  },

  mapContainer: {
    backgroundColor: "#fff",
    borderRadius: 22,
    overflow: "hidden",

  },
  mapArea: {
    height: 225,
    backgroundColor: "#DCEAF2",
    position: "relative",
  },

  locationpin: {
    width: 30,
    height: 30,
    borderRadius: 24,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  // currentLocationButton: {
  //   position: "absolute",
  //   bottom: 10,
  //   right: 10,
  //   width: 40,
  //   height: 40,
  //   borderRadius: 20,
  //   backgroundColor: "#3b82f6",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginTop: 20,
    marginBottom: 10,
  },

  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  taskIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e5e7eb",
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

  taskDistance: { 
    fontSize: 12, 
    color: "#2563eb", 
    fontWeight: "500" },

  //search bar
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 46,
    borderRadius: 16,
    paddingHorizontal: 14,
    marginBottom: 14,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
  },

  //Map controls
  topControls: {
    position: "absolute",
    right: 10,
    top: 10,
    gap: 8,
  },

  zoomControls: {
    position: "absolute",
    right: 10,
    bottom: 14,
  },

  controlBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  //selected task
  selectedTask: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  taskTitleSelected: {
    fontSize: 18,
    fontWeight: "700",
  },

  urgentBadge: {
    backgroundColor: "#FFE5EB",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },

  urgentText: {
    color: "#FF3366",
    fontSize: 11,
    fontWeight: "600",
  },

  address: {
    color: "#64748B",
    marginTop: 2,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 6,
  },

  metaText: {
    color: "#64748B",
    marginRight: 8,
  },

  goButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0F1A3C",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
  },

  goText: {
    color: "#fff",
    fontWeight: "600",
  },

});
