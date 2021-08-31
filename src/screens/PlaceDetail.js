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
  ScrollView,
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
    console.log('URL=>', url);
    Linking.openURL(url);
  };

  return selectedPlace ? (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.views}>
        <View style={styles.post}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity onPress={() => linkToMap()}>
              <Text style={styles.link}>Abrir Mapa</Text>
            </TouchableOpacity>
          </View>
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
    resizeMode: 'contain',
    marginTop: 10,
  },
  link: {
    color: '#6B73E6',
    textDecorationLine: 'underline',
  },
});

export default connect(mapStateToProps)(PlaceDetail);
