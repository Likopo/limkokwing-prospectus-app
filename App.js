import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen       from './src/screens/HomeScreen';
import FacultyScreen    from './src/screens/FacultyScreen';
import CourseDetailScreen from './src/screens/CourseDetailScreen';
import QuizScreen       from './src/screens/QuizScreen';
import { COLORS } from './src/theme';

const Stack = createNativeStackNavigator();
const Tab   = createBottomTabNavigator();

/* ── Home stack (Home → Faculty → CourseDetail) ── */
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.white,
        headerTitleStyle: { fontWeight: '800', fontSize: 16 },
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Limkokwing University' }}
      />
      <Stack.Screen
        name="Faculty"
        component={FacultyScreen}
        options={({ route }) => ({
          title: route.params.faculty.name,
          headerStyle: { backgroundColor: route.params.faculty.color },
        })}
      />
      <Stack.Screen
        name="CourseDetail"
        component={CourseDetailScreen}
        options={({ route }) => ({
          title: '',
          headerStyle: { backgroundColor: route.params.facultyColor },
        })}
      />
    </Stack.Navigator>
  );
}

/* ── Quiz stack ── */
function QuizStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.white,
        headerTitleStyle: { fontWeight: '800' },
      }}>
      <Stack.Screen
        name="QuizMain"
        component={QuizScreen}
        options={{ title: '🎯 Career Guide Quiz' }}
      />
    </Stack.Navigator>
  );
}

/* ── Tab icon ── */
function TabIcon({ emoji, focused }) {
  return (
    <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
      <Text style={styles.tabEmoji}>{emoji}</Text>
    </View>
  );
}

/* ── Root ── */
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: COLORS.accent,
            tabBarInactiveTintColor: COLORS.midGray,
            tabBarLabelStyle: styles.tabLabel,
          }}>
          <Tab.Screen
            name="HomeTab"
            component={HomeStack}
            options={{
              tabBarLabel: 'Explore',
              tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" focused={focused} />,
            }}
          />
          <Tab.Screen
            name="QuizTab"
            component={QuizStack}
            options={{
              tabBarLabel: 'Career Quiz',
              tabBarIcon: ({ focused }) => <TabIcon emoji="🎯" focused={focused} />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.cardBg,
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    paddingTop: 6,
    paddingBottom: 8,
    height: 64,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  tabLabel: { fontSize: 11, fontWeight: '700', marginTop: 2 },
  tabIcon: { width: 36, height: 36, justifyContent: 'center', alignItems: 'center', borderRadius: 12 },
  tabIconActive: { backgroundColor: '#E9456015' },
  tabEmoji: { fontSize: 20 },
});
