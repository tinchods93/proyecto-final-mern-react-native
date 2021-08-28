import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import {capitalize} from '../helpers/capitalizer';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {commonStyles} from '../styles/mainStyles';

export const PostDetail = () => {
  const [selectedPost, setSelectedPost] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('selectedPost')
      .then(response => setSelectedPost(JSON.parse(response).item))
      .catch(e => console.log('Error en Post Details', e));
  }, []);

  return selectedPost.title ? (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.views}>
        <View style={styles.post}>
          <Text style={styles.title}>{capitalize(selectedPost.title)}</Text>
          <Text style={styles.body}>{capitalize(selectedPost.body)}</Text>
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
    margin: 5,
  },
  title: {
    fontWeight: 'bold',
  },
});
