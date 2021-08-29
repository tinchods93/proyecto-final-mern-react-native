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
import { selectedSelector } from '../store/selectors/places';
import { commonStyles } from '../styles/mainStyles';

const { height, width } = Dimensions.get('window');


class AppointmentSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
    };
  }

  onTextChange = (input) => {
    let { data } = this.state;
    if (!data) data = {};
    data[input.field] = input.value;
    this.setState({ data });
  };

  render() {
    const { data, formType } = this.state;
    const { title } = this.props;
    return (
      <KeyboardAvoidingView style={commonStyles.views} behavior='padding'>
        <Text style={{ ...commonStyles.title, color: '#FFF', fontWeight: 'bold' }}>
          Consultar Turno
        </Text>
        <View style={styles.inputBox}>
          <View>
            <Text style={styles.titleText}>DNI:</Text>
            <TextInput
              style={styles.input}
              value={data ? data.dni : ''}
              multiline={true}
              placeholder={"Ingrese su DNI"}
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
            formType === 'Nuevo Lugar de Vacunación'
              ? this.props.postPlace(data)
              : this.props.updatePlace(data);

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
  },
  titleText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

const mapDispatchToProps = (dispatch) => ({
  postPlace: (data) => dispatch(actions.places.postPlaceAction(data)),
  updatePlace: (data) => dispatch(actions.places.patchPlaceAction(data)),
});
const mapStateToProps = (state) => ({
  selected: selectedSelector(state),
});
export default connect(mapStateToProps, mapDispatchToProps)(AppointmentSearch);
