import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import { Link } from 'react-router-native';

export default class Navigation extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.nav}>
                    <TouchableOpacity style={[styles.navItem, styles.signupBtn]}>
                        <Link to="/signup">
                            <Text style={styles.btnTextSu}>Sign Up</Text>
                        </Link>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.navItem, styles.loginBtn]}>
                        <Link to="/login">
                            <Text style={styles.btnTextLg}>Login</Text>
                        </Link>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 45,
    },
    nav: {
        width: '100%',
    },
    navItem: {
        padding: 12,
        borderRadius: 20,
        marginBottom: 15,
        paddingLeft: 120,
        paddingRight: 120,
        borderWidth: 1,
    },
    signupBtn: {
        borderColor: '#666',
    },
    btnTextSu: {
        color: '#555',
    },
    loginBtn: {
        backgroundColor: '#333',
        borderColor: '#333',
    },
    btnTextLg: {
        color: '#efefef',
    }
});