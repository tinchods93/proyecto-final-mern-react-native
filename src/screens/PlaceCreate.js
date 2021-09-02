import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import PlacesForm from '../components/PlacesForm';
import { commonStyles } from '../styles/mainStyles';

const PlaceCreate = (props) => {
  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView>
        <PlacesForm
          title='Nuevo Lugar de Vacunación'
          navegation={() => props.navigation.navigate('Lugares de Vacunación')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlaceCreate;
