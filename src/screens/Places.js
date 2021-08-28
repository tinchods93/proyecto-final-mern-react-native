import React, { Component } from 'react';

import {
  SafeAreaView,
  Text,
  ImageBackground,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { capitalize } from '../helpers/capitalizer';
import { commonStyles } from '../styles/mainStyles';

import { actions } from '../store';
import { connect } from 'react-redux';
import {
  placesSelector,
  selectedSelector
} from '../store/selectors/places';

const { height, width } = Dimensions.get('window');

class Places extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_places: null,
      selectedPlace: '',
      selectedPlaceIndex: '',
    };
  }

  componentDidMount() {
    try {
      if (!this.props.places.length) {
        this.props.refreshPlaces();
        if(this.props.places.length){
          this.setState({current_places: this.props.places});
        }
      }
      // console.log(this.props.places);
    } catch (error) {
      console.log('ERROR trying to use props function in HOME', error);
    }
  }
  componentDidUpdate() {
    if (this.props.places && this.state.current_places !== this.props.places) {
      this.setState({current_places: this.props.places});
    }
  }

  renderPost = ({ item, index }) => {
    return (
      <Place
        title={item.name}
        key={item._id}
        onPress={() => this.setState({ selectedPlace: item })}
        selected={item._id === this.state.selectedPlace._id}
      />
    );
  };

  // _delete = () => {
  //   const { selectedPlace } = this.state;
  //   if (selectedPlace !== '') {
  //     let index = selectedPlaceIndex;
  //     this.props.removePost({ selectedPlace, index });
  //   }
  // };

  render() {
    const { current_places } = this.state;
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.views}>
          <View style={styles.buttonBar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('PostCreate')}
              style={styles.button}>
              <Text style={styles.buttonText}>Nuevo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.changeTab('PostDetail')}
              style={styles.button}>
              <Text style={styles.buttonText}>Detalles</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.changeTab('PostEdit')}
              style={styles.button}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
          {this.state.current_places === null ? (
            <Text >... Cargando ...</Text>
          ) : (
            <FlatList
              data={current_places}
              renderItem={this.renderPost}
              keyExtractor={(item) => item._id}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
}
const Place = ({ title, onPress, selected }) => {
  return (
    <TouchableOpacity
      style={selected ? styles.selectedItem : styles.item}
      onPress={onPress}>
      <Text style={selected ? styles.selectedTitle : styles.title}>
        {capitalize(title)}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonBar: {
    flexDirection: 'row',
    width,
    justifyContent: 'center',
    padding: 10,
  },
  button: {
    alignSelf: 'center',
    flex: 1,
    backgroundColor: '#E9ECEF',
    margin: 5,
    padding: 5,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#343A40',
    fontWeight: 'bold',
  },
  item: {
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 15,
    color: '#495057',
  },
  selectedTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 15,
    color: '#0E0F10',
  },
  selectedItem: {
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 10,
    backgroundColor: '#F9CF86',
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10,
  },
});

const mapDispatchToProps = (dispatch) => ({
  refreshPlaces: () => dispatch(actions.places.refreshPlaces()),
  selectPlace: (placeSelected) => dispatch(actions.places.selectPlace(placeSelected)),
});
const mapStateToProps = (state) => ({
  places: placesSelector(state),
  selected: selectedSelector(state),
});
export default connect(mapStateToProps, mapDispatchToProps)(Places);
