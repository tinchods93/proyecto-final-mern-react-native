import React, { Component } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import { actions } from '../store';
import { connect } from 'react-redux';
import { appointmentSelector } from '../store/selectors/appointments';
import { commonStyles } from '../styles/mainStyles';

const { height, width } = Dimensions.get('window');

class AppointmentGetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      appointment: undefined,
    };
  }

  onTextChange = (input) => {
    let { data } = this.state;
    if (!data) data = {};
    data[input.field] = input.value;
    this.setState({ data });
  };

  render() {
    const { data } = this.state;

    return (
      <KeyboardAvoidingView style={commonStyles.views} behavior='padding'>
        <View style={commonStyles.myCard}>
          <View style={commonStyles.myCard__title_container}>
            <Text style={commonStyles.myCard__title}>Consultar Turno</Text>
          </View>
          <View style={commonStyles.form__group}>
            <Text style={commonStyles.labelStyle}>DNI:</Text>
            <TextInput
              style={commonStyles.input}
              value={data ? data.dni : ''}
              multiline={true}
              placeholder={'Ingrese su DNI'}
              onChangeText={(input) =>
                this.onTextChange({
                  value: input,
                  field: 'dni',
                })
              }
            />
          </View>
        </View>
        <TouchableOpacity
          style={commonStyles.primaryBtn}
          onPress={() => {
            this.props.getAppointment(data);
            this.props.navegation();
          }}>
          <Text style={commonStyles.primaryBtnText}>Save Changes</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: '#FFF',
    width: width * 0.9,
    marginVertical: 10,
    overflow: 'hidden',
    borderRadius: 10,
    padding: 10,
  },
  input: {
    backgroundColor: '#E3E6EA',
    borderRadius: 10,
    color: '#000',
  },
  titleText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

const mapDispatchToProps = (dispatch) => ({
  getAppointment: (data) =>
    dispatch(actions.appointments.getAppointmentAction(data)),
});
const mapStateToProps = (state) => ({
  appointment: appointmentSelector(state),
});
export default connect(mapStateToProps, mapDispatchToProps)(AppointmentGetForm);
