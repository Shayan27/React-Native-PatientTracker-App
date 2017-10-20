import React  from 'react';
import {View, TouchableOpacity} from 'react-native';
import { Link } from 'react-router-native';
import {Content, Text} from 'native-base';

export default class Sidebar extends React.Component {
  render() {
    return (
          <Content style={{backgroundColor:'#FFFFFF'}}>
          
            <TouchableOpacity>
                        <Link to="/login">
                            <Text>Login</Text>
                        </Link>
            </TouchableOpacity>
          </Content>
    );
  }
}

module.exports = Sidebar;
