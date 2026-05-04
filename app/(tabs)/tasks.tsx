import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, ListRenderItem, Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";

type ItemType = {
  id: string;
  title: string;
  date: string;
  priority: string;
  status: string;
};

const sampleItems: ItemType[] = [
  { id: "1", title: "New user registered", date: "2026-04-22", priority: "High", status: "In Progress" },
  { id: "2", title: "Order placed", date: "2026-04-25", priority: "High", status: "Done" },
  { id: "3", title: "Payment received", date: "2026-04-29", priority: "High", status: "In Progress" },
  { id: "4", title: "Server alert resolved", date: "2026-04-23", priority: "Medium", status: "Todo" },
  { id: "5", title: "New user registered", date: "2026-04-22", priority: "Low", status: "In Progress" },
  { id: "6", title: "Order placed", date: "2026-04-25", priority: "High", status: "In Progress" },
  { id: "7", title: "Payment received", date: "2026-04-29", priority: "High", status: "Done" },
  { id: "8", title: "Server alert resolved", date: "2026-04-23", priority: "Medium", status: "Done" },
  { id: "9", title: "Order placed", date: "2026-04-22", priority: "Low", status: "In Progress" },
  { id: "10", title: "Payment received", date: "2026-04-25", priority: "High", status: "Todo" }
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
  const [CardModalVisible, setCardModalVisible] = useState(false);

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
            <Text style={styles.title}>{item.title}</Text>
            <View style={[styles.priorityTag, { backgroundColor: priorityColors[item.priority as keyof typeof priorityColors] || '#888' }]}>
              <Text style={styles.priorityText}>{item.priority}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.date}> | </Text>
            <Text style={styles.date}> Address </Text>
          </View>
          <Text style={styles.status}>{item.status}</Text>
        </View>

        {/* Buttons */}
        <View style={styles.actions}>
          <TouchableHighlight underlayColor="#cecece" onPress={() => console.log('View Item')} style={styles.button}>
            <Ionicons name="create" size={18} color="black" />
          </TouchableHighlight>

          {/* Location Button -> Modal */}
          <TouchableHighlight underlayColor="#cecece" onPress={() => setCardModalVisible(true)} style={styles.button}>
            <Ionicons name="location" size={18} color="black" />
          </TouchableHighlight>

          <TouchableHighlight underlayColor="#cecece" onPress={() => console.log('Delete')} style={styles.button}>
            <Ionicons name="trash" size={18} color="black" />
          </TouchableHighlight>
        </View>

        {/* Card Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={CardModalVisible}
          onRequestClose={() => setCardModalVisible(false)} // Android back button
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Map</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setCardModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
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

    //Dropdown + Add button  

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
    paddingVertical: 2,
    borderRadius: 12,
  },
  priorityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    padding: 5,
  },
  status: {
    fontSize: 12,
    color: '#888',
    marginLeft: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  button: {
    marginLeft: 5,
    padding: 5,
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

  //Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
