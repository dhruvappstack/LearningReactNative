# Copilot Instructions for TodoApp Project

> **For LLM Assistants**: This document provides guidelines for making modifications to the React Native TodoApp (v0.83.1). Follow these instructions to ensure safe, efficient, and consistent changes to the codebase.

---

## 1. PROJECT OVERVIEW

**Project Name:** TodoApp  
**Framework:** React Native 0.83.1  
**Language:** TypeScript  
**Package Manager:** npm  
**Platforms:** iOS & Android  
**State Management:** React Context API + AsyncStorage  
**Navigation:** React Navigation (Native Stack)

### Key Features
- ✅ Create, read, update, delete (CRUD) tasks
- ✅ Task list view with completion status
- ✅ Detailed task view with metadata
- ✅ Persistent storage using AsyncStorage
- ✅ Type-safe with full TypeScript support

---

## 2. DIRECTORY STRUCTURE

```
TodoApp/
├── src/
│   ├── types/
│   │   └── Task.ts                    # Task interface & context types
│   ├── context/
│   │   └── TaskContext.tsx            # Global state (tasks CRUD)
│   ├── screens/
│   │   ├── TaskListScreen.tsx         # Main task list view
│   │   ├── TaskDetailScreen.tsx       # Task details & editing
│   │   └── AddTaskScreen.tsx          # Add new task form
│   ├── components/
│   │   ├── TaskItem.tsx               # Task list item component
│   │   └── TaskForm.tsx               # Reusable form component
│   └── styles/
│       └── colors.ts                  # Theme, spacing, sizing
├── android/                           # Android native code
├── ios/                               # iOS native code
├── App.tsx                            # Main app entry point
├── index.js                           # React Native entry point
├── package.json                       # Dependencies
├── tsconfig.json                      # TypeScript config
├── babel.config.js                    # Babel config
└── metro.config.js                    # Metro bundler config
```

---

## 3. BEFORE MAKING CHANGES

### Step 1: Understand the Current State
- Always read the relevant file before modifying
- Check the existing implementation patterns
- Understand the file's dependencies and relationships

### Step 2: Plan the Changes
- Identify which files need modification
- List all files that will be created or edited
- Check for potential impact on other components

### Step 3: Verify Requirements
- Ask the user: **"Is this the change you want me to implement?"**
- Confirm all file paths and changes
- Get approval before proceeding

---

## 4. MODIFICATION GUIDELINES

### 4.1 When Modifying TypeScript/React Files

**DO:**
- ✅ Use TypeScript interfaces for type safety
- ✅ Follow the existing code style and patterns
- ✅ Import from relative paths (`../` pattern)
- ✅ Use named exports for components
- ✅ Add JSDoc comments for complex logic
- ✅ Maintain consistent indentation (2 spaces)
- ✅ Use `StyleSheet.create()` for all styles
- ✅ Handle error states and edge cases

**DON'T:**
- ❌ Use `any` type unless absolutely necessary
- ❌ Create inline styles (use StyleSheet.create)
- ❌ Mix absolute and relative imports
- ❌ Use default exports for components (use named exports)
- ❌ Forget to export new components
- ❌ Create unused imports

### 4.2 When Adding New Components

**Required Pattern:**
```typescript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '../styles/colors';

interface ComponentProps {
  // Define all props
}

export const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  return (
    <View style={styles.container}>
      {/* Component JSX */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // styles
  },
});
```

### 4.3 When Adding New Context/State

**Follow the TaskContext pattern:**
- Create types in `src/types/`
- Implement context in `src/context/`
- Export both the context and custom hook
- Always handle AsyncStorage operations

### 4.4 When Adding New Screens

**Required Pattern:**
- Create in `src/screens/`
- Add TypeScript props from `RootStackParamList`
- Use `NativeStackScreenProps` for navigation
- Export all screen types
- Register in `App.tsx` Stack.Navigator

---

## 5. FILE MODIFICATION WORKFLOW

### Step 1: Identify Files to Change
```bash
# List relevant files
# Example: "I need to modify TaskContext.tsx and TaskListScreen.tsx"
```

### Step 2: Read Existing Content
- Use read_file tool to understand current implementation
- Check imports, exports, and dependencies

### Step 3: Plan Changes
- Write clear explanation of what will change
- Show before/after code conceptually

### Step 4: Execute Changes
- Use `multi_replace_string_in_file` for multiple edits
- Include 3-5 lines of context before/after changes
- Match exact whitespace and indentation

### Step 5: Validate
- Check for TypeScript errors
- Verify imports are correct
- Ensure no broken references

---

## 6. DEPENDENCY MANAGEMENT

### Current Dependencies
```json
{
  "react-native": "0.83.1",
  "@react-navigation/native": "^6.x",
  "@react-navigation/native-stack": "^6.x",
  "react-native-screens": "^3.x",
  "react-native-safe-area-context": "^4.x",
  "@react-native-async-storage/async-storage": "^1.x"
}
```

### Before Adding New Packages
**ALWAYS ASK THE USER:**
```
"I need to install '@package-name' to implement this feature. Should I proceed?"
```

### Installation Command
```bash
cd /Users/dhruvnarayansingh/Desktop/LearningReactNative/TodoApp
npm install package-name --save
```

---

## 7. TESTING & VALIDATION

### After Making Changes

**Run Metro Bundler:**
```bash
cd /Users/dhruvnarayansingh/Desktop/LearningReactNative/TodoApp
npm start
```

**Test on iOS (macOS only):**
```bash
npm run ios
```

**Test on Android:**
```bash
npx react-native run-android
```

**Build Debug APK:**
```bash
cd android && ./gradlew assembleDebug && cd ..
```

### Validation Checklist
- [ ] No TypeScript errors
- [ ] All imports resolve correctly
- [ ] No console warnings (except expected React Native warnings)
- [ ] App compiles successfully
- [ ] Feature works as intended
- [ ] No broken navigation
- [ ] AsyncStorage operations work correctly

---

## 8. CODE PATTERNS & CONVENTIONS

### Pattern 1: Using TaskContext Hook
```typescript
import { useTaskContext } from '../context/TaskContext';

export const MyComponent = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTaskContext();
  // Use context methods
};
```

### Pattern 2: Screen Navigation
```typescript
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './TaskListScreen';

type MyScreenProps = NativeStackScreenProps<RootStackParamList, 'ScreenName'>;

export const MyScreen: React.FC<MyScreenProps> = ({ navigation, route }) => {
  // navigation.navigate('ScreenName', { params })
};
```

### Pattern 3: Styling
```typescript
import { colors, spacing, fontSize, borderRadius } from '../styles/colors';

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
  },
});
```

### Pattern 4: Error Handling
```typescript
try {
  // operation
} catch (error) {
  console.error('Operation failed:', error);
  Alert.alert('Error', 'User-friendly error message');
}
```

---

## 9. SAFE MODIFICATION CHECKLIST

Before committing changes, verify:

- [ ] **Type Safety**: All TypeScript types are correct
- [ ] **Imports**: All imports are valid and used
- [ ] **Exports**: New components/functions are exported
- [ ] **Navigation**: All routes are registered in App.tsx
- [ ] **Context**: Context methods are properly used
- [ ] **Styling**: All styles use the theme (colors, spacing)
- [ ] **No Unused**: No unused imports or variables
- [ ] **Error Handling**: Error cases are handled
- [ ] **Comments**: Complex logic has JSDoc comments
- [ ] **Testing**: Feature has been tested on device/emulator

---

## 10. COMMON MODIFICATION SCENARIOS

### Scenario 1: Adding a New Feature
1. Create new types in `src/types/`
2. Update context in `src/context/TaskContext.tsx`
3. Create new screen/component in appropriate folder
4. Register screen in `App.tsx`
5. Test on emulator/device

### Scenario 2: Modifying Styling
1. Update `src/styles/colors.ts` (if adding new theme values)
2. Update component StyleSheet.create() with new styles
3. Use theme constants from colors.ts
4. Test on both iOS and Android

### Scenario 3: Changing Navigation Flow
1. Update `RootStackParamList` in `TaskListScreen.tsx`
2. Add/modify screens in `App.tsx` Stack.Navigator
3. Update navigation.navigate() calls
4. Test all navigation paths

### Scenario 4: Modifying Context State
1. Update types in `src/types/Task.ts`
2. Update context implementation in `src/context/TaskContext.tsx`
3. Update components using the context
4. Test state persistence with AsyncStorage

---

## 11. LLM RESPONSE FORMAT

When making modifications, always:

1. **Acknowledge** the change request
2. **Plan** what files will be modified
3. **Confirm** with the user before proceeding
4. **Execute** the changes
5. **Validate** the implementation
6. **Provide** next steps or testing instructions

### Example Response Format:
```
I'll help you [describe change]. Here's the plan:

Files to modify:
- src/screens/TaskListScreen.tsx (update header)
- src/components/TaskItem.tsx (add new button)

Confirm? [Yes/No]

[After confirmation]
Making changes...
✓ Modified src/screens/TaskListScreen.tsx
✓ Modified src/components/TaskItem.tsx

Testing: Run `npm start` then test the [feature] on your device.
```

---

## 12. ROLLBACK PROCEDURE

If changes cause errors:

1. **Stop Metro Bundler** (Ctrl+C)
2. **Identify** the problematic file
3. **Review** the changes made
4. **Revert** using git or re-edit the file
5. **Clear Cache**:
   ```bash
   npm start -- --reset-cache
   ```
6. **Retry** the change

---

## 13. IMPORTANT NOTES

- **Always** test changes on both iOS and Android if possible
- **Never** delete existing functionality without user approval
- **Always** maintain TypeScript type safety
- **Always** use the theme colors/spacing (don't hardcode values)
- **Always** handle errors gracefully
- **Always** preserve existing functionality
- **AsyncStorage** operations are asynchronous - handle appropriately
- **Navigation** params must be typed correctly
- **Context API** requires proper Provider wrapping
- **Screens** must use SafeAreaView for notch/status bar handling

---

## 14. QUICK REFERENCE

### Most Used Commands
```bash
# Start development
npm start

# Run on iOS
npm run ios

# Run on Android
npx react-native run-android

# Build debug APK
cd android && ./gradlew assembleDebug && cd ..

# Clear cache
npm start -- --reset-cache

# Install dependencies
npm install package-name --save
```

### File Shortcuts
- **Types**: `src/types/Task.ts`
- **Context**: `src/context/TaskContext.tsx`
- **Main Screen**: `src/screens/TaskListScreen.tsx`
- **Styles**: `src/styles/colors.ts`
- **App Entry**: `App.tsx`

---

## 15. GETTING HELP

If unsure about:
- **File structure**: Refer to Section 2
- **Code patterns**: Refer to Section 8
- **Styling**: Check `src/styles/colors.ts`
- **Navigation**: Check `App.tsx`
- **State Management**: Check `src/context/TaskContext.tsx`

---

**Last Updated:** January 11, 2026  
**React Native Version:** 0.83.1  
**For:** LLM Assistants & Developers
