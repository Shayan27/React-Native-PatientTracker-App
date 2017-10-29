import React from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, ListView, Modal, Alert } from 'react-native';
import {Text, Form, Item, List, ListItem, Label, Input, Header, Left, Body, Right, Button, Icon, Title} from 'native-base'
import styles from '../styles/baseStyles.js';
import DatePicker from 'react-native-datepicker'

export default class AddPatient extends React.Component {
    constructor(props) {
        super(props);
    
    console.ignoredYellowBox = ['Setting a timer'];

    // var dateObj = new Date();
    // var month = dateObj.getUTCMonth() + 1; //months from 1-12
    // var day = dateObj.getUTCDate();
    // var year = dateObj.getUTCFullYear();
    
    // newdate = year + "/" + month + "/" + day;

    this.state = {
        loading: true,
        modalVisible: false,
        patientData: [],
            patientName: "",
            patientDisease: "",
            patientMedications: "",
            dateOfArrival: "",
            cost: "",
    };
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

        let patientDataRef = this.props.firebaseApp.database().ref('patientData');
        patientDataRef.on('child_added', snapshot => {
          /* Update React state when Track results are added at Firebase Database */

          
          let patient = { text: snapshot.val(), id: snapshot.key };
          this.setState({ patientData: this.state.patientData.concat(patient)});
        })

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
        this.props.firebaseApp.database().ref('patientData').push({ LoggedInKey:this.state.user.uid,PatientName: this.state.patientName, Disease: this.state.patientDisease, Medications: this.state.patientMedications, DateOfArrival: this.state.dateOfArrival, Cost: this.state.cost});

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
    render() {
        this.state.user.email
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
                    
                    {
                        
                        this.state.patientData.map( patient => 
                        // {if(this.state.user.uid !== patient.text.LoggedInKey){}
                        //  return <Text key={patient.id}>{patient.text.PatientName}, {patient.text.Disease}</Text>
                        // {}}
                        <Text key={patient.id}>{patient.text.PatientName}, {patient.text.Disease}, {patient.text.Medications}, {patient.text.DateOfArrival}, {patient.text.Cost}</Text>
                        )
                        // this.state.patientData.map( patient => <Text key={patient.id}>{patient.text}</Text> )
                        // this.state.patientData.map(function(d,i) {
                        //       return {
                        //         name: d.patientName.toUpperCase(),
                        //         index: i + 1
                        //       };
                        // })
                    }
            </ScrollView>
        )
    }

    componentDidMount() {
        console.ignoredYellowBox = ['Setting a timer'];
        const user = this.props.firebaseApp.auth().currentUser;
    }
}
