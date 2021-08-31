import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const commonStyles = StyleSheet.create({
  container: {
    fontFamily: 'Montserrat',
    flex: 1,
    backgroundColor: '#8d99ae',
  },
  views: {
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  primaryBtn: {
    borderRadius: 10,
    justifyContent: 'center',
    marginVertical: 10,
    minWidth: 120,
    padding: 10,
    maxWidth: 180,
    minHeight: 30,
    maxHeight: 60,
    backgroundColor: '#2b2d42',
  },
  myCard__title_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor:"#ADF0C8"
  },
  form__group:{marginVertical:5, flexDirection:"row", alignItems:"center"},
  input: {
    backgroundColor: '#E3E6EA',
    borderRadius: 10,
    width:"70%"
  },
  labelStyle: {
    fontWeight: 'bold',
    marginBottom: 5,
    width:"30%"
  },
  myCard__title: { margin: 5, fontSize: 20, color: '#2b2d42', fontWeight: 'bold' },
  myCard: {
    backgroundColor: '#FFF',
    width: width * 0.9,
    marginVertical: 10,
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#edf2f4',
    padding: 10,
    shadowColor: '#000',
    shadowRadius: 8.3,
    elevation: 6,
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
    width: '80%',
    borderRadius: 10,
    justifyContent: 'center',
    marginVertical: 10,
  },
  homeButtonText: {
    color: '#343A40',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
