import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {Text} from 'native-base'

import Navigation from '../nav/nav';
import SignUp from '../signup/signup';
import Login from '../login/login';
import styles from '../styles/baseStyles.js';

export default class Home extends React.Component {
    
    constructor() {
        super();
    }
    
    goToSignup() {
        this.props.navigator.push({
          component: SignUp
        });
    }

    goToLogin() {
        this.props.navigator.push({
          component: Login
        });
    }
    render() {
        return(
            <View style={styles.container}>
                <Image source={require('../../img/logo.png')} />
                  <View style={styles.logSgn}>
                    <TouchableOpacity onPress={this.goToSignup.bind(this)} style={[styles.lightBtn, styles.logSgnItem]}>
                            <Text style={styles.lightBtnText}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.goToLogin.bind(this)} style={[styles.darkBtn, styles.logSgnItem]}>
                            <Text style={styles.darkBtnText}>Log In</Text>
                    </TouchableOpacity>
                  </View>
            </View>
        )
    }
}
