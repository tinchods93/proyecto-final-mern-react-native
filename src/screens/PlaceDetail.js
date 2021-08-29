import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Image,
  Linking,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { capitalize } from '../helpers/capitalizer';
import { commonStyles } from '../styles/mainStyles';
import { connect } from 'react-redux';
import { selectedSelector } from '../store/selectors/places';

const mapStateToProps = (state) => ({
  selected: selectedSelector(state),
});

const PlaceDetail = (props) => {
  const [selectedPlace, setSelectedPlace] = useState(undefined);

  useEffect(() => {
    if (props.selected && selectedPlace !== props.selected) {
      setSelectedPlace(props.selected);
    }
  }, []);

  const linkToMap = () => {
    const scheme = Platform.select({
      ios: 'maps:',
      android: 'geo:',
    });
    const position = `${selectedPlace.latitude},${selectedPlace.longitude}`;
    const label = selectedPlace.name;
    const url = `${scheme}${position}?q=${label}`;
    console.log("URL=>",url);
    Linking.openURL(url);
  };

  return selectedPlace ? (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.views}>
        <View style={styles.post}>
          <TouchableOpacity onPress={() => linkToMap()}>
            <Text>Abrir Mapa</Text>
          </TouchableOpacity>
          <Text style={styles.name}>{capitalize(selectedPlace.name)}</Text>
          <Text style={styles.address}>{capitalize(selectedPlace.address)}</Text>
          <Image style={styles.portraitImage} source={{ uri: selectedPlace.url }} />
        </View>
      </View>
    </SafeAreaView>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  post: {
    backgroundColor: '#EFF1F3',
    borderRadius: 10,
    padding: 10,
    width: '90%',
  },
  name: {
    fontWeight: 'bold',
  },
  portraitImage: {
    width: '100%',
    height: 185,
    borderRadius: 10,
    resizeMode: 'cover',
    marginTop: 10,
  },
});

export default connect(mapStateToProps)(PlaceDetail);
