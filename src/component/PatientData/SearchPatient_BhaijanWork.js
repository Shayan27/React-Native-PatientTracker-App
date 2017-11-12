import React from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, ListView, Modal, Alert } from 'react-native';
import {Text, Form, Item, List, ListItem, Label, Input, Header, Left, Body, Right, Button, Icon, Title} from 'native-base'
import styles from '../styles/baseStyles.js';
import AddPatient from './AddPatient';

export default class SearchPatient extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            modalVisible: false,
            patientData: [],
            searchVal: '',
        }
    }

    componentWillMount() {
        this.props.firebaseApp.auth().onAuthStateChanged(function(user){
            if (user) {
                console.log('user is signed in')
            } else {
                console.log('user is signed out')
            }
        });
        
        const userData = this.props.firebaseApp.auth().currentUser;

        this.setState({
            user: userData,
            loading: false
        });
        
        // let patientDataRef = this.props.firebaseApp.database().ref(`patientData/${this.props.firebaseApp.auth().currentUser.uid}`);
        // patientDataRef.on('child_added', snapshot => {
        // /* Update React state when Track results are added at Firebase Database */
        // let patient = { text: snapshot.val(), id: snapshot.key };
        // this.setState({ patientData: this.state.patientData.concat(patient)});
        // })

        // Search Queries for Name 
        // let searchedPatientRef = this.props.firebaseApp.database().ref(`patientData`);
        // searchedPatientRef.child(`${this.props.firebaseApp.auth().currentUser.uid}`).orderByChild('PatientName').startAt('r').endAt('r\uf8ff').on('value', snapshot => {
        // /* Update React state when Track results are added at Firebase Database */
        // let searchedPatient = { text: snapshot.val(), id: snapshot.key };
        // this.setState({ patientData: this.state.patientData.concat(searchedPatient)});
        // })

    }
    
    componentDidMount() {
        const user = this.props.firebaseApp.auth().currentUser;
        console.ignoredYellowBox = ['Setting a timer'];
        console.log("===========================================");
        console.log(this.state);
        console.log("===========================================");
        
        let patientData;
        const db = this.props.firebaseApp.database().ref(`patientData`);
        const events = db.child(`${this.props.firebaseApp.auth().currentUser.uid}`);
        
        const query = events 
                        .orderByChild('PatientName')
                        .startAt(`${this.state.searchVal}`)
                        .endAt(`${this.state.searchVal}\uf8ff`);
        query.on('value', snap => {
            searchedPatient = { text: snap.val(), id: snap.key };
        })
        this.setState({patientData: this.state.patientData.concat(searchedPatient)})
        // console.log(searchedPatient.text);
    }

    render() {
        let searchedPatient = this.state.patientData.map(function (searchedPatient) { 
            // var searchedName = this.state.searchVal;

            var allResults = [];
            
            // console.log(searchedPatient)
            for (var name in searchedPatient.text) {
                // console.log(name);
                allResults.push(
                    <View key={name}><Text>{searchedPatient.text[name].PatientName}</Text></View>
                )
            }
                
            return (
                <View key={searchedPatient.id}>
                    { allResults }
                </View>
            )


        })
        return(
            <ScrollView>
                <Image source={require('../../img/db_bg.jpg')} style={styles.bgImage}>
                    <Image source={require('../../img/logo.png')}/>
                </Image>
                <Text>{this.state.user.email}</Text>
                <Item>
                <Icon name="ios-search" />
                <Input placeholder="Search" onChangeText={(text) => this.setState({searchVal: text})}/>
                <Icon name="ios-people" />
                </Item>
                <TouchableOpacity>
                <Text>Search</Text>
                </TouchableOpacity>
                    {searchedPatient}
            </ScrollView>
        )
    }
    
    
}