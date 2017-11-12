import React from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, ListView, Modal, Alert } from 'react-native';
import {Text, Form, Item, List, ListItem, Label, Input, Header, Left, Body, Right, Button, Icon, Title} from 'native-base'
import styles from '../styles/baseStyles.js';
import DatePicker from 'react-native-datepicker'
import SearchPatient from './SearchPatient.js'

export default class AddPatient extends React.Component {

    componentDidMount() {
        const user = this.props.firebaseApp.auth().currentUser;
        console.ignoredYellowBox = ['Setting a timer'];

        console.log(this.state.text);
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
        
        let patientDataRef = this.props.firebaseApp.database().ref(`patientData/${this.props.firebaseApp.auth().currentUser.uid}`);
        patientDataRef.on('child_added', snapshot => {
        /* Update React state when Track results are added at Firebase Database */
        let patient = { text: snapshot.val(), id: snapshot.key };
        this.setState({ patientData: this.state.patientData.concat(patient)});
        })

        // Search Queries for Name 
        // let searchedPatientRef = this.props.firebaseApp.database().ref(`patientData`);
        // searchedPatientRef.child(`${this.props.firebaseApp.auth().currentUser.uid}`).orderByChild('PatientName').startAt('r').endAt('r\uf8ff').on('child_added', snapshot => {
        // /* Update React state when Track results are added at Firebase Database */
        // let searchedPatient = { text: snapshot.val()};
        // this.setState({ patientData: this.state.patientData.concat(searchedPatient)});
        // })

    }

    addPatient(e){
        if (this.state.patientData === "") {
            return;
        }

        const { patientName }  = this.state ;
        const { patientDisease }  = this.state ;
        const { patientMedications }  = this.state ;
        const { dateOfArrival } = this.state;
        const { cost } = this.state
        
       if(patientName == '' || patientDisease == '' || patientMedications == '' || dateOfArrival == '' || cost == '')
       {
        Alert.alert(
            'Empty Fields',
            "Please Enter All the Values.",
          )
       } else {
        /* Send the Track results to Firebase */
        this.props.firebaseApp.database().ref(`patientData/${this.state.user.uid}`).push({ LoggedInKey:this.state.user.uid,PatientName: this.state.patientName, Disease: this.state.patientDisease, Medications: this.state.patientMedications, DateOfArrival: this.state.dateOfArrival, Cost: this.state.cost});

        this.setState({
            patientName: "",
            patientDisease: "",
        });
        Alert.alert(
            'Sucess',
            "Patient Record Sucesfully added!",
        )
        this.setModalVisible(!this.state.modalVisible);     
       }
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            modalVisible: false,
            searchedPatient: [],
            patientData: [],
                patientName: "",
                patientDisease: "",
                patientMedications: "",
                dateOfArrival: "",
                cost: "",
                text: "",
        }
    }
    // filteredSearch = (searchVal) => {
    //     const newData = this.state.patientData.filter(function(patient) {
    //         const PatientVal = patient.text.toString();
    //         const Patienttext = PatientVal.PatientName;
    //         return PatientVal.indexOf(Patienttext) > -1
    //     })
    //     this.setState({
    //         patientData: this.state.patientData.concat(newData),
    //         searchVal: searchVal
    //     })
    // }
    // searchedPatient = () => {
    //     const newData = this.state.patientData.filter( patient =>
    //         patient.indexOf('PatientName') > -1
    //     )
    //     this.setState({
    //         patientData = this.state.patientData.concat(newData),
    //         text = this.state.searchVal
    //     })

    // }
    search(text) {
        this.setState({ text: text });
        let patientData = this.state.patientData;
        // alert(patientData);

        // for (var i = 0; i > patientData.length; i++) {
        //     // if(text === patientData[i].text.PatientName) {
        //     //     this.setState({patientData: [ patientData[i] ]})
        //     // }
        //     if(text == patientData[i].text.PatientName.indexOf(text) > 1) {
        //         this.setState({patientData: [ patientData[i] ]})
        //         console.log(patientData[i]);
        //     } else {
        //         console.log('not working')
        //     }
        //     // return alert(patientData[i]);
        // }
        patientData.map(function (patient, i) {
            if(text == patient.text.PatientName.toLowerCase().match(`^${text}`)) {
                this.setState({searchedPatient: this.state.searchedPatient.concat([patient])})
                console.log(JSON.stringify(patient));
            } else {
                console.log('not working')
            }
            
        //     // switch(text) {
        //     //     case patient.text.PatientName :
        //     //         this.setState({patientData: patient})
        //     //     break;
        //     //     default :
        //     //         alert("Shoot me now!");
        //     // }
        //     // alert(patient.text.PatientName)
        }.bind(this))

        if (!text) {
            this.setState ({patientData})
        }
    }
    render() {
        let patientData = this.state.patientData.map((patient) => 
            // {if(this.state.user.uid !== patient.text.LoggedInKey){}
             //return <Text key={patient.id}>{patient.text.PatientName}, {patient.text.Disease}</Text>
            // {}}
            <View key={patient.id} style={styles.oneBox}>
                <Text>{patient.text.PatientName}</Text>
                <Text>{patient.text.Disease}</Text>
                <Text>{patient.text.Medications}</Text>
                <Text>{patient.text.DateOfArrival}</Text>
                <Text>{patient.text.Cost}</Text>
            </View>
        );
        // let stringify = JSON.stringify(this.state.searchedPatient);
        let searchedPatientData = this.state.searchedPatient.map(function (patientTrack) {
                <View key={`${patientTrack.id}1`}>
                    <Text>{patientTrack.text.PatientName}</Text>
                </View>
        })
        return(
            <ScrollView>
                <Image source={require('../../img/db_bg.jpg')} style={styles.bgImage}>
                    <Image source={require('../../img/logo.png')}/>
                </Image>
                <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {Alert.alert(
                    'Want to Go Back?',
                    'Your added fields wont save',
                    [
                      {text: 'Go Back', onPress: () => this.setModalVisible(!this.state.modalVisible)},
                      {text: 'Cancel', onPress: () => console.log('Cancel Pressed')}
                    ]
                )}}
                >
                <View>
                    <View>
                    <Header>
                    <Left>
                        <Button transparent onPress={() => {Alert.alert(
                        'Want to Go Back?',
                        'Your added fields wont save',
                        [
                        {text: 'Go Back', onPress: () => this.setModalVisible(!this.state.modalVisible)},
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed')}
                        ]
                        )}}>
                        <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Add Patient</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                        </Button>
                    </Right>
                    </Header>
                    <Item floatingLabel style={styles.formInput}>
                        <Label>Patient Name</Label>
                        <Input
                        onChangeText={(text) => this.setState({patientName: text})} />
                    </Item>
                    <Item floatingLabel style={styles.formInput}>
                        <Label>Disease</Label>
                        <Input
                        onChangeText={(text) => this.setState({patientDisease: text})} />
                    </Item>
                    <Item floatingLabel style={styles.formInput}>
                        <Label>Medications</Label>
                        <Input
                        onChangeText={(text) => this.setState({patientMedications: text})} />
                    </Item>
                    <DatePicker
                    style={{width: 200}}
                    date={this.state.date}
                    mode="datetime"
                    format="YYYY-MM-DD"
                    minDate="2017-01-01"
                    maxDate="2022-04-04"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => this.setState({dateOfArrival: date})}
                    />
                    <Item floatingLabel style={styles.formInput}>
                        <Label>Cost</Label>
                        <Input
                        onChangeText={(text) => this.setState({cost: text})} />
                    </Item>
                    <TouchableOpacity onPress={this.addPatient.bind(this)}><Text>Add</Text></TouchableOpacity>
        
                    {/* <TouchableOpacity onPress={() => {
                        this.setModalVisible(!this.state.modalVisible)
                    }}>
                        <Text>Hide Modal</Text>
                    </TouchableOpacity> */}
        
                    </View>
                </View>
                </Modal>
                <TouchableOpacity onPress={() => {
                this.setModalVisible(true)
                }}>
                <Text>Add Patient</Text>
                </TouchableOpacity>
                <Text>{this.state.user.email}</Text>
                <Item>
                <Icon name="ios-search" />
                <Input placeholder="Search" ref="search" onChangeText={(text) => this.search(text)} value={this.state.text}/>
                <Icon name="ios-people" />
                </Item>
                <TouchableOpacity>
                <Text>Search</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.searchPatient.bind(this)}>
                <Text>Search Patient</Text>
                </TouchableOpacity>
                {searchedPatientData}
                {patientData}
            </ScrollView>
        )
    }
    searchPatient() {
        this.props.navigator.push({
          component: SearchPatient
        });
    }
    
}
