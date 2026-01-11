import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTaskContext } from '../context/TaskContext';
import { TaskItem } from '../components/TaskItem';
import { colors, spacing, fontSize, borderRadius } from '../styles/colors';

export type RootStackParamList = {
  TaskList: undefined;
  TaskDetail: { taskId: string };
  AddTask: undefined;
};

type TaskListScreenProps = NativeStackScreenProps<RootStackParamList, 'TaskList'>;

export const TaskListScreen: React.FC<TaskListScreenProps> = ({ navigation }) => {
  const { tasks } = useTaskContext();

  const handleTaskPress = (taskId: string) => {
    navigation.navigate('TaskDetail', { taskId });
  };

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>My Tasks</Text>
            <Text style={styles.headerSubtitle}>
              {tasks.length} task{tasks.length !== 1 ? 's' : ''} ({completedCount} completed)
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddTask')}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Task List */}
        {tasks.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No tasks yet</Text>
            <Text style={styles.emptySubtitle}>
              Add your first task to get started
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => navigation.navigate('AddTask')}
            >
              <Text style={styles.emptyButtonText}>Add First Task</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TaskItem task={item} onPress={handleTaskPress} />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.black,
  },
  headerSubtitle: {
    fontSize: fontSize.sm,
    color: colors.gray,
    marginTop: spacing.xs,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  addButtonText: {
    color: colors.white,
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  emptyTitle: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.black,
    marginBottom: spacing.md,
  },
  emptySubtitle: {
    fontSize: fontSize.md,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  emptyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
  },
  emptyButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  listContent: {
    paddingVertical: spacing.md,
  },
});
