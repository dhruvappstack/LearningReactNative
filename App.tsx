/**
 * TODO App - React Native 0.83
 * A complete task management application with add, edit, delete, and view functionality
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { TaskProvider } from './src/context/TaskContext';
import { TaskListScreen, RootStackParamList } from './src/screens/TaskListScreen';
import { TaskDetailScreen } from './src/screens/TaskDetailScreen';
import { AddTaskScreen } from './src/screens/AddTaskScreen';
import { colors, fontSize } from './src/styles/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

function TaskNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: fontSize.lg,
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="TaskList"
        component={TaskListScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TaskDetail"
        component={TaskDetailScreen}
        options={{
          title: 'Task Details',
        }}
      />
      <Stack.Screen
        name="AddTask"
        component={AddTaskScreen}
        options={{
          title: 'Add New Task',
        }}
      />
    </Stack.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <TaskProvider>
        <NavigationContainer>
          <TaskNavigator />
        </NavigationContainer>
      </TaskProvider>
    </SafeAreaProvider>
  );
}

export default App;
