import { Ionicons } from '@expo/vector-icons';
import dayjs from "dayjs";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

//components
import { PriorityBadge } from "@/components/ui/prioritybadge";
import { statuscolors } from "@/components/ui/statusbadge";

// pull data from API
import { useRefreshContext } from '@/contexts/refreshcontext';
import { fetchTasks } from "@/scripts/api";
import React, { useCallback, useEffect, useState } from "react";

//navigation
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const router = useRouter();

  //pull data from API
  const { registerRefresh } = useRefreshContext(); 0
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

  // Count Tasks - Progress Chart
  const totalTasks = SMS.length;

  const finishedTasks = SMS.filter(
    task => task.serviceMemoStatus === 'ACCOMPLISHED'
  ).length;

  const unfinishedTasks = totalTasks - finishedTasks;

  const completionPercentage =
    totalTasks > 0
      ? Math.round((finishedTasks / totalTasks) * 100)
      : 0;

  //count all status from api -- card
  const statusCounts = SMS.reduce((acc, SMS) => {
    const status = SMS.serviceMemoStatus;

    acc[status] = (acc[status] || 0) + 1;

    return acc;
  }, {});

  //add undefined statuscolor
  const isKnownStatus = (status: string): status is keyof typeof statuscolors => {
    return status in statuscolors;
  };

  const tasks = Object.entries(statusCounts).map(([status, count]) => {
    const colorInfo = isKnownStatus(status) ? statuscolors[status] : undefined;

    return {
      title: status,
      value: count,
      icon: colorInfo?.icon || 'help-circle-outline',
      color: colorInfo?.color || '#6B7280',
    };
  });

  //priority tasks (High) - counter badge
  const priorityTasks = SMS.filter(
    task => task.priority === 1 && task.serviceMemoStatus !== "ACCOMPLISHED"
  ).length;

  //Time-based greeting
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? 'Good Morning ☀️'
      : hour < 18
        ? 'Good Afternoon 🌤️'

        : 'Good Evening 🌙';

  return (
    <SafeAreaView edges={[]} style={styles.container}>

      {/* Header - User Greeting */}

      <View style={styles.header}>

        <View style={styles.headerTextContainer}>
          <Text style={styles.greeting}>
            {greeting}
          </Text>

          <Text style={styles.subtitle}>
            Here's a snapshot of what's on your plate today.
          </Text>
        </View>

        <View style={styles.priorityNo}>
          <Ionicons
            name="warning"
            size={20}
            color="#EF4444"
          />

          <Text style={styles.priorityCount}>
            {priorityTasks}
          </Text>
        </View>

      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>

        {/* task progress */}
        <View style={styles.section}>
          <View style={styles.progressCard}>

            <View style={styles.progressContent}>

              <View style={styles.circle}>
                <Text style={styles.percentText}>
                  {completionPercentage}%
                </Text>
                <Text style={styles.percentLabel}>Completed</Text>
              </View>

              <View style={styles.stats}>

                <View style={styles.statRow}>
                  <View style={[styles.dot, { backgroundColor: '#10B981' }]} />
                  <View style={styles.statInfo}>
                    <Text style={styles.statTitle}>Accomplished</Text>
                    <Text style={styles.statCount}>
                      {finishedTasks} Tasks
                    </Text>
                  </View>
                  <Text style={styles.statPercent}>
                    {completionPercentage}%
                  </Text>
                </View>

                <View style={styles.statRow}>
                  <View style={[styles.dot, { backgroundColor: '#E5E7EB' }]} />
                  <View style={styles.statInfo}>
                    <Text style={styles.statTitle}>Unaccomplished</Text>
                    <Text style={styles.statCount}>
                      {unfinishedTasks} Tasks
                    </Text>
                  </View>
                  <Text style={styles.statPercent}>
                    {100 - completionPercentage}%
                  </Text>
                </View>

              </View>

            </View>

          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Task Overview</Text>

          {/* Status Grid */}
          <FlatList
            data={tasks}
            extraData={tasks}
            numColumns={2}
            keyExtractor={item => item.title}
            columnWrapperStyle={styles.row}
            scrollEnabled={false}
            renderItem={({ item }) => (

              <View style={[styles.card, { borderLeftColor: item.color }]}>
                <View style={styles.cardHeader}>

                  <Text style={styles.cardTitle}>
                    {item.title}
                  </Text>

                  <Ionicons
                    name={item.icon as any}
                    size={22}
                    color={item.color}
                  />
                </View>

                <Text style={styles.cardValue}>
                  {String(item.value)}
                </Text>
              </View>
            )}
          />
        </View>

        {/* Upcoming Tasks */}
        <View style={styles.section}>

          <View style={styles.upcoming}>
            <Text style={styles.sectionTitle}>Upcoming Tasks</Text>

            <TouchableOpacity onPress={() => router.navigate('/tasks')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* limit tasks only -- slice(0, 3) */}
          {SMS
            .filter(task => task.serviceMemoStatus !== 'ACCOMPLISHED' && task.priority == 1)
            .sort(
              (a, b) =>
                new Date(b.transDate).getTime() -
                new Date(a.transDate).getTime()
            )
            .map(task => (
              <TouchableOpacity key={task.id} style={styles.upcomingCard}>

                <View style={styles.taskContent}>
                  <Text style={styles.taskTitle}>{task.smsType}</Text>
                  <Text style={styles.taskTime}>{dayjs(task.transDate).format("MMMM DD, YYYY")}</Text>
                  {/* "MMMM DD, YYYY - hh:mm A" */}
                </View>

                <PriorityBadge priority={task.priority} />
              </TouchableOpacity>
            ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#f9f9f9",
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 7,
    marginTop: 70,
  },

  headerTextContainer: {
    flex: 1,
    marginRight: 12,
  },

  greeting: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0F172A',
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },

  priorityNo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  priorityCount: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },

  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderLeftWidth: 4,
    minHeight: 80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },

  cardValue: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
  },

  //Upcoming section
  section: {
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },

  upcomingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 8,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },

  taskContent: {
    flex: 1,
  },

  taskTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },

  taskTime: {
    marginTop: 4,
    fontSize: 13,
    color: '#6B7280',
  },

  // priorityDot: {
  //   width: 10,
  //   height: 10,
  //   borderRadius: 5,
  // },

  upcoming: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  seeAll: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 12,
  },

  //total task
  progressCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginTop: 5,
    marginBottom: 10,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  // progressTitle: {
  //   fontSize: 18,
  //   fontWeight: '700',
  //   color: '#111827',
  //   marginBottom: 20,
  // },

  progressContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  circle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 8,
    borderColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },

  percentText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#10B981',
  },

  percentLabel: {
    fontSize: 12,
    color: '#6B7280',
  },

  stats: {
    flex: 1,
    marginLeft: 20,
  },

  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },

  statInfo: {
    flex: 1,
  },

  statTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },

  statCount: {
    fontSize: 14,
    color: '#6B7280',
  },

  statPercent: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10B981',
  },

});