import React from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, ListView, Modal, Alert, KeyboardAvoidingView } from 'react-native';
import {Text, Form, Item, List, ListItem, Label, Input, Header, Left, Body, Right, Button, Icon, Title, Card, CardItem, Thumbnail} from 'native-base'
import styles from '../styles/baseStyles.js';
import DatePicker from 'react-native-datepicker'
import SearchPatient from './SearchPatient.js'
import Login from '../login/login';

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
    componentWillUnmount(){
        console.ignoredYellowBox = ['Setting a timer'];
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
            loading: false,
            modalVisible: false,
            showSearchBar: false,
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
                this.setState({searchedPatient: this.state.searchedPatient.concat([JSON.stringify(patient)])})
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
            <View key={patient.id} style={styles.oneBox}>
                <Card style={styles.cardStyle}>
                <CardItem style={styles.innerPading}>
                        <Left style={styles.leftMatter}>
                            <Text style={[styles.lato, styles.forLeft, styles.patientNames]}>{`${patient.text.PatientName}`}</Text>
                            <Text style={[styles.lato, styles.forLeft]}>{`Dis: ${patient.text.Disease}`}</Text>
                            <Text style={[styles.lato, styles.forLeft]}>{`Med: ${patient.text.Medications}`}</Text>
                        </Left>
                        <Right style={styles.rightMatter}>
                            <Text style={[styles.lato, styles.forRight]}>{`${patient.text.DateOfArrival}\n`}</Text>
                            <Text style={[styles.lato, styles.forRight]}>{`Cost: $${patient.text.Cost}`}</Text>
                        </Right>
                </CardItem>
                </Card>
            </View>
        );
        // let stringify = JSON.stringify(this.state.searchedPatient);
        let searchedPatientData = this.state.searchedPatient.map((patientTrack) =>
                {console.log(`Results from Searched Patient Query: ${patientTrack}`)}
                // <View key={`${patientTrack.id}1`} style={styles.oneBox}>
                // <Card style={styles.cardStyle}>
                // <CardItem style={styles.innerPading}>
                //         <Left style={styles.leftMatter}>
                //             <Text style={[styles.lato, styles.forLeft, styles.patientNames]}>{`${patientTrack.text.PatientName}`}</Text>
                //             <Text style={[styles.lato, styles.forLeft]}>{`Dis: ${patientTrack.text.Disease}`}</Text>
                //             <Text style={[styles.lato, styles.forLeft]}>{`Med: ${patientTrack.text.Medications}`}</Text>
                //         </Left>
                //         <Right style={styles.rightMatter}>
                //             <Text style={[styles.lato, styles.forRight]}>{`${patientTrack.text.DateOfArrival}\n`}</Text>
                //             <Text style={[styles.lato, styles.forRight]}>{`Cost: $${patientTrack.text.Cost}`}</Text>
                //         </Right>
                // </CardItem>
                // </Card>
                // </View>
        )
        return(
            <ScrollView>
                <Image source={require('../../img/db_bg.jpg')} style={styles.bgImage}>
                    <Image source={require('../../img/logo.png')}/>
                    <Left style={styles.logoutBtn}>
                        <Button transparent onPress={
                        () => {Alert.alert(
                            'Do you really want to Logout?',
                            `${this.state.user.email}`,
                            [
                              {text: 'Logout', onPress: this.logout.bind(this)},
                              {text: 'Cancel', onPress: () => console.log('Cancel Pressed')}
                            ]
                        )}}>
                        <Icon name='ios-log-out' style={styles.logoutIcon} />
                        </Button>
                    </Left>
                </Image>
                <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                presentationStyle="fullScreen"
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
                    <KeyboardAvoidingView>
                    <Header style={styles.modalHeader}>
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
                        <Title style={styles.title}>Add Patient</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                        </Button>
                    </Right>
                    </Header>
                    <KeyboardAvoidingView style={styles.patientForm}>
                    <Item floatingLabel style={styles.formInput}>
                        <Label>Patient Name</Label>
                        <Input style={styles.font}
                        onChangeText={(text) => this.setState({patientName: text})} />
                    </Item>
                    <Item floatingLabel style={styles.formInput}>
                        <Label>Disease</Label>
                        <Input style={styles.font}
                        onChangeText={(text) => this.setState({patientDisease: text})}/>
                    </Item>
                    <Item floatingLabel style={styles.formInput}>
                        <Label>Medications</Label>
                        <Input style={styles.font}
                        onChangeText={(text) => this.setState({patientMedications: text})}/>
                    </Item>
                    <Item floatingLabel style={styles.formInput}>
                        <Label>Cost</Label>
                        <Input style={styles.font}
                        onChangeText={(text) => this.setState({cost: text})}/>
                    </Item>
                    <Text style={styles.dateLabel}>Date Of Arrival</Text>
                    <DatePicker
                    style={{width: 200, marginTop: 10}}
                    date={this.state.date}
                    mode="datetime"
                    format="MM-DD-YYYY"
                    minDate="01-01-2017"
                    maxDate="04-04-2022"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                    placeholderText="Date Of Arrival"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36,
                    }
                    }}
                    onDateChange={(date) => this.setState({dateOfArrival: date})}
                    />
                    <Button iconLeft onPress={this.addPatient.bind(this)} style={styles.addBtnpt}>
                        <Icon name='ios-add-outline' style={styles.addBtnptIcon} />
                    <Text style={styles.addBtnptText}>Add Patient</Text>
                    </Button>
                    </KeyboardAvoidingView>
                    </KeyboardAvoidingView>
                </View>
                </Modal>
                <View style={styles.alignMent}>
                <Button iconLeft onPress={() => {
                this.setModalVisible(true)
                }} style={styles.btnBtn}>
                <Icon name='ios-person-add-outline' style={styles.btnBtnIcon} />
                <Text style={styles.btnBtnText}>Add Patient</Text>
                </Button>
                <Button iconLeft onPress={() => console.log('search pressed!!')} style={styles.btnBtnSearch}>
                <Icon name='ios-search-outline' style={styles.btnBtnIconSearch} />
                <Text style={styles.btnBtnTextSearch}>Search Patient</Text>
                </Button>
                </View>
                {/* <Item>
                <Icon name="ios-search" />
                <Input placeholder="Search" ref="search" onChangeText={(text) => this.search(text)} value={this.state.text}/>
                <Icon name="ios-people" />
                </Item>
                <TouchableOpacity>
                <Text>Search</Text>
                </TouchableOpacity> */}

                {
                    // searchedPatientData
                }
                
                {patientData.reverse()}
            </ScrollView>
        )
    }
    searchPatient() {
        this.props.navigator.push({
          component: SearchPatient
        });
    }
    
    logout() {
        // logout, once that is complete, return the user to the login screen.
        this.props.firebaseApp.auth().signOut().then(() => {
            Alert.alert(
                'Logged Out',
                'You are Sucessfully Logged out',
            )
            this.props.navigator.push({
            component: Login
            });
        });
    }
    
}
