import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export const commonStyles = StyleSheet.create({
  container: {
    fontFamily:"Montserrat",
    flex: 1,
  },
  views: {
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#64778A',
    flex:1,
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
  homeButton: {
    backgroundColor: '#F7F8F9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 10,
    height: height / 8,
    width: "80%",
    borderRadius: 10,
    justifyContent: 'center',
    marginVertical:10
  },
  homeButtonText: {
    color: '#343A40',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
