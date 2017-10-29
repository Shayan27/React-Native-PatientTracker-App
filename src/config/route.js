import React from 'react';
import { View } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native';
import { Home, Login, SignUp, ForgotPass, Dashboard } from '../component';

export let Routes = () => (
    <NativeRouter>
        <View>
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/forgotpass" component={ForgotPass} />
            <Route exact path="/dashboard" component={Dashboard} />
        </View>
    </NativeRouter>
);