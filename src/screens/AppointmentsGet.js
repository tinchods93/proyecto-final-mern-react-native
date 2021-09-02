import React from 'react';
import { ScrollView,SafeAreaView} from 'react-native';
import AppointmentGetForm from '../components/AppointmentGetForm';
import { commonStyles } from '../styles/mainStyles';

const AppointmentsGet = (props) => {
  return (
    <SafeAreaView style={commonStyles.container}>
        <AppointmentGetForm
          navegation={() => props.navigation.navigate('Mostrar')}
        />
    </SafeAreaView>
  );
};

export default AppointmentsGet;
