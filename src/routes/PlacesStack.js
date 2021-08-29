import React, { Component } from 'react';
import Places from '../screens/Places';
import PlaceDetail from '../screens/PlaceDetail';
import PlaceEdit from '../screens/PlaceEdit';
import PlaceCreate from '../screens/PlaceCreate';
import { createStackNavigator } from '@react-navigation/stack';

const PlacesStack = createStackNavigator();

export const PlacesStackScreen = () => {
  return (
    <PlacesStack.Navigator>
      <PlacesStack.Screen name='Lugares de Vacunacion' component={Places} />
      <PlacesStack.Screen name='Nuevo Lugar' component={PlaceCreate} />
      <PlacesStack.Screen name='Lugar Detalles' component={PlaceDetail} />
      <PlacesStack.Screen name='Editar Lugar' component={PlaceEdit} />
    </PlacesStack.Navigator>
  );
};
