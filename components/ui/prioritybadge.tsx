import { StyleSheet, Text, View } from 'react-native';

//Priority Badge
export const priorityColors = {
  1: {
    label: "HIGH",
    bg: "#FEE2E2",
    text: "#EF4444",
  },

  2: {
    label: "MEDIUM",
    bg: "#FEF3C7",
    text: "#D97706",
  },

  3: {
    label: "LOW",
    bg: "#DCFCE7",
    text: "#16A34A",
  },
};

  //Priority
  export const PriorityBadge = ({ priority }: { priority: number }) => (
    <View style={[styles.priorityBadge, { backgroundColor: priorityColors[priority as keyof typeof priorityColors].bg || '#888' }]}>
      <Text style={[styles.priorityText, { color: priorityColors[priority as keyof typeof priorityColors].text || '#888' }]}> {priorityColors[Number(priority) as keyof typeof priorityColors]?.label}</Text>
    </View>
  );

  const styles = StyleSheet.create({
  priorityBadge: {
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

})