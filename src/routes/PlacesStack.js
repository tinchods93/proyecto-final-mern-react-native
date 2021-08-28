import React, {Component} from 'react';
import Places from '../screens/Places';
import {PostDetail} from '../screens/PostDetail';
import PostEdit from '../screens/PostEdit';
import PostCreate from '../screens/PostCreate';
import {createStackNavigator} from '@react-navigation/stack';

const PlacesStack = createStackNavigator();

export const PlacesStackScreen = () => {
  return (
    <PlacesStack.Navigator>
      <PlacesStack.Screen name="Lugares de Vacunación" component={Places} />
    </PlacesStack.Navigator>
  );
};
