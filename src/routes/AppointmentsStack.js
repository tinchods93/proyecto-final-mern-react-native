import React, { Component } from 'react';
import Appointments from '../screens/Appointments';
import { createStackNavigator } from '@react-navigation/stack';

const AppointmentsStack = createStackNavigator();

export const AppointmentsStackScreen = () => {
  return (
    <AppointmentsStack.Navigator>
      <AppointmentsStack.Screen name='Turnos' component={Appointments} />
      <AppointmentsStack.Screen name='Consultar' component={Appointments} />
    </AppointmentsStack.Navigator>
  );
};
