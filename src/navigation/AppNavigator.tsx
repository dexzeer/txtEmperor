import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { EditorScreen } from '../screens/EditorScreen';
import { PreviewScreen } from '../screens/PreviewScreen';
import { colors } from '../theme/colors';

export type RootStackParamList = {
  Home: undefined;
  Editor: undefined;
  Preview: { content: string; fileName: string; isNewFile: boolean };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          presentation: 'modal',
          cardStyle: { backgroundColor: colors.primaryBlack },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Editor" component={EditorScreen} />
        <Stack.Screen name="Preview" component={PreviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};