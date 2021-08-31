import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import AppointmentForm from '../components/AppointmentForm';
import { commonStyles } from '../styles/mainStyles';

const AppointmentsCreate = (props) => {
  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView>
        <AppointmentForm navegation={() => props.navigation.navigate('Mostrar')} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppointmentsCreate;
