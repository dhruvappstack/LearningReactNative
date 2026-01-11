import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTaskContext } from '../context/TaskContext';
import { RootStackParamList } from './TaskListScreen';
import { colors, spacing, fontSize, borderRadius } from '../styles/colors';

type TaskDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'TaskDetail'>;

export const TaskDetailScreen: React.FC<TaskDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { taskId } = route.params;
  const { getTaskById, deleteTask, updateTask } = useTaskContext();

  const task = getTaskById(taskId);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            Alert.alert('Delete Task', 'Are you sure?', [
              { text: 'Cancel' },
              {
                text: 'Delete',
                onPress: () => {
                  deleteTask(taskId);
                  navigation.goBack();
                },
                style: 'destructive',
              },
            ]);
          }}
        >
          <Text style={styles.headerButtonText}>Delete</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, taskId]);

  if (!task) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.errorText}>Task not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleToggleComplete = () => {
    updateTask(taskId, { completed: !task.completed });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Status Card */}
        <View
          style={[
            styles.statusCard,
            task.completed && styles.statusCardCompleted,
          ]}
        >
          <TouchableOpacity
            style={styles.statusCheckbox}
            onPress={handleToggleComplete}
          >
            <View
              style={[
                styles.checkboxInner,
                task.completed && styles.checkboxChecked,
              ]}
            >
              {task.completed && <Text style={styles.checkmark}>✓</Text>}
            </View>
          </TouchableOpacity>
          <Text style={styles.statusText}>
            {task.completed ? 'Completed' : 'Pending'}
          </Text>
        </View>

        {/* Title Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Title</Text>
          <Text
            style={[
              styles.sectionContent,
              task.completed && styles.completedText,
            ]}
          >
            {task.title}
          </Text>
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Description</Text>
          <Text
            style={[
              styles.descriptionContent,
              task.completed && styles.completedText,
            ]}
          >
            {task.description || 'No description'}
          </Text>
        </View>

        {/* Metadata Section */}
        <View style={styles.section}>
          <View style={styles.metadataRow}>
            <View style={styles.metadataItem}>
              <Text style={styles.metadataLabel}>Created</Text>
              <Text style={styles.metadataValue}>
                {new Date(task.createdAt).toLocaleDateString()} at{' '}
                {new Date(task.createdAt).toLocaleTimeString()}
              </Text>
            </View>
          </View>
          <View style={styles.metadataRow}>
            <View style={styles.metadataItem}>
              <Text style={styles.metadataLabel}>Last Updated</Text>
              <Text style={styles.metadataValue}>
                {new Date(task.updatedAt).toLocaleDateString()} at{' '}
                {new Date(task.updatedAt).toLocaleTimeString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Edit Button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('AddTask')}
        >
          <Text style={styles.editButtonText}>Edit Task</Text>
        </TouchableOpacity>
      </ScrollView>
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
    padding: spacing.lg,
  },
  headerButton: {
    paddingHorizontal: spacing.md,
  },
  headerButtonText: {
    color: colors.danger,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  statusCardCompleted: {
    borderLeftColor: colors.success,
  },
  statusCheckbox: {
    marginRight: spacing.md,
  },
  checkboxInner: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.sm,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
  },
  checkmark: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.black,
  },
  section: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.gray,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  sectionContent: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.black,
  },
  descriptionContent: {
    fontSize: fontSize.md,
    color: colors.darkGray,
    lineHeight: fontSize.md * 1.5,
  },
  completedText: {
    color: colors.gray,
    textDecorationLine: 'line-through',
  },
  metadataRow: {
    marginBottom: spacing.md,
  },
  metadataItem: {
    marginBottom: spacing.md,
  },
  metadataLabel: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.gray,
    marginBottom: spacing.xs,
  },
  metadataValue: {
    fontSize: fontSize.sm,
    color: colors.darkGray,
  },
  editButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  editButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  errorText: {
    fontSize: fontSize.lg,
    color: colors.danger,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
});
