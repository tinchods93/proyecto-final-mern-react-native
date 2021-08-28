import React, {useState, useEffect, navigationRef} from 'react';
import {Provider} from 'react-redux';
import {store} from '../store';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from '../routes/app';
import {useDispatch} from 'react-redux';
import {actions} from '../store';

const App = () => {
  return (
    <Provider store={store}>
      <AppWrapped />
    </Provider>
  );
};

const AppWrapped = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <AppStack />
    </NavigationContainer>
  );
};

export default App;
