import React, {Component} from 'react';
import Places from '../screens/Places';
import {PostDetail} from '../screens/PostDetail';
import PostEdit from '../screens/PostEdit';
import PlaceCreate from '../screens/PlaceCreate';
import {createStackNavigator} from '@react-navigation/stack';

const PlacesStack = createStackNavigator();

export const PlacesStackScreen = () => {
  return (
    <PlacesStack.Navigator>
      <PlacesStack.Screen name="Lugares de Vacunacion" component={Places} />
      <PlacesStack.Screen name="Nuevo Lugar" component={PlaceCreate} />
      
    </PlacesStack.Navigator>
  );
};
