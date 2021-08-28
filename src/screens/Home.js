import React, {Component} from 'react';
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
import {commonStyles} from '../styles/mainStyles';

const {height, width} = Dimensions.get('window');

export default class Home extends Component {
  _onHomePress = () => {
    Alert.alert('Hola', 'Ya te encuentras ahí', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  render() {
    return (
      <SafeAreaView style={commonStyles.container}>
        <ImageBackground
          style={{flex: 1}}
          source={require('../assets/images/pexels-j-lee-7003328.jpg')}>
          <View style={commonStyles.views}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.homeButton}
                onPress={() => this.props.navigation.navigate('Profile')}>
                <Text style={styles.homeButtonText}>Turnos</Text>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.homeButton}
                onPress={() => this.props.navigation.navigate('Lugares')}>
                <Text style={styles.homeButtonText}>Lugares de Vacunación</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  homeButton: {
    backgroundColor: '#F7F8F9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 10,
    height: height / 8,
    width: width / 3,
    borderRadius: 10,
    justifyContent: 'center',
    margin: 10,
  },
  homeButtonText: {
    color: '#343A40',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
