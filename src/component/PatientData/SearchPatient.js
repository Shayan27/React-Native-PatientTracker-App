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
            searchedPatient: [],
            patientData: (props.patientData || []),
            search: '',
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
        
        let patientData;
        const db = this.props.firebaseApp.database().ref(`patientData`);
        const events = db.child(`${this.props.firebaseApp.auth().currentUser.uid}`);
        
        const query = events 
                        .orderByChild('PatientName')
        query.once('value', snap => {
            searchedPatient = { text: snap.val(), id: snap.key };
        })
        this.setState({patientData: this.state.patientData.concat(searchedPatient)})
        // console.log(searchedPatient.text);
    }
    // search(text) {
    //     this.setState({ text: text });
    //     let patientData = this.state.patientData;
    //     // alert(patientData);

    //     // for (var i = 0; i > patientData.length; i++) {
    //     //     // if(text === patientData[i].text.PatientName) {
    //     //     //     this.setState({patientData: [ patientData[i] ]})
    //     //     // }
    //     //     if(text == patientData[i].text.PatientName.indexOf(text) > 1) {
    //     //         this.setState({patientData: [ patientData[i] ]})
    //     //         console.log(patientData[i]);
    //     //     } else {
    //     //         console.log('not working')
    //     //     }
    //     //     // return alert(patientData[i]);
    //     // }
    //     patientData.map(function (patient, i) {
    //         // if(text == patient.text.PatientName) {
    //         //     this.setState({patientData: this.state.patientData.concat([patient])})
    //         //     console.log(JSON.stringify(patient));
    //         // } else {
    //         //     console.log('not working')
    //         // }
    //         for (var name in patient) {
    //             // if(text == patient.text[name].PatientName) {
    //             //     this.setState({searchedPatient: this.state.searchedPatient.concat([patient.text[name]])})
    //             //     console.log(JSON.stringify(patient.text[name]));
    //             // } else {
    //             //     console.log('not working')
    //             // }
    //             console.log(JSON.stringify(patient[name].text))
    //         }
            
    //     //     // switch(text) {
    //     //     //     case patient.text.PatientName :
    //     //     //         this.setState({patientData: patient})
    //     //     //     break;
    //     //     //     default :
    //     //     //         alert("Shoot me now!");
    //     //     // }
    //     //     // alert(patient.text.PatientName)
    //     }.bind(this))

    //     if (!text) {
    //         this.setState ({patientData})
    //     }
    // }
    findByName = (patient) => {
        
        // console.log(this.state.patientData);
        searchName = this.state.patientData;
        searchQuery = this.state.search;
        // for(var i = 0; i > name.length; i++) {
        //     console.log(name[i])
        // }
        searchName.map(function(patient) {
            var values = [];
            for (var patientName in patient.text) {
                // console.log(name);
                // allResults.push(
                //     <View key={name}><Text>{searchedPatient.text[name].PatientName}</Text></View>
                // )
                // console.log(patient.text[patientName].PatientName)
                name = patient.text[patientName].PatientName;
                // console.log(name)
                values.push(name);
            }
            // for(var n = 0; n > values.length; n++) {
                
            // }
            return console.log(values.toString())
            // return values.toString().search(searchQuery) >= 0 ? true : false
        })
        
        //console.log(values);
        //return name.search(this.state.search) >= 0 ? true : false        
        // name = patient.text.PatientName;
        // return name.search(this.state.search) >= 0 ? true : false 
    }
    render() {
        let searchedPatient = this.state.patientData.filter(this.findByName).map(function (searchedPatient) { 
            // var searchedName = this.state.searchVal;
            
            var allResults = [];
            
            // console.log(searchedPatient)
            for (var name in searchedPatient.text) {
                // console.log(searchedPatient.text[name].PatientName);
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
        let searchedPatientData = this.state.searchedPatient.map(function (patientTrack) { 
            // var searchedName = this.state.searchVal;

            var allResults = [];
            
            // console.log(patientTrack)
            for (var name in patientTrack.text) {
                // console.log(name);
                allResults.push(
                    <View key={name}><Text>{patientTrack.text[name].PatientName}</Text></View>
                )
            }

            return (
                <View key={patientTrack.id}>
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
                <Input placeholder="Search"
                onChange={(e) => {
                    this.setState({
                    search: e.nativeEvent.text
                    })
                }}
                value={this.state.search}
                />
                <Icon name="ios-people" />
                </Item>
                <TouchableOpacity>
                <Text>Search</Text>
                </TouchableOpacity>
                    {
                        searchedPatient
                    }
                    {
                    // searchedPatientData
                    }
            </ScrollView>
        )
    }
    
    
}