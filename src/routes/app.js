import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Tabs} from './Tabs';
import {useDispatch, useSelector} from 'react-redux';

const Stack = createStackNavigator();

const AppStack = props => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AppStack" component={Tabs} />
    </Stack.Navigator>
  );
};

export default AppStack;
