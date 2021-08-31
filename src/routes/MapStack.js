import React from 'react';
import MyMap from '../screens/MyMap';

import {createStackNavigator} from '@react-navigation/stack';

const MapStack = createStackNavigator();

export const MapStackScreen = () => {
  return (
    <MapStack.Navigator>
      <MapStack.Screen name="Mapa con los lugares de Vacunación" component={MyMap} />
    </MapStack.Navigator>
  );
};
