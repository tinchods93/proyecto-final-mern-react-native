import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  views: {
    alignItems: 'center',
    flexDirection: 'column',
    height,
    backgroundColor: '#64778A',
    width,
    justifyContent: 'center',
  },
  title: {margin: 10, fontSize: 25},
  primaryBtn: {
    borderRadius: 10,
    justifyContent: 'center',
    marginVertical: 10,
    minWidth: 120,
    padding: 5,
    maxWidth: 180,
    minHeight: 30,
    maxHeight: 60,
    backgroundColor: '#495057',
  },
  primaryBtnText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F7F8F9',
  },
  height: height,
  width: width,
});
