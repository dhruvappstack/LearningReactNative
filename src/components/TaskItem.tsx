import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Task } from '../types/Task';
import { useTaskContext } from '../context/TaskContext';
import { colors, spacing, fontSize, borderRadius } from '../styles/colors';

interface TaskItemProps {
  task: Task;
  onPress: (taskId: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onPress }) => {
  const { deleteTask, updateTask } = useTaskContext();

  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Delete',
        onPress: () => deleteTask(task.id),
        style: 'destructive',
      },
    ]);
  };

  const handleToggleComplete = () => {
    updateTask(task.id, { completed: !task.completed });
  };

  return (
    <TouchableOpacity
      style={[styles.container, task.completed && styles.completedContainer]}
      onPress={() => onPress(task.id)}
    >
      <TouchableOpacity
        style={styles.checkbox}
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

      <View style={styles.content}>
        <Text
          style={[styles.title, task.completed && styles.completedTitle]}
          numberOfLines={1}
        >
          {task.title}
        </Text>
        <Text
          style={[styles.description, task.completed && styles.completedDescription]}
          numberOfLines={2}
        >
          {task.description}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
      >
        <Text style={styles.deleteButtonText}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    marginVertical: spacing.xs,
    marginHorizontal: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  completedContainer: {
    backgroundColor: colors.lightGray,
  },
  checkbox: {
    marginRight: spacing.md,
    padding: spacing.sm,
  },
  checkboxInner: {
    width: 24,
    height: 24,
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
    fontSize: fontSize.md,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.black,
    marginBottom: spacing.xs,
  },
  completedTitle: {
    color: colors.gray,
    textDecorationLine: 'line-through',
  },
  description: {
    fontSize: fontSize.sm,
    color: colors.darkGray,
  },
  completedDescription: {
    color: colors.gray,
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    padding: spacing.sm,
    marginLeft: spacing.md,
  },
  deleteButtonText: {
    fontSize: fontSize.lg,
    color: colors.danger,
    fontWeight: 'bold',
  },
});
