import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, ListRenderItem, Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";

type ItemType = {
  id: string;
  acctno: string | number;
  acctname: string;
  contact: string | number;
  address: string;
  request: string;
  date: string;
  priority: string;
  status: string;
};

const sampleItems: ItemType[] = [
  { id: "1", acctno: "024458", acctname: "John Cruz", contact: "09171234567", address: "12 Sampaguita St, Angeles City", request: "Reconnection", date: "2026-04-22", priority: "High", status: "In Progress" },
  { id: "2", acctno: "023158", acctname: "Maria Santos", contact: "09987654321", address: "90 National Highway, Bataan", request: "Disconnection", date: "2026-04-25", priority: "High", status: "Done" },
  { id: "3", acctno: "022358", acctname: "Kevin Reyes", contact: "09223334444", address: "78 Kalaklan Rd, Zambales", request: "Check wiring", date: "2026-04-29", priority: "High", status: "In Progress" },
  { id: "4", acctno: "026258", acctname: "Angela Dizon", contact: "09175556666", address: "45 Gordon Ave, Subic", request: "Reconnection", date: "2026-04-23", priority: "Medium", status: "Todo" },
  { id: "5", acctno: "023458", acctname: "Mark Flores", contact: "09334445555", address: "123 Rizal St, Olongapo City", request: "Relocation", date: "2026-04-22", priority: "Low", status: "In Progress" },
];

const priorityColors = {
  High: '#FF4D4D',
  Medium: '#FFA500',
  Low: '#00a300',
};

// remove duplicate values - dropdown
// const uniqueData = Array.from(
// new Map(sampleItems.map(item => [item.priority, item])).values()
//);

export default function Tasks() {

  const [LocModalVisible, setLocModalVisible] = useState(false);
  const [InfoModalVisible, setInfoModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState<ItemType | null>(null);

  // on press info
  const openInfoModal = (item: ItemType) => {
    setSelectedCard(item);
    setInfoModalVisible(true);
  };

  // on press loc 
  const openLocModal = (item: ItemType) => {
    setSelectedCard(item);
    setLocModalVisible(true);
  };

  // Get screen width
  // const screenWidth = Dimensions.get('window').width;
  // Optional: limit max width for large screens (web/tablet)
  // const cardWidth = Math.min(screenWidth * 0.9, 500); // 90% of screen or max 500px

  const renderItem: ListRenderItem<ItemType> = ({ item }) => (

    <View style={styles.container}>

      {/* Cards */}
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{item.request}</Text>
            <View style={[styles.priorityTag, { backgroundColor: priorityColors[item.priority as keyof typeof priorityColors] || '#888' }]}>
              <Text style={styles.priorityText}>{item.priority}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.date}> | </Text>
            <Text style={styles.date}>{item.status}</Text>
          </View>
          <Text style={styles.status}>{item.address}</Text>

        </View>

        {/* Buttons */}
        <View style={styles.actions}>
          <TouchableHighlight underlayColor="#cecece" onPress={() => openInfoModal(item)} style={styles.button}>
            <Ionicons name="eye" size={20} color="black" />
          </TouchableHighlight>

          {/* Location Button -> Modal */}
          <TouchableHighlight underlayColor="#cecece" onPress={() => openLocModal(item)} style={styles.button}>
            <Ionicons name="location-sharp" size={20} color="black" />
          </TouchableHighlight>

          {/* <TouchableHighlight underlayColor="#cecece" onPress={() => console.log('Delete')} style={styles.button}>
            <Ionicons name="trash" size={18} color="black" />
          </TouchableHighlight>  */}
        </View>

        {/* Map Modal */}
        <Modal
          visible={LocModalVisible}
          animationType="fade"
          transparent={true}
          hardwareAccelerated
          onRequestClose={() => setLocModalVisible(false)}
        >
          <View style={styles.MapModalOverlay}>
            <View style={styles.MapModalContent}>

              {/* Floating close button */}
              <TouchableOpacity style={styles.closeInfoButton} onPress={() => setLocModalVisible(false)}>
                <Text style={styles.closeInfoText}>✕</Text>
              </TouchableOpacity>

              <Text style={styles.InfoModaltitle}>Map Details</Text>

              {selectedCard && (
                <>
                  {/* Non-editable fields */}
                  <Text style={styles.InfoModalLabel}>{selectedCard.acctno} | {selectedCard.acctname}</Text>
                  <Text style={styles.InfoModalLabel}>{selectedCard.address}</Text>

                  <View style={styles.InfoModalField}>
                    <Text style={styles.InfoModalValue}></Text>
                  </View>

                </>
              )}

            </View>
          </View>
        </Modal>

        {/* Info Modal */}
        <Modal
          visible={InfoModalVisible}
          animationType="fade"
          transparent={true}
          hardwareAccelerated
          onRequestClose={() => setInfoModalVisible(false)}
        >
          <View style={styles.InfoModalOverlay}>
            <View style={styles.InfoModalContent}>

              {/* Floating close button */}
              <TouchableOpacity style={styles.closeInfoButton} onPress={() => setInfoModalVisible(false)}>
                <Text style={styles.closeInfoText}>✕</Text>
              </TouchableOpacity>

              <Text style={styles.InfoModaltitle}>Task Details</Text>

              {selectedCard && (
                <>
                  {/* Non-editable fields */}
                  <Text style={styles.InfoModalLabel}>Account No.</Text>
                  <View style={styles.InfoModalField}>
                    <Text style={styles.InfoModalValue}>{selectedCard.acctno}</Text>
                  </View>

                  <Text style={styles.InfoModalLabel}>Consumer</Text>
                  <View style={styles.InfoModalField}>
                    <Text style={styles.InfoModalValue}>
                      {selectedCard.acctname}
                    </Text>
                  </View>

                  <Text style={styles.InfoModalLabel}>Address</Text>
                  <View style={styles.InfoModalField}>
                    <Text style={styles.InfoModalValue}>{selectedCard.address}</Text>
                  </View>

                  {/* Mobile */}
                  <Text style={styles.InfoModalLabel}>Contact No.</Text>
                  <View style={styles.InfoModalField}>
                    <Text style={styles.InfoModalValue}>{selectedCard.contact}</Text>
                  </View>

                  {/* Request */}
                  <Text style={styles.InfoModalLabel}>Request / Complains</Text>
                  <View style={styles.InfoModalField}>
                    <Text style={styles.InfoModalValue}>{selectedCard.request}</Text>
                  </View>

                  {/* Date */}
                  <Text style={styles.InfoModalLabel}>Date Created</Text>
                  <View style={styles.InfoModalField}>
                    <Text style={styles.InfoModalValue}>{selectedCard.date}</Text>
                  </View>

                  {/* Priority Tag */}
                  <Text style={styles.InfoModalLabel}>Priority</Text>
                  <View style={[styles.InfoPriorityContainer, { backgroundColor: priorityColors[selectedCard.priority as keyof typeof priorityColors] || '#888' }]}>
                    <Text style={styles.priorityText}>{selectedCard.priority}</Text>
                  </View>

                  {/* Bottom Buttons */}
                  <TouchableOpacity
                    style={styles.InfoSaveButton} onPress={() => { setInfoModalVisible(false); console.log("Done ID:", selectedCard.id); }}
                  >
                    <Text style={styles.InfoCloseButtonText}>Mark as Done</Text>
                  </TouchableOpacity>
                </>
              )}

            </View>
          </View>
        </Modal>

      </View>
    </View>
  )

  return (
    <FlatList
      data={sampleItems}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}

    // Dropdown + Add button  

    // ListHeaderComponent={
    // <View className="flex-row items-center" style={styles.containertop}>
    // <View className="flex-1 border border-gray-300" style={styles.dropdown}>
    //   <Picker>
    //     {uniqueData.map((item) => (
    //     <Picker.Item
    //       key={item.id}
    //       label={item.priority}
    //       value={item.priority}
    //     />
    //   ))}
    //   </Picker>
    // </View>

    //   <TouchableOpacity onPress={() => console.log('add')} style={styles.button}>
    //   <Ionicons name="add" size={20} color="black" />
    //   </TouchableOpacity>
    // </View>       
    // }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    marginTop: 2,
  },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 3,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoRow: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  priorityTag: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 5,
  },
  priorityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#888',
    padding: 3,
  },
  status: {
    fontSize: 12,
    color: '#888',
    marginLeft: 3,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginLeft: 5,
    padding: 7,
    borderWidth: 1,
    borderColor: '#919191',
    borderRadius: 6,
  },
  dropdown: {
    marginLeft: 10,
    maxWidth: 200,
    margin: 5,
  },
  containertop: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  clickableText: {
    fontSize: 12,
    color: 'blue',
    textDecorationLine: 'underline',
  },

  //Info Modal
  InfoModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  InfoModalContent: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },

  InfoModaltitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  closeInfoButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },

  closeInfoText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "700",
  },

  InfoModalField: {
    marginBottom: 10,
    backgroundColor: "#f4f4f4",
    borderRadius: 8,
    padding: 8,
  },

  InfoModalLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },

  InfoModalValue: {
    fontSize: 14,
    color: "#111",
    fontWeight: "500",
  },

  InfoStatusContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#ff4d4f",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginBottom: 25,
  },

  InfoStatusText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

  InfoPriorityContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#ff4d4f",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 25,
  },

  InfopriorityText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

  InfoCloseButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  InfoCloseButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  InfoSaveButton: {
    backgroundColor: '#008b3a',
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  InfoSaveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  //Map Modal
  MapModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  MapModalContent: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  MapModalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  MapCloseButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  MapCloseButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
