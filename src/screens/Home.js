import React, { Component } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { commonStyles } from '../styles/mainStyles';

const { height, width } = Dimensions.get('window');

export default class Home extends Component {
  _onHomePress = () => {
    Alert.alert('Hola', 'Ya te encuentras ahí', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };

  render() {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.views}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={commonStyles.homeButton}
              onPress={() => this.props.navigation.navigate('Appointments')}>
              <Text style={commonStyles.homeButtonText}>Turnos</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={commonStyles.homeButton}
              onPress={() => this.props.navigation.navigate('Lugares')}>
              <Text style={commonStyles.homeButtonText}>Lugares de Vacunación</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
