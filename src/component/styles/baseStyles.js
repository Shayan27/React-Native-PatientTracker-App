'use strict';
import React, {
  StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  header: {
    backgroundColor: 'transparent',
    height: 250,
    width: '100%',
  },
  bgImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 250,
    alignSelf: 'stretch',
  },
  btnNav: {
    position: 'absolute',
    top: 25,
    left: 20,
  },
  btnNavClr: {
    color: '#555',
  },
  logSgn: {
    marginTop: 25,
  },
  logSgnItem: {
    padding: 12,
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 1,
    width: 300,
  },
  body: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  toolbar: {
    backgroundColor: '#e9eaed',
  },
  textInput: {
    width: 300,
    marginTop: 10,
  },
  textInputs: {
    width: 300,
    marginBottom: 10,
  },
  transparentButton: {
    marginTop: 10,
    padding: 15
  },
  transparentButtonText: {
    color: '#0485A9',
    textAlign: 'center',
  },
  primaryButton: {
    padding: 12,
    borderRadius: 20,
    marginBottom: 8,
    marginTop: 8,
    borderWidth: 1,
  },
  darkBtn: {
    backgroundColor: '#333',
    borderColor: '#333',
  },
  lightBtn: {
    borderColor: '#666',
  },
  primaryButtonText: {
    color: '#555',
    textAlign: 'center',
  },
  darkBtnText: {
    color: '#efefef',
    textAlign: 'center',
  },
  lightBtnText: {
    color: '#555',
    textAlign: 'center',
  },
  extraSpc: {
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100
  },
  // Add Patient Page
  formInput: {
    marginTop: 15,
  },
});