import React from 'react';
import {MapTypeBtn} from '../screens/Map';
import Map from '../screens/Map';

import {createStackNavigator} from '@react-navigation/stack';

const MapStack = createStackNavigator();

export const MapStackScreen = () => {
  return (
    <MapStack.Navigator>
      <MapStack.Screen name="Mapa" component={Map} />
    </MapStack.Navigator>
  );
};
