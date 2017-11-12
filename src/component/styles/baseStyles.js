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
  innerPading: {
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
  },
  logoutBtn: { 
    position: "absolute",
    top: 10,
    right: 10,
  },
  logoutIcon: {
    color: "#333",
  },
  alignMent: {
    flexDirection: 'row',
  },
  btnBtn : {
    backgroundColor: "#e8e8e8",
    width: "50%",
    borderRadius: 0,
    shadowOpacity: 0,
    elevation: 0
  },
  btnBtnSearch: {
    backgroundColor: "#333",
    width: "50%",
    borderRadius: 0,
    shadowOpacity: 0,
    elevation: 0
  },
  btnBtnIcon :{ 
    color: "#333",
  },
  btnBtnIconSearch :{ 
    color: "#fff",
  },
  btnBtnText: {
    fontFamily: "Lato-Bold",
    color: "#333",
    width: "100%",
    textAlign: "left",
  },
  btnBtnTextSearch: {
    fontFamily: "Lato-Bold",
    color: "#fff",
    width: "100%",
    textAlign: "left",
  },
  oneBox: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingTop: 0,
    elevation: 0,
    borderBottomWidth: 1,
    borderColor: "#555",
  },
  cardStyle: {
    elevation: 0,
  },
  lato: {
    fontFamily: "Lato",
    flexDirection: 'column'
  },
  patientName: {
    color: "red",
  },
  forLeft: {
    color: "#555",
    textAlign: 'left',
    width: '100%',
  },
  forRight: {
    color: "#555",
  },
  patientNames: {
    color: '#444',
    fontSize: 16,
  },
  // patientDisease: {
    
  // },
  // patientMedications :{ 

  // },
  leftMatter: {
    width: '50%',
    flexDirection: 'column',
  },
  rightMatter: {
    width: '50%'
  },
  modalHeader :{
    backgroundColor: '#555',
  },
  title: {
    fontFamily: 'Lato-Bold'
  },
  font: {
    fontFamily: 'Lato'
  },
  patientForm: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  dateLabel: {
    color: '#444',
    marginTop: 15,
  },
  addBtnpt: {
    marginTop: 15,
    backgroundColor: '#333',
    width: 150,
  },
  addBtnptIcon: {
    color: '#fff'
  },
  addBtnptText: {
    color: '#fff',
    textAlign: 'left',
    fontFamily: 'Lato-Bold'
  }
});