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
const onlyLettersRexp = new RegExp('^\D+$', 'gi');

class PlacesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      formType: props.title || 'Nuevo Lugar de Vacunación',
    };
  }

  componentDidMount() {
    const { formType } = this.state;
    const { title, selected } = this.props;

    if (title && formType !== title) this.setState({ formType: title });
    if (selected && formType !== 'Nuevo Lugar de Vacunación') {
      this.setState({ data: selected });
    }
  }

  onTextChange = (input) => {
    if (input.regExp && input.value.match(input.regExp)) return;
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
          {title}
        </Text>
        <View style={styles.inputBox}>
          <View>
            <Text style={styles.titleText}>Nombre:</Text>
            <TextInput
              style={styles.input}
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
          <View>
            <Text style={styles.titleText}>Dirección:</Text>
            <TextInput
              style={styles.input}
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
            <Text style={styles.titleText}>Posición en el mapa:</Text>
            <View>
              <Text style={styles.titleText}>Latitud:</Text>
              <TextInput
                style={styles.input}
                value={data && data.latitude ? `${data.latitude}` : ''}
                onChangeText={(input) =>
                  this.onTextChange({ value: input, field: 'latitude' })
                }
              />
              <Text style={styles.titleText}>Longitud:</Text>
              <TextInput
                style={styles.input}
                value={data && data.longitude ? `${data.longitude}` : ''}
                onChangeText={(input) =>
                  this.onTextChange({ value: input, field: 'longitude' })
                }
              />
            </View>
          </View>
          <View>
            <Text style={styles.titleText}>Imagen de portada:</Text>
            <TextInput
              style={styles.input}
              value={data && data.url ? data.url : ''}
              multiline={true}
              onChangeText={(input) =>
                this.onTextChange({
                  value: input,
                  field: 'url',
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
export default connect(mapStateToProps, mapDispatchToProps)(PlacesForm);
