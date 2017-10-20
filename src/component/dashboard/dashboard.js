import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Drawer } from 'native-base';
import Sidebar from '../sidebar/sidebar';
import Navigation from '../nav/nav';
import AppHeader from './AppHeader';
import AppBody from './AppBody';

export default class Dashboard extends React.Component {
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };
    render() {
        return(
            <View style={styles.container}> 
                {/* <View style={styles.header}>
                    <Image source={require('../../img/db_bg.jpg')} style={styles.bgImage}>
                        <Image source={require('../../img/logo.png')}/>
                    </Image>
                </View>
                <View> */}
                    <Drawer
                        ref={(ref) => { this.drawer = ref; }}
                        content={<Sidebar navigator={this.navigator} />}
                        onClose={() => this.closeDrawer} >

                        <AppHeader
                            openDrawer={this.openDrawer.bind(this)}
                        />
                        <AppBody />
                    </Drawer>
                {/* </View> */}
            </View>

        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
    }
})
