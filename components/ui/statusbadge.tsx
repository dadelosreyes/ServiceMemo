import { StyleSheet, Text, View } from 'react-native';

//set dashboard task overview card 
export const statuscolors = {
  NEW: { icon: 'add-circle-outline', color: '#3B82F6' },
  "RE-ENDORSED": { icon: 'chatbubbles-outline', color: '#8B5CF6' },
  ACCOMPLISHED: { icon: 'checkmark-circle-outline', color: '#10B981' },
  PENDING: { icon: 'time-outline', color: '#F97316' },
};

  //badge
  export const StatusBadge = ({ serviceMemoStatus }: { serviceMemoStatus: string }) => (
    <View style={[styles.statusBadge, { backgroundColor: statuscolors[serviceMemoStatus as keyof typeof statuscolors]?.color || '#888' }]}>
      <Text style={styles.statusText}>{serviceMemoStatus}</Text>
    </View>
  );

  const styles = StyleSheet.create({
  //Status + Priority
  statusBadge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },

  statusText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
  },

})


