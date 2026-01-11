import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Task } from '../types/Task';
import { colors, spacing, fontSize, borderRadius } from '../styles/colors';

interface TaskFormProps {
  onSubmit: (title: string, description: string) => void;
  initialTask?: Task;
  isEditing?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  initialTask,
  isEditing = false,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
    }
  }, [initialTask]);

  const handleSubmit = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    onSubmit(title.trim(), description.trim());
    setTitle('');
    setDescription('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Task Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter task title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor={colors.gray}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter task description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          placeholderTextColor={colors.gray}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={[styles.submitButton, !title.trim() && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={!title.trim()}
        >
          <Text style={styles.submitButtonText}>
            {isEditing ? 'Update Task' : 'Add Task'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  form: {
    padding: spacing.lg,
  },
  label: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.black,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: fontSize.md,
    backgroundColor: colors.white,
    color: colors.black,
  },
  textArea: {
    height: 100,
    paddingTop: spacing.md,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  submitButtonDisabled: {
    backgroundColor: colors.lightGray,
    opacity: 0.6,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
});
