import React from 'react';
import {
  View, Text, StyleSheet, Image
} from 'react-native';

import {Header,Left,Button,Icon,Right,Body,Title} from 'native-base';

export default class AppBody extends React.Component {
  render() {
    return (
        <View style={styles.header}>
            <Text>App Body</Text>
        </View>
    );
  }
}



const styles = StyleSheet.create ({
    header: {
        height: 250,
    },
    bgImage: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 250,
    },
})


module.exports = AppBody;