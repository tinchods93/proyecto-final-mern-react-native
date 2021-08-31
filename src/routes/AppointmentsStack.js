import React, { Component } from 'react'
import Appointments from '../screens/Appointments';
import AppointmentsGet from '../screens/AppointmentsGet';
import AppointmentsCreate from '../screens/AppointmentsCreate';
import Appointment from '../screens/AppointmentShow';
import { createStackNavigator } from '@react-navigation/stack';

const AppointmentsStack = createStackNavigator();

export const AppointmentsStackScreen = () => {
  return (
    <AppointmentsStack.Navigator>
      <AppointmentsStack.Screen name='Turnos' component={Appointments} />
      <AppointmentsStack.Screen name='Nuevo' component={AppointmentsCreate} />
      <AppointmentsStack.Screen name='Consultar' component={AppointmentsGet} />
      <AppointmentsStack.Screen name='Mostrar' component={Appointment} />
    </AppointmentsStack.Navigator>
  );
};
