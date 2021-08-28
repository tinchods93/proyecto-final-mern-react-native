import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  ImageBackground,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Geolocation from 'react-native-geolocation-service';
import {commonStyles} from '../styles/mainStyles';
import {hasLocationPermission} from '../helpers/LocationPermissions';
import {Image, Icon} from 'react-native-elements';
import MapView, {Marker} from 'react-native-maps';
import {faSync, faCrosshairs} from '@fortawesome/free-solid-svg-icons';

const {height, width} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = -29.433337;
const LONGITUDE = -66.859696;
const LATITUDE_DELTA = 0.00422;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const initialRegion = {
  latitude: LATITUDE,
  longitude: LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      mapType: true,
    };
  }

  componentDidMount = async () => {
    await hasLocationPermission();

    this._getLocation();
  };

  fitCoordinates = async () => {
    this._getLocation();
  };

  onRegionChange = region => {
    this.setState({region});
  };

  MapTypeBtn = () => {
    return (
      <TouchableOpacity
        onPress={() => this.setState({mapType: !this.state.mapType})}
        style={styles.changeMapBtn}>
        <FontAwesomeIcon
          icon={faSync}
          size={20}
          style={{marginRight: 5, color: '#C6C6C6'}}
        />
        <Text style={{color: '#FFF', fontWeight: 'bold'}}>Map Type</Text>
      </TouchableOpacity>
    );
  };

  _getLocation = async () => {
    const current_region = this.state.region;

    const options = {
      accuracy: {android: 'high', ios: 'best'},
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
      distanceFilter: 0,
      forceRequestLocation: true,
    };

    const errorFunct = err =>
      console.log('Error tratando de tomar la ubicacion actual', err);

    await Geolocation.getCurrentPosition(
      async position => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.setState({region: {longitude, latitude}});
        console.log(
          `Posicion actual => Latitud ${latitude} | Longitud ${longitude}`,
        );
        this.mapRef.animateToRegion(
          {
            latitude,
            longitude,
            latitudeDelta: current_region.latitudeDelta,
            longitudeDelta: current_region.longitudeDelta,
          },
          1000,
        );
      },
      errorFunct,
      options,
    );
  };

  render() {
    const {region, mapType} = this.state;
    return (
      <View style={{flex: 1}}>
        <MapView
          ref={map => {
            this.mapRef = map;
          }}
          mapType={mapType ? 'standard' : 'hybrid'}
          style={styles.map}
          showsUserLocation={true}
          initialRegion={region.latitudeDelta ? region : initialRegion}
          onRegionChangeComplete={this.onRegionChange}
        />
        <View style={styles.centeer}>
          <Icon
            name="home"
            type="font-awesome"
            color="#8d2d84"
            size={width / 12}
            onPress={() => this.fitCoordinates()}
          />
        </View>
        <View style={styles.markerFixed}>
          <FontAwesomeIcon
            icon={faCrosshairs}
            size={30}
            style={{color: '#6F4D94'}}
          />
        </View>

        <SafeAreaView style={styles.footer}>
          <this.MapTypeBtn />
          <Text style={styles.region}>
            <Text style={{fontWeight: 'bold'}}>Longitude: </Text>
            {`${region.longitude}\n`}
            <Text style={{fontWeight: 'bold'}}>Latitude: </Text>
            {`${region.latitude}`}
          </Text>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    margin: width / 20,
    height: width / 2.5,
    width: width / 2.5,
    borderRadius: 15,
    justifyContent: 'center',
  },
  markerFixed: {
    left: '50%',
    top: '50%',
    position: 'absolute',
    backgroundColor: '#FFF',
    padding: 5,
    marginLeft: -width / 17,
    marginTop: height / 18,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 3,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width,
    height,
    alignSelf: 'center',
  },
  marker: {
    height: 48,
    width: 48,
  },
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    padding: 10,
  },
  centeer: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 100,
    width: width / 10,
    alignSelf: 'flex-end',
    margin: 20,
    marginRight: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  region: {
    color: '#FFF',
  },
  changeMapBtn: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    marginRight: 25,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
