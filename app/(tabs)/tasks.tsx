import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import * as Location from 'expo-location';
import { useMemo } from "react";
import { FlatList, Linking, ListRenderItem, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

//badge
import { priorityColors } from "@/components/ui/prioritybadge";
import { StatusBadge, statuscolors } from "@/components/ui/statusbadge";

// pull data from API
import { useRefreshContext } from '@/contexts/refreshcontext';
import { TaskType } from "@/database/models";
import { fetchTasks } from "@/scripts/api";
import React, { useCallback, useEffect, useState } from "react";

//navigation
//import { useRouter } from 'expo-router';

export default function Tasks() {

  //const router = useRouter();

  //pull data from API
  const { registerRefresh } = useRefreshContext();
  const [SMS, setSMS] = useState<any[]>([]);

  const loadData = useCallback(async () => {
    try {
      const data = await fetchTasks();
      setSMS(data);
      console.log("SUCCESS:", data);
    } catch (error) {
      console.log("ERROR:", error);
      throw error;
    }
  }, []);

  useEffect(() => {
    const unregister = registerRefresh(loadData);

    loadData();

    return () => {
      unregister();
    };
  }, [loadData, registerRefresh]);

  //Card Total base on Status
  const counts = (SMS ?? []).reduce<Record<string, number>>((acc, user) => {
    acc[user.serviceMemoStatus] = (acc[user.serviceMemoStatus] || 0) + 1;
    return acc;
  }, {});

  counts["ALL"] = SMS.length;

  //Get Data - Modal
  const [selectedCard, setSelectedCard] = useState<TaskType | null>(null);

  //Task Dropdown Modal
  const [TaskDropdownVisible, setTaskDropdownVisible] = useState(false);

  //Filter Button - Tasks
  const [selectedFilter, setSelectedFilter] = useState("PENDING");
  const filters = [
    "ALL", ...Array.from(
      new Set(SMS.map((item: any) => item.serviceMemoStatus))
    ),
  ];

  //Search Filter     
  const [search, setSearch] = useState("");

  //Combined Filter : Search + dropdown 
  const filteredData = useMemo(() => {
    return SMS.filter((item) => {
      const matchStatus =
        selectedFilter === "ALL" || item.serviceMemoStatus === selectedFilter;

      const matchSearch =
        item.smsType.toLowerCase().includes(search.toLowerCase().trim());

      return matchStatus && matchSearch;
    });
  }, [SMS, selectedFilter, search]);

  //reverse geocode lat long
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

  //get avatar initials
  // const getAvatarLetter = (name = "") => {
  //   return name
  //     .trim()
  //     .split(" ")
  //     .filter(Boolean)
  //     .map(part => part[0].toUpperCase())
  //     .slice(0, 2)
  //     .join("");
  // };


  //Priority
  const PriorityBadge = ({ priority }: { priority: number }) => (
    <View style={[styles.priorityBadge, { backgroundColor: priorityColors[priority as keyof typeof priorityColors].bg || '#888' }]}>
      <Text style={[styles.priorityText, { color: priorityColors[priority as keyof typeof priorityColors].text || '#888' }]}> {priorityColors[Number(priority) as keyof typeof priorityColors]?.label}</Text>
    </View>
  );

  // Open Map
  const openMap = async (latitude: number, longitude: number) => {
    const url = `google.navigation:q=${latitude},${longitude}`;

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Linking.openURL(
        `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
      );
    }
  };

  const renderItem: ListRenderItem<TaskType> = ({ item }) => (

    <SafeAreaView edges={[]} style={styles.containerCard}>
      <View style={[styles.card, { borderLeftColor: statuscolors[item.serviceMemoStatus as keyof typeof statuscolors]?.color || '#888' }]}>

        {/* Header */}
        <View style={styles.header}>
          {/* <View style={styles.iconWrapper}>
          <Ionicons name="alert-circle-outline" size={20} color="#D97706" />
        </View> */}

          <View style={{ flex: 1 }}>

            {/* <Text style={styles.dateLabel}>{item.remarks}</Text> */}
            <Text style={styles.title}>{item.smsType}</Text>
            {/* <Text style={styles.subtitle}>{reverseGeocode(item.latitude, item.longitude)}</Text> */}

            <View style={styles.badgeRow}>
              <StatusBadge serviceMemoStatus={item.serviceMemoStatus} />

              <View style={styles.locationTag}>
                <Ionicons name="person-circle-sharp" size={18} color="#4B5563" />
                <Text style={styles.locationText}>{item.endorsedBy}</Text>
              </View>
            </View>
          </View>

          <PriorityBadge priority={item.priority} />
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.dateContainer}>
            <View style={styles.dateIcon}>
              <Ionicons name="calendar" size={18} color="#4B5563" />
            </View>

            <View>
              <Text style={styles.dateLabel}>Date Created</Text>
              <Text style={styles.dateText}>{dayjs(item.transDate).format("MMMM DD, YYYY")}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.viewButton} onPress={() => setSelectedCard(item)}>
            <Text style={styles.statusButton} >VIEW</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )

  // Data Modal Label- Modal
  const DetailItem = ({
    label,
    value,
  }: {
    label: string;
    value: React.ReactNode;
  }) => (
    <View style={styles.section}>
      <Text style={styles.label}>{label}</Text>
      {value}
    </View>
  );

  return (
    <>
      <SafeAreaView edges={[]} style={styles.container}>
        <View style={styles.filterContainer}>

          {/* Search */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#94A3B8" />

            <TextInput
              placeholder="Search tasks..."
              placeholderTextColor="#94A3B8"
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
            />

          </View>

          {/* Dropdown */}
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setTaskDropdownVisible(true)}>

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
        </View>

        <FlatList
          data={filteredData}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
        />

        {/* Modal for task dropdown */}
        <Modal
          visible={TaskDropdownVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setTaskDropdownVisible(false)}
        >

          <TouchableWithoutFeedback
            onPress={() => setTaskDropdownVisible(false)}>
            <View style={styles.overlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                  <Text style={styles.title}>SMS Type</Text>

                  {filters
                    .map((item) => (
                      <TouchableOpacity
                        key={item}
                        style={styles.option}
                        onPress={() => {
                          setSelectedFilter(item);
                          setTaskDropdownVisible(false);
                        }}
                      >
                        <Text>{item} ({counts[item] || 0})</Text>
                      </TouchableOpacity>
                    ))}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Modal
            visible={!!selectedCard}
            transparent
            animationType="slide"
          >
            <View style={styles.overlay}>
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>

                  <Text style={styles.modalTitle}>Task Details</Text>

                  <TouchableOpacity onPress={() => setSelectedCard(null)}>
                    <Ionicons name="close" size={24} />
                  </TouchableOpacity>
                </View>

                {selectedCard && (
                  <ScrollView showsVerticalScrollIndicator={false}>

                    <DetailItem
                      label="Service Memo Status"
                      value={
                        <StatusBadge serviceMemoStatus={selectedCard.serviceMemoStatus} />
                      }
                    />

                    <DetailItem
                      label="SMS Type"
                      value={
                        <Text style={styles.valueText}>
                          {selectedCard.smsType}
                        </Text>
                      }
                    />

                     <DetailItem
                      label="Account Number"
                      value={
                        <Text style={styles.valueText}>
                          {selectedCard.acctNo}
                        </Text>
                      }
                    />

                    <DetailItem
                      label="Meter SN"
                      value={
                        <Text style={styles.valueText}>
                          {selectedCard.meterSn}
                        </Text>
                      }
                    />

                    <DetailItem
                      label="Contact Number"
                      value={
                        <Text style={styles.valueText}>
                          {selectedCard.contactNo}
                        </Text>
                      }
                    />

                    <DetailItem
                      label="Remarks"
                      value={
                        <Text style={styles.valueText}>
                          {selectedCard.remarks}
                        </Text>
                      }
                    />

                    <DetailItem
                      label="Date Created"
                      value={
                        <View style={styles.row}>
                          <Ionicons
                            name="calendar-outline"
                            size={16}
                          />
                          <Text style={styles.valueText}>
                            {dayjs(selectedCard.transDate).format("MMMM DD, YYYY | hh:mm A")}
                          </Text>
                        </View>
                      }
                    />

                    <View style={styles.section}>
                      <Text style={styles.label}>
                        Location Description
                      </Text>

                      <View style={styles.locationCard}>
                        <View style={styles.row}>
                          <Text style={styles.locationTitle}>
                            {reverseGeocode(selectedCard.latitude, selectedCard.longitude)}
                          </Text>
                        </View>
                      </View>

                      <TouchableOpacity
                        onPress={() => openMap(selectedCard.latitude, selectedCard.longitude)}
                        style={{
                          marginTop: 18,
                          marginBottom: 8,
                          height: 40,
                          borderRadius: 15,
                          backgroundColor: "#0369A1",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                        }}
                      >

                        <Ionicons
                          name="navigate-circle"
                          size={20}
                          color="#FFF"
                        />

                        <Text style={styles.doneText}>View Location</Text>
                      </TouchableOpacity>
                    </View>

                    <DetailItem
                      label="Priority Level"
                      value={
                        <PriorityBadge
                          priority={selectedCard.priority}
                        />
                      }
                    />

                    <View style={styles.section}>
                      <Text style={styles.label}>
                        Assigned To
                      </Text>

                      <View style={styles.userRow}>
                        <View style={styles.avatar}>
                          <Ionicons
                            name="person"
                            size={20}
                            color="#4B5563"
                          />
                        </View>

                        <View>
                          <Text style={styles.userName}>
                            {selectedCard.endorsedTo}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.section}>
                      <Text style={styles.label}>
                        Assigned By
                      </Text>

                      <View style={styles.userRow}>
                        <View style={styles.avatar}>
                          <Ionicons
                            name="person"
                            size={20}
                            color="#4B5563"
                          />
                        </View>

                        <View>
                          <Text style={styles.userName}>
                            {selectedCard.endorsedBy}
                          </Text>

                        </View>
                      </View>
                    </View>

                    {/* Filter Button */}
                    {selectedCard?.serviceMemoStatus !== "ACCOMPLISHED" && (
                      <>
                        <Text style={styles.sectionTitle}>Action</Text>

                        <TextInput
                          style={styles.remarksInput}
                          multiline
                        />

                        <TouchableOpacity
                          style={{
                            marginTop: 18,
                            marginBottom: 8,
                            height: 40,
                            borderRadius: 15,
                            backgroundColor: "#0369A1",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                          }}
                        >

                          <Ionicons
                            name="arrow-redo"
                            size={16}
                            color="#FFF"
                          />

                          <Text style={styles.doneText}>Submit</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </ScrollView>
                )}
              </View>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView >
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 4,
    marginTop: 63,
    backgroundColor: "#f9f9f9",
  },
  containerCard: {
    flex: 1,
    paddingHorizontal: 4,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: "#dddddd",
    margin: 5,
    borderLeftWidth: 3,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 12,
    color: "#111827",
    marginBottom: 12,
  },
  
  //Remarks + Button
  remarksInput: {
    minHeight: 100,
    textAlignVertical: "top",
    padding: 14,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 14,
    marginBottom: 8,
  },

  doneText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 5,
  },

  statusButton: {
    color: "#4B5563",
    fontSize: 12,
    fontWeight: "700",
  },

  priorityBadge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },

  priorityText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
  },

  //Consumer Details
  sectionTitle: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginLeft: 10,
  },

  //Avatar + Button
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  avatar: {
    borderRadius: 17,
    width: 34,
    height: 34,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },

  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  locationTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },

  locationText: {
    color: '#666',
    marginLeft: 4,
    fontSize: 12,
    fontWeight: 600,
  },

  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 15,
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  dateIcon: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  dateLabel: {
    fontSize: 12,
    color: "#6B7280",
  },

  dateText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },

  viewButton: {
    width: 100,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },

  //modal 
  section: {
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 14,
    padding: 15,
    marginBottom: 8,
  },

  label: {
    color: '#888',
    fontSize: 12,
    marginBottom: 5,
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
    maxHeight: '95%',
    padding: 20,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
    marginTop: 10,
  },

  valueText: {
    fontSize: 15,
    color: '#222',
    fontWeight: "bold",
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  locationCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
  },

  locationTitle: {
    marginLeft: 8,
    fontWeight: '600',
    color: '#333',
  },

  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  userName: {
    fontWeight: '600',
    fontSize: 12,
    color: '#888',
    marginLeft: 8,
  },

  //search ui
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
    elevation: 2,
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
});
