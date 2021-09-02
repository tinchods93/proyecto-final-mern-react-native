import React, { Component } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  View,
  Image,
  Alert,
  Linking,
  ScrollView
} from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import { appointmentSelector } from '../store/selectors/appointments';
import { commonStyles } from '../styles/mainStyles';

// const { height, width } = Dimensions.get('window');

class Appointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointment: undefined,
    };
  }

  componentDidMount() {
    if (this.props.appointment) {
      this.setState({ appointment: this.props.appointment });
    }
  }

  componentDidUpdate() {
    if (
      (this.props.appointment &&
        this.props.appointment !== this.state.appointment) ||
      this.props.appointment.name !== this.state.appointment.name
    ) {
      this.setState({ appointment: this.props.appointment });
    }
  }

  linkToMap = () => {
    const { appointment } = this.state;

    const scheme = Platform.select({
      ios: 'maps:',
      android: 'geo:',
    });
    const position = `${appointment.place_id.latitude},${appointment.place_id.longitude}`;
    const label = appointment.place_id.name;
    const url = `${scheme}${position}?q=${label}`;
    Linking.openURL(url);
  };

  render() {
    const { appointment } = this.state;
    console.log('appointment=>', appointment);
    return (
      <SafeAreaView style={commonStyles.container}>
        <ScrollView>
          <View style={commonStyles.views}>
            {appointment && appointment.place_id ? (
              <View style={styles.container}>
                <View style={styles.personalData__card}>
                  <Text style={styles.title}>DATOS PERSONALES</Text>
                  <View style={styles.form__group}>
                    <Text style={styles.label}>Nombre:</Text>
                    <Text
                      style={
                        styles.information
                      }>{`${appointment.user_id.name} ${appointment.user_id.last_name}`}</Text>
                  </View>
                  <View style={styles.form__group}>
                    <Text style={styles.label}>DNI:</Text>
                    <Text style={styles.information}>{appointment.user_id.dni}</Text>
                  </View>
                  <View style={styles.form__group}>
                    <Text style={styles.label}>Fecha de nacimiento:</Text>
                    <Text>
                      {moment(appointment.user_id.born_date.split('T')[0]).format(
                        'DD-MM-YYYY'
                      )}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.label}>Dirección:</Text>
                    <Text style={styles.information}>
                      {appointment.user_id.address}
                    </Text>
                  </View>
                  <Text style={styles.title}>DATOS DEL TURNO</Text>
                  <View style={styles.form__group}>
                    <Text style={styles.label}>Fecha de vacunación:</Text>
                    <Text>
                      {moment(appointment.date.split('T')[0]).format('DD-MM-YYYY')}
                    </Text>
                  </View>
                  <View style={styles.form__group}>
                    <Text style={styles.label}>Lugar de Vacunación:</Text>
                    <Text style={styles.information}>
                      {appointment.place_id.name}
                    </Text>
                  </View>
                  <View style={styles.form__group}>
                    <Text style={styles.label}>Dirección:</Text>
                    <Text style={styles.information}>
                      {appointment.place_id.address}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.label}>{'Link al mapa ====>'}</Text>
                    <TouchableOpacity onPress={() => this.linkToMap()}>
                      <Text style={styles.link}>Abrir Mapa</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.title}>IMAGEN DEL FRENTE</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      style={styles.portraitImage}
                      source={{ uri: appointment.place_id.url }}
                    />
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <Text>CARGANDO</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  personalData__card: {
    backgroundColor: '#FFF',
    width: '100%',
    padding: 10,
    borderRadius: 5,
  },
  form__group: {
    flexDirection: 'row',
    borderColor: '#ADF0C8',
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    borderRadius: 1,
  },
  container: {
    padding: 10,
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 15,
    // backgroundColor: '#F05952',
    width: '45%',
  },
  title: {
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E3E3E3',
    fontSize: 16,
    fontWeight: 'bold',
  },
  portraitImage: {
    width: '100%',
    height: 185,
    borderRadius: 10,
    resizeMode: 'cover',
    marginTop: 10,
  },
  link: {
    color: '#6B73E6',
    textDecorationLine: 'underline',
  },
  information: {
    overflow: 'scroll',
    width: '55%',
  },
});

const mapStateToProps = (state) => ({
  appointment: appointmentSelector(state),
});

export default connect(mapStateToProps)(Appointment);
