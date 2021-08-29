import React from 'react';
import { SafeAreaView } from 'react-native';
import PlacesForm from '../components/PlacesForm';
import { commonStyles } from '../styles/mainStyles';

const PostEdit = (props) => {
  return (
    <SafeAreaView style={commonStyles.container}>
      <PlacesForm
        title='Actualizar Lugar de Vacunación'
        navegation={() => props.navigation.navigate('Lugares de Vacunacion')}
      />
    </SafeAreaView>
  );
};

export default PostEdit;
