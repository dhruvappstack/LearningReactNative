import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTaskContext } from '../context/TaskContext';
import { TaskForm } from '../components/TaskForm';
import { RootStackParamList } from './TaskListScreen';
import { colors } from '../styles/colors';

type AddTaskScreenProps = NativeStackScreenProps<RootStackParamList, 'AddTask'>;

export const AddTaskScreen: React.FC<AddTaskScreenProps> = ({ navigation }) => {
  const { addTask } = useTaskContext();

  const handleSubmit = (title: string, description: string) => {
    addTask({
      title,
      description,
      completed: false,
    });

    Alert.alert('Success', 'Task added successfully!', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TaskForm onSubmit={handleSubmit} isEditing={false} />
      </KeyboardAvoidingView>
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
});
