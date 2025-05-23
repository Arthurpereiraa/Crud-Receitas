import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../Pages/Home';
import AddItem from '../Pages/AddItem';
import EditarReceita from '../Pages/EditarReceita';
import VerReceita from '../Pages/VerReceita';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#EF6868' },
          headerTintColor: '#FFF4E6',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Adicionar"
          component={AddItem}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Editar"
          component={EditarReceita}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerReceita"
          component={VerReceita}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
