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
  Image,
} from 'react-native';
import { actions } from '../store';
import { connect } from 'react-redux';
import { selectedSelector } from '../store/selectors/places';
import { commonStyles } from '../styles/mainStyles';

const { height, width } = Dimensions.get('window');
const onlyLettersRexp = new RegExp('^D+$', 'gi');

class PlacesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      formType: props.title || 'Nuevo Lugar de Vacunación',
      showImg: true,
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
    if (input.field === 'url') this.setState({ showImg: true });
    data[input.field] = input.value;
    this.setState({ data });
  };

  render() {
    const { data, formType, showImg } = this.state;
    const { title } = this.props;
    return (
      <KeyboardAvoidingView style={commonStyles.views} behavior='padding'>
        <View style={commonStyles.myCard}>
          <View style={commonStyles.myCard__title_container}>
            <Text style={commonStyles.myCard__title}>{title}</Text>
          </View>
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
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ ...styles.titleText, width: '45%' }}>
              Posición en el mapa:
            </Text>
            <View style={{ width: '55%' }}>
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
          {data && data.url && showImg ? (
            <View>
              <Image
                style={styles.portraitImage}
                source={{ uri: data.url }}
                onError={() => this.setState({ showImg: false })}
                onLoad={() => this.setState({ showImg: true })}
              />
            </View>
          ) : (
            <View>
              <Image
                style={styles.portraitImage}
                source={{
                  uri: 'https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo=',
                }}
              />
            </View>
          )}
        </View>
        <TouchableOpacity
          style={commonStyles.primaryBtn}
          onPress={() => {
            formType === 'Nuevo Lugar de Vacunación'
              ? this.props.postPlace(data)
              : this.props.updatePlace(data);

            this.props.navegation();
          }}>
          <Text style={commonStyles.primaryBtnText}>Enviar</Text>
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
    width: '100%',
    color: '#000',
    padding: 8,
    borderRadius: 10,
    borderColor: '#C9C5C5',
    borderWidth: 1,
    overflow: 'scroll',
  },
  titleText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  portraitImage: {
    width: '100%',
    height: 185,
    borderRadius: 10,
    resizeMode: 'contain',
    marginTop: 10,
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
