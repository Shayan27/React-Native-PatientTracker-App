import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { Asset, AppLoading } from 'expo';
import { Routes } from './src/config';
import { Navigation } from './src/config';
import Home from './src/component/home/home';
import Login from './src/component/login/login';
import Dashboard from './src/component/dashboard/dashboard';
import {Navigator} from 'react-native-deprecated-custom-components';

import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAHIPybho8Lvnm1ceLdQwySv5ggTyqFWtQ",
  authDomain: "patient-tracker-app-6a73b.firebaseapp.com",
  databaseURL: "https://patient-tracker-app-6a73b.firebaseio.com",
  projectId: "patient-tracker-app-6a73b",
  storageBucket: "patient-tracker-app-6a73b.appspot.com",
  messagingSenderId: "938207442132"
};
// Initialize the firebase app here and pass it to other components as needed. Only initialize on startup.
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {

  state = {
    isReady: false,
  };
  
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    
    this._cacheResourcesAsync();

    
    // firebaseApp.auth().onAuthStateChanged(function(user){
      
    //   if (user) {
    //     console.log('user is signed in')
    //   } else {
    //       console.log('user is signed out')
    //   }
    // });

  }
  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      //   <View style={styles.container}>
      //   <Routes />
      // </View>
        <Navigator
        initialRoute={{component: Home}}
        configureScene={() => {
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        renderScene={(route, navigator) => {
          if(route.component){
            // Pass the navigator the the component so it can navigate as well.
            // Pass firebaseApp so it can make calls to firebase.
            return React.createElement(route.component, { navigator, firebaseApp});
          }
      }} />
    );
  }
  
  async _cacheResourcesAsync() {
    this.setState({isReady: true});
  }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: '#efefef',
    },
});
