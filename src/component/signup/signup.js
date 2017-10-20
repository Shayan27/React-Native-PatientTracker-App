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
import { Item, Input, Label, Text } from 'native-base';

import Login from '../login/login';
import {Navigator} from 'react-native-deprecated-custom-components';

export default class SignUp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        // used to display a progress indicator if waiting for a network response.
        loading: false,
        // entered credentials
        email: '',
        password: ''
      }
    }
  
    // A method to passs the username and password to firebase and make a new user account
    signup() {
      this.setState({
        // When waiting for the firebase server show the loading indicator.
        loading: true
      });
  
      // Make a call to firebase to create a new user.
      this.props.firebaseApp.auth().createUserWithEmailAndPassword(
        this.state.email,
        this.state.password).then(() => {
          // then and catch are methods that we call on the Promise returned from
          // createUserWithEmailAndPassword
          this.setState({
            // Clear out the fields when the user logs in and hide the progress indicator.
            email: '',
            password: '',
            loading: false
          });
          alert('Your account was created!');
          this.props.navigator.push({
            component: Login
          });
      }).catch((error) => {
        // Leave the fields filled when an error occurs and hide the progress indicator.
        this.setState({
          loading: false
        });
        alert("Account creation failed: " + error.message );
      });
    }
    goToLogin() {
      this.props.navigator.push({
        component: Login
      });
    }
    render() {
      // The content of the screen should be inputs for a username, password and submit button.
      // If we are loading then we display an ActivityIndicator.
      const content = this.state.loading ? <ActivityIndicator size="large"/> :
        <View>
          <KeyboardAvoidingView behavior="position">
          <Item floatingLabel style={styles.textInput}>
              <Label>Email Address</Label>
              <Input
              style={styles.textInputs}
              onChangeText={(text) => this.setState({email: text})}
              value={this.state.email} />
          </Item>
          </KeyboardAvoidingView>
          {/* <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            placeholder={"Email Address"} /> */}
          <KeyboardAvoidingView behavior="position">
          <Item floatingLabel style={styles.textInput}>
              <Label>Password</Label>
              <Input
              style={styles.textInputs}
              onChangeText={(text) => this.setState({password: text})}
              value={this.state.password}
              secureTextEntry={true} />
          </Item>
          </KeyboardAvoidingView>
          {/* <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Password"} /> */}
          <TouchableHighlight onPress={this.signup.bind(this)} style={[styles.primaryButton, styles.darkBtn, styles.extraSpc]}>
            <Text style={styles.darkBtnText}>Sign Up</Text>
          </TouchableHighlight>
          <View>
          <TouchableOpacity  onPress={this.goToLogin.bind(this)} style={[styles.primaryButton, styles.lightBtn]}>
              <Text style={styles.lightBtnText}>Already Have Account?</Text>
          </TouchableOpacity>
          </View>
        </View>;
  
      // A simple UI with a toolbar, and content below it.
          return (
        <View style={styles.container}>
        <Image source={require('../../img/logo.png')} />
          <View style={styles.body}>
            {content}
          </View>
        </View>
                  )
    }
  }