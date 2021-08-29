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

export default class Appointments extends Component {
  render() {
    return (
      <SafeAreaView style={commonStyles.container}>
        <ImageBackground
          style={{ flex: 1 }}
          source={require('../assets/images/pexels-j-lee-7003328.jpg')}>
          <View style={commonStyles.views}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={commonStyles.homeButton}>
                <Text style={commonStyles.homeButtonText}>Nuevo</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={commonStyles.homeButton}
                onPress={() => this.props.navigation.navigate('Consultar')}>
                <Text style={commonStyles.homeButtonText}>Consultar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
