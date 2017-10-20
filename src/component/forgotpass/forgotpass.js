import React from 'react';
import {
    AppRegistry,
    TextInput,
    Text,
    View,
    StyleSheet,
    dismissKeyboard,
    TouchableWithoutFeedback
} from 'react-native';

import Navigation from '../nav/nav';

import { Container, Content, Item, Input, Label } from 'native-base';

export default class ForgotPass extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <Text>ForgotPass</Text>
            </View>
        )
    }
}

