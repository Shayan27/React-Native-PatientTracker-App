import React from 'react';
import {
  Text, Image, View
} from 'react-native';

import {Header,Button,Icon} from 'native-base';
import styles from '../styles/baseStyles'; 

export default class AppHeader extends React.Component {
  render() {
    return (
      <View style={styles.header}>
      <Image source={require('../../img/db_bg.jpg')} style={styles.bgImage}>
            <Button style={styles.btnNav} transparent
                    onPress={()=>this.props.openDrawer()}
            >
                <Icon style={styles.btnNavClr} name='menu' />
            </Button>
            <Image source={require('../../img/logo.png')}/>
       </Image>
     </View>
    );
  }
}

module.exports = AppHeader;