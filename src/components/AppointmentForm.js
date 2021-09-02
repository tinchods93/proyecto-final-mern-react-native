import React, { Component } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { actions } from '../store';
import { connect } from 'react-redux';
import { appointmentSelector } from '../store/selectors/appointments';
import { commonStyles } from '../styles/mainStyles';

const { height, width } = Dimensions.get('window');
const onlyLettersRexp = new RegExp('^D+$', 'gi');

class AppointmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        born_date: new Date(),
      },
    };
  }

  onTextChange = (input) => {
    let { data } = this.state;
    if (!data) data = {};
    data[input.field] = input.value;
    this.setState({ data });
  };

  render() {
    const { data, today } = this.state;
    return (
      <ScrollView>
        <KeyboardAvoidingView style={commonStyles.views} behavior='padding'>
          <View style={commonStyles.myCard}>
            <View style={commonStyles.myCard__title_container}>
              <Text style={commonStyles.myCard__title}>Nuevo Turno</Text>
            </View>
            <View style={commonStyles.form__group}>
              <Text style={commonStyles.labelStyle}>Nombre:</Text>
              <TextInput
                style={commonStyles.input}
                value={data && data.name ? data.name : ''}
                multiline={true}
                onChangeText={(input) =>
                  this.onTextChange({
                    value: input,
                    field: 'name',
                  })
                }
              />
            </View>
            <View style={commonStyles.form__group}>
              <Text style={commonStyles.labelStyle}>Apellido:</Text>
              <TextInput
                style={commonStyles.input}
                value={data && data.last_name ? data.last_name : ''}
                multiline={true}
                onChangeText={(input) =>
                  this.onTextChange({
                    value: input,
                    field: 'last_name',
                  })
                }
              />
            </View>
            <View style={commonStyles.form__group}>
              <Text style={commonStyles.labelStyle}>DNI:</Text>
              <TextInput
                style={commonStyles.input}
                value={data && data.dni ? data.dni : ''}
                multiline={true}
                onChangeText={(input) =>
                  this.onTextChange({
                    value: input,
                    field: 'dni',
                  })
                }
              />
            </View>
            <View style={commonStyles.form__group}>
              <Text style={commonStyles.labelStyle}>Dirección:</Text>
              <TextInput
                style={commonStyles.input}
                value={data && data.address ? data.address : ''}
                multiline={true}
                onChangeText={(input) =>
                  this.onTextChange({
                    value: input,
                    field: 'address',
                  })
                }
              />
            </View>
            <View>
              <Text style={commonStyles.labelStyle}>Fecha de Nacimiento:</Text>
              <DatePicker
                date={data.born_date}
                mode='date'
                maximumDate={
                  new Date(moment().subtract(12, 'years').format('YYYY-MM-DD'))
                }
                minimumDate={
                  new Date(moment().subtract(100, 'years').format('YYYY-MM-DD'))
                }
                onDateChange={(input) =>
                  this.onTextChange({
                    value: input,
                    field: 'born_date',
                  })
                }
              />
            </View>
          </View>
          <TouchableOpacity
            style={commonStyles.primaryBtn}
            onPress={() => {
              this.props.postAppointment(data);
              this.props.navegation();
            }}>
            <Text style={commonStyles.primaryBtnText}>Enviar</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  postAppointment: (data) =>
    dispatch(actions.appointments.postAppointmentAction(data)),
});
const mapStateToProps = (state) => ({
  appointment: appointmentSelector(state),
});
export default connect(mapStateToProps, mapDispatchToProps)(AppointmentForm);
