import { sampleItems } from "@/database/models";
import { Ionicons } from "@expo/vector-icons";
import * as Location from 'expo-location';
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import { statuscolors } from "@/components/ui/statusbadge";

import { priorityColors } from "@/components/ui/prioritybadge";

//import {Card}  from '@/components/ui/card';


export default function TaskScreen() {

  //Task Dropdown Modal
 // const [TaskDropdownVisible, setTaskDropdownVisible] = useState(false);

  //Filter Button - Tasks
  // const [selectedFilter, setSelectedFilter] = useState("ALL");
  // const filters = [
  //   "ALL", ...Array.from(
  //     new Set(sampleItems.map((item: any) => item.serviceMemoStatus))
  //   ),
  // ];

  // //Search Filter     
  // const [search, setSearch] = useState("");

  // //Combined Filter : Search + dropdown
  // const filteredData = useMemo(() => {
  //   return sampleItems.filter((item) => {
  //     const matchStatus =
  //       selectedFilter === "ALL" || item.status === selectedFilter;

  //     const matchSearch =
  //       item.status.toLowerCase().includes(search.toLowerCase().trim());

  //     return matchStatus && matchSearch;
  //   });
  // }, [sampleItems, selectedFilter, search]);

  //Card Total base on Status
  const counts = (sampleItems ?? []).reduce<Record<string, number>>((acc, user) => {
    acc[user.status] = (acc[user.status] || 0) + 1;
    return acc;
  }, {});

  counts["ALL"] = sampleItems.length;

  //reverse geocode lat long to location
  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Location permission denied");
        return;
      }
      const result = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (result.length > 0) {
        const address = result[0];

        return `${address.name ?? ""}${address.street ?? ""}, ${address.city ?? ""
          }, ${address.region ?? ""}, ${address.country ?? ""}`;
      }
      return "Unknown location";
    } catch (error) {
      console.log(error);
      return "Unable to get address";
    }
  };

  // get current / last known location

  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.log("Permission denied");
      return;
    }

    // Try last known location first
    let currentLocation = await Location.getLastKnownPositionAsync();

    // If unavailable, get a fresh location
    if (!currentLocation) {
      currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
    }


    setLocation(currentLocation);
  };

  return (
    <>
      <SafeAreaView edges={[]} style={styles.container}>
        {/* <View style={styles.filterContainer}> */}
        {/* Search */}
        {/* <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#94A3B8" />

          <TextInput
            placeholder="Search tasks..."
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View> */}

        {/* Dropdown */}
        {/* <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setTaskDropdownVisible(true)}
        >
          <Ionicons
            name="options"
            size={20}
            color="#64748B"
          />

          <Text style={styles.dropdownText}>
            {selectedFilter}
          </Text>

          <Ionicons
            name="chevron-down"
            size={18}
            color="#64748B"
          />
        </TouchableOpacity>
      </View> */}

        {/* Modal for task dropdown */}
        {/* <Modal
        visible={TaskDropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setTaskDropdownVisible(false)}>
          
        <TouchableWithoutFeedback
          onPress={() => setTaskDropdownVisible(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Text style={styles.title}>SMS Type</Text>

                {filteredData.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.option}
                    onPress={() => {
                      setSelectedFilter(item.status);
                      setTaskDropdownVisible(false);
                    }}
                  >
                    <Text>{item.status} ({counts[item.status] || 0})</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal> */}

        <ScrollView
          contentContainerStyle={{ paddingBottom: 25 }}
          showsVerticalScrollIndicator={false}>

          {/* Location Header */}

          <View style={styles.header}>
            <View style={styles.locationIcon}>
              <Ionicons name="location-sharp" size={24} color="#fff" />
            </View>

            <View style={{ flex: 1 }}>
              {location && (
                <Text>
                  {location.coords.latitude}, {location.coords.longitude}
                </Text>
              )}

            </View>

            <View style={styles.taskBadge}>
              <Text style={styles.taskBadgeText}>4 TASKS</Text>
            </View>
          </View>

          {/* Cards */}

          {sampleItems.map((task) => (
            <View key={task.id} style={[styles.card, { borderLeftColor: statuscolors[task.status as keyof typeof statuscolors]?.color || '#888' }]}>
              <View style={styles.cardTop}>
                <Text style={styles.title}>{task.request}</Text>

                <View
                  style={[styles.priority, { backgroundColor: priorityColors[task.priority as keyof typeof priorityColors].bg || '#888' }]}>
                  <Text
                    style={[
                      styles.priorityText,
                      { color: priorityColors[task.priority as keyof typeof priorityColors].text || '#888' }]}>
                    {priorityColors[Number(task.priority) as keyof typeof priorityColors]?.label}
                  </Text>
                </View>

              </View>

              <Text style={styles.description}>{reverseGeocode(task.latitude, task.longitude)}</Text>

              {/* {task.LM !== "" && (
              <View style={styles.userRow}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>JD</Text>
                </View>

                <Text style={styles.assigned}>
                  Assigned to{" "}
                  <Text style={{ color: "#5570F1" }}>
                    {task.LM}
                  </Text>
                </Text>
              </View>
            )} */}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 4,
    marginTop: 63,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },

  locationIcon: {
    width: 42,
    height: 42,
    borderRadius: 18,
    backgroundColor: "#6B7280",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    elevation: 6,
  },

  address: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  city: {
    color: "#6B7280",
    marginTop: 3,
    fontSize: 14,
  },

  taskBadge: {
    backgroundColor: "#6B7280",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  taskBadgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    margin: 3,
    borderLeftWidth: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  priority: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },

  priorityText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "700",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  description: {
    color: "#667085",
    fontSize: 12,
    marginTop: 2,
    lineHeight: 22,
  },

  //filter container
  filterContainer: {
    gap: 8,
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
    marginTop: 5,
  },

  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#0F172A",
  },

  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
    minWidth: 100,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  dropdownText: {
    marginHorizontal: 8,
    fontSize: 12,
    fontWeight: "600",
    color: "#334155",
  },

  option: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },

  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    maxHeight: '90%',
    padding: 15,
  },
});