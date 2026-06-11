import { Feather, Ionicons } from "@expo/vector-icons";
import { ComponentProps, default as React, useMemo, useState } from "react";
import { FlatList, ListRenderItem, Modal, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//sample data
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
};

const sampleItems: ItemType[] = [
  { id: "1", acctno: "024458", acctname: "John Cruz", contact: "09171234567", address: "12 Sampaguita St, Angeles City", request: "Reconnection", date: "2026-04-22", priority: "High", status: "In Progress", LM: "Alex Morgan" },
  { id: "2", acctno: "023158", acctname: "Maria Santos", contact: "09987654321", address: "90 National Highway, Bataan", request: "Disconnection", date: "2026-04-25", priority: "Medium", status: "Done", LM: "John Doe" },
  { id: "3", acctno: "022358", acctname: "Kevin Reyes", contact: "09223334444", address: "78 Kalaklan Rd, Zambales", request: "Check wiring", date: "2026-04-29", priority: "High", status: "In Progress", LM: "Michael" },
  { id: "4", acctno: "026258", acctname: "Angela Dizon", contact: "09175556666", address: "45 Gordon Ave, Subic", request: "Reconnection", date: "2026-04-23", priority: "Medium", status: "Todo", LM: "Sarah Jane Smith" },
  { id: "5", acctno: "023458", acctname: "Mark Flores", contact: "09334445555", address: "123 Rizal St, Olongapo City", request: "Relocation", date: "2026-04-22", priority: "Low", status: "In Progress", LM: "Jay Alcantara" },
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

//Status Colors
const StatusColors = {
  Todo: '#6b6b6b',
  "In Progress": '#6b6b6b',
  Done: '#00a300',
};

export default function Tasks() {

  //Make Card Visible
  //const [LocModalVisible, setLocModalVisible] = useState(false);
  const [InfoModalVisible, setInfoModalVisible] = useState(false);

  //Modal Info
  const openInfoModal = (item: ItemType) => {
    setSelectedCard(item);
    setInfoModalVisible(true);
  };

  //Get Data - Modal
  const [selectedCard, setSelectedCard] = useState<ItemType | null>(null);

  //Filter Button - Tasks
  const [selectedFilter, setSelectedFilter] = useState("All");
  const filters = ["All", "Todo", "In Progress", "Done"];

  //Search Filter
  const [search, setSearch] = useState("");

  //Combined Filter : Search & Button
  const filteredData = useMemo(() => {
    return sampleItems.filter((item) => {
      const matchStatus =
        selectedFilter === "All" || item.status === selectedFilter;

      const matchSearch =
        item.request.toLowerCase().includes(search.toLowerCase().trim());

      return matchStatus && matchSearch;
    });
  }, [sampleItems, selectedFilter, search]);

  //Icons
  type IconName = ComponentProps<typeof Ionicons>["name"];

  //Modal - Consumer Detail Row
  interface DetailRowProps {
    icon: IconName;
    title: string;
    subtitle: string;
  }

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

  const renderItem: ListRenderItem<ItemType> = ({ item }) => (

    <View style={styles.container}>
      <View style={styles.card}>

        {/* Status + Priority */}
        <View style={styles.header}>
          <View style={styles.statusRow}>
            <View style={[styles.dot, { backgroundColor: StatusColors[item.status as keyof typeof StatusColors] || '#888' }]} />
            <Text style={styles.statusText}>{item.status}</Text>
          </View>

          <View style={[styles.priorityBadge, { backgroundColor: priorityColors[item.priority as keyof typeof priorityColors].bg || '#888' }]}>
            <Text style={[styles.priorityText, { color: priorityColors[item.priority as keyof typeof priorityColors].text || '#888' }]}>{item.priority}</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>#{item.id} {item.request}</Text>

        {/* Description */}
        <Text style={styles.descriptionCard}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        </Text>

        {/* Date + Location */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Feather name="clock" size={15} color="#6B7280" />
            <Text style={styles.infoText}>{item.date}</Text>
          </View>

          <View style={styles.infoItem}>
            <Feather name="map-pin" size={15} color="#6B7280" />
            <Text style={styles.infoText}>{item.address}</Text>
          </View>
        </View>

        {/* Avatar + Buttons  */}
        <View style={styles.footer}>
          {/* <TouchableOpacity onLongPress={() => Alert.alert(item.LM)}> */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}> {item.LM}</Text>
          </View>
          {/* </TouchableOpacity> */}


          <View style={styles.actions}>
            <TouchableHighlight underlayColor="#dde6f8" style={styles.iconButton} onPress={() => openInfoModal(item)} >
              <Ionicons name="eye-sharp" size={20} color="#374151" />
            </TouchableHighlight>

            {/* <TouchableHighlight style={styles.primaryButton} >
              <Ionicons name="location-outline" size={20} color="#374151" />
            </TouchableHighlight> */}
          </View>
        </View>
      </View>

      {/* View Info - Modal */}
      <Modal visible={InfoModalVisible} animationType="none" presentationStyle="fullScreen" onRequestClose={() => setInfoModalVisible(false)}>
        <View style={styles.modalOverlay}>

          <KeyboardAwareScrollView style={styles.ContainerView}
            enableOnAndroid
            extraScrollHeight={100}
            keyboardShouldPersistTaps="handled">

            {selectedCard && (
              <>
                {/* Status */}
                <View style={styles.header}>
                  <View style={styles.statusRowView}>
                    <View style={[styles.dotView, { backgroundColor: StatusColors[selectedCard.status as keyof typeof StatusColors] || '#888' }]} />
                    <Text style={styles.statusView}>{selectedCard.status}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setInfoModalVisible(false)}>
                    <Ionicons name="close" size={30} color="#374151" />
                  </TouchableOpacity>
                </View>

                {/* Title */}
                <Text style={styles.titleView}>#{selectedCard.id} {selectedCard.request}</Text>
                <Text style={styles.description}>
                  Provide written feedback on the three submitted concepts.
                </Text>

                {/* Map */}
                <View style={styles.mapContainer}>
                  <View style={[styles.locationPin, { backgroundColor: priorityColors[selectedCard.priority as keyof typeof priorityColors].bg || '#888' }]}>
                    <Ionicons name="location-sharp" size={24} style={{ color: priorityColors[selectedCard.priority as keyof typeof priorityColors].text || '#888' }} />
                  </View>

                  <View style={styles.remoteBadge}>
                    <Ionicons name="location-outline" size={16} color="#4B5563" />
                    <Text style={styles.remoteText}>{selectedCard.address}</Text>
                  </View>
                </View>

                {/* Consumer Details */}
                <Text style={styles.sectionTitle}>Consumer Details</Text>
                <View style={styles.consumerCard}>

                  <DetailRow
                    icon="mail-sharp"
                    title={selectedCard.acctno}
                    subtitle="Account Number"
                  />

                  <DetailRow
                    icon="person-sharp"
                    title={selectedCard.acctname}
                    subtitle={"Consumer Name"}
                  />

                  <DetailRow
                    icon="call-sharp"
                    title={selectedCard.contact}
                    subtitle="Contact Number"
                  />

                  <DetailRow
                    icon="time-sharp"
                    title={selectedCard.date}
                    subtitle="Due Date"
                  />

                  <DetailRow
                    icon="location-sharp"
                    title={selectedCard.address}
                    subtitle="Location"
                  />
                </View>

                {/* Filter Button */}
                {selectedCard?.status === "Todo" && (
                  <>
                    <Text style={styles.sectionTitle}>Remarks</Text>
                    <TextInput
                      style={styles.remarksInput}
                      placeholder="Add Remarks"
                      multiline
                    />
                    <TouchableOpacity
                      style={{
                        marginTop: 18,
                        marginBottom: 40,
                        height: 40,
                        borderRadius: 15,
                        backgroundColor: "#2563EB",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                      onPress={() => { setInfoModalVisible(false); console.log("Done ID:", selectedCard.id); }}>

                      <Ionicons
                        name="briefcase-outline"
                        size={20}
                        color="#FFF"
                      />

                      <Text style={styles.doneText}>Start Task</Text>
                    </TouchableOpacity>
                  </>
                )}

                {selectedCard?.status === "In Progress" && (
                  <>
                    <Text style={styles.sectionTitle}>Remarks</Text>
                    <TextInput
                      style={styles.remarksInput}
                      placeholder="Add Remarks"
                      multiline
                    />
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#16A34A",
                        marginTop: 18,
                        marginBottom: 40,
                        height: 40,
                        borderRadius: 15,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                      onPress={() => { setInfoModalVisible(false); console.log("Done ID:", selectedCard.id); }}>

                      <Ionicons
                        name="checkmark-circle-sharp"
                        size={20}
                        color="#FFF"
                      />

                      <Text style={styles.doneText}>Mark as Done</Text>
                    </TouchableOpacity>
                  </>
                )}
              </>
            )}
          </KeyboardAwareScrollView>
        </View>
      </Modal>
    </View>
  )

  // Consumer Details - Modal
  function DetailRow({ icon, title, subtitle }: DetailRowProps) {
    return (
      <View style={styles.detailRow}>
        <View style={styles.iconCircle}>
          <Ionicons name={icon} size={18} color="#1E3A8A" />
        </View>

        <View>
          <Text style={styles.detailTitle}>{title}</Text>
          <Text style={styles.detailSubtitle}>{subtitle}</Text>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={

        //Search Bar
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#999" />
            <TextInput
              placeholder="Search tasks..."
              placeholderTextColor="#999"
              value={search}
              onChangeText={setSearch}
              style={styles.input}
            />
          </View>

          {/* Task Filter */}
          <View style={styles.filtersRow}>
            {filters.map((item) => {
              const active = selectedFilter === item;

              return (
                <TouchableOpacity
                  activeOpacity={1}
                  key={item}
                  style={[
                    styles.filterButton,
                    active && styles.activeFilterButton,
                  ]}
                  onPress={() => setSelectedFilter(item)}
                >
                  <Text
                    style={[
                      styles.filterText,
                      active && styles.activeFilterText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 17,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    margin: 5,
    marginBottom: 0,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  infoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 7,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginTop: 5,
  },

  actions: {
    flexDirection: "row",
    gap: 10,
  },

  //search bar
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 15,
    paddingHorizontal: 14,
    height: 40,
    width: "95%",
    marginTop: 10,
    marginLeft: 12,
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },

  //filter
  filtersRow: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 5,
    gap: 6,
    alignItems: "flex-start",
    flexWrap: "wrap",
    marginLeft: 15,
  },

  filterButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#c4c1c1",
    paddingHorizontal: 20,
    height: 35,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  activeFilterButton: {
    backgroundColor: "#000000",
  },

  filterText: {
    color: "#333",
    fontWeight: "500",
    fontSize: 13,
  },

  activeFilterText: {
    color: "#FFF",
  },

  //View Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "#f9fafb70",
  },

  ContainerView: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    margin: 16,
    flex: 1,
  },

  statusRowView: {
    flexDirection: "row",
    alignItems: "center",
  },

  dotView: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#94A3B8",
    marginRight: 8,
  },

  statusView: {
    color: "#64748B",
    fontSize: 13,
  },

  //Remarks + Button
  remarksInput: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    minHeight: 120,
    textAlignVertical: "top",
    padding: 16,
  },

  doneButton: {
    marginTop: 18,
    marginBottom: 40,
    height: 40,
    borderRadius: 15,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  doneText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 5,
  },

  //Status + Priority
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: "#1D9BF0",
    marginRight: 8,
  },

  statusText: {
    color: "#475569",
    fontSize: 12,
  },

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

  //title
  titleView: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginTop: 12,
  },

  description: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
    lineHeight: 15,
  },

  //Description
  descriptionCard: {
    marginTop: 5,
    color: "#64748B",
    fontSize: 13,
    lineHeight: 22,
  },

  //Location
  mapContainer: {
    height: 200,
    borderRadius: 24,
    backgroundColor: "#EEF2F7",
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  locationPin: {
    width: 32,
    height: 32,
    borderRadius: 22,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },

  remoteBadge: {
    position: "absolute",
    bottom: 16,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },

  remoteText: {
    marginLeft: 2,
    color: "#374151",
    fontSize: 13,
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 18,
  },

  infoText: {
    marginLeft: 5,
    color: "#64748B",
    fontSize: 13,
  },

  //Consumer Details
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  consumerCard: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  //Avatar + Button
  footer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  avatar: {
    borderRadius: 17,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: "#E8EEF9",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
  },

  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },

  // Modal Consumer Info
  iconCircle: {
    width: 35,
    height: 35,
    borderRadius: 24,
    backgroundColor: "#E8EEF9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  detailTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  detailSubtitle: {
    color: "#6B7280",
    marginTop: 1,
    fontSize: 12,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 17,
  },
});
