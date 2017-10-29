import React from 'react';
import {
    AppRegistry,
    TextInput,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    ToolbarAndroid,
    ActivityIndicator,
    KeyboardAvoidingView
  } from 'react-native';
import styles from '../styles/baseStyles';
import { Item, Input, Label, Text, Drawer } from 'native-base';

import Login from '../login/login';
import Dashboard from '../dashboard/dashboard';
import AddPatient from '../PatientData/AddPatient';

// Styles specific to the account page

export default class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }
        
    componentWillMount() {
        // get the current user from firebase
        const userData = this.props.firebaseApp.auth().currentUser;
        this.setState({
            user: userData,
            loading: false
        });
    }
    
    render() {
      // The content of the screen should be inputs for a username, password and submit button.
      // If we are loading then we display an ActivityIndicator.
      const content = this.state.loading ? <ActivityIndicator size="large"/> :
      this.state.user &&
        <View>
          <Image source={require('../../img/db_bg.jpg')} style={styles.bgImage}>
            <Image source={require('../../img/logo.png')}/>
          </Image>
          <Text>{this.state.user.email}</Text>
          <TouchableHighlight onPress={this.addPatient.bind(this)} style={[styles.logSgnItem, styles.darkBtn, styles.extraSpc]}>
            <Text style={styles.darkBtnText}>Add Patient</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.logout.bind(this)} style={[styles.logSgnItem, styles.darkBtn, styles.extraSpc]}>
            <Text style={styles.darkBtnText}>Logout</Text>
          </TouchableHighlight>
        </View>;
  
      // A simple UI with a toolbar, and content below it.
      return (
        <View style={styles.container}>
            {content}
        </View>
      )
    }

    componentDidMount() {
        const user = this.props.firebaseApp.auth().currentUser;
    }

    logout() {
        // logout, once that is complete, return the user to the login screen.
        this.props.firebaseApp.auth().signOut().then(() => {
          this.props.navigator.push({
            component: Login
          });
        });
    }
    
    addPatient() {
        this.props.navigator.push({
          component: AddPatient
        });
    }

  }