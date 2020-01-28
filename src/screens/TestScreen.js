//WELCOME SCREEN NOTIF ORIGINAL
import React, { useEffect, useState } from 'react';
import { AsyncStorage, Button, Text, StyleSheet, Vibration, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import moment from "moment";

import * as ThemeConstants from '../common/Themes';
import * as firebase from 'firebase';
import '@firebase/firestore';


let welcome_counter= 0;
let home_counter = 1;



// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAw1snBB_7XJxxqTtiW3XdPCzyHqh3LDu4",
    authDomain: "healthyhabeats-cs199.firebaseapp.com",
    databaseURL: "https://healthyhabeats-cs199.firebaseio.com",
    storageBucket: "healthyhabeats-cs199.appspot.com",
  };
  
  //firebase.initializeApp(firebaseConfig);



const TestScreen = ({ navigation }) => {


// Initialize Firebase
const [state, setState] = useState('');


const database = {
    users: {
        userToken1: {
            token:1,
            food: 1
        },
        usertoken2: {
            token:1,
            food:1
        } 

    }
};

    const submitData = () => {
        const firebaseRef = firebase.database().ref();
        firebaseRef.child("Text222").set("Some Value333");
    };




	const saveUserToken = async (userToken) => {
		setState(userToken);
		try {
			await AsyncStorage.setItem('userToken', userToken);
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}
	};
	  
	const getUserToken = async (key) => {
		try {
			const userToken = await AsyncStorage.getItem(key) || 'firstTime'
			setState(userToken);

			return userToken;
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}      
	};

	const deleteUserToken = async (token) => {
		try {
			await AsyncStorage.removeItem(token);
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}
	};
	/////////////////////////////////////////// 
	// USE TO RESET STORAGE
	// deleteUserToken('userToken');
	// deleteUserToken('welcome_counter');
	// deleteUserToken('home_counter');
	// deleteUserToken('userProfile_counter');
	// comment it out again and rebuild
	///////////////////////////////////////////
	
	
	
	


	//Pass Array as second argument
    return( 
		<View style={styles.main}>
			<View style={styles.container}>
				<Text style={styles.text}>Hello WSG!</Text>
				<View style={styles.button}>
					<Button
						title='CONTINUE'
						onPress={ () => {
							if(state === 'firstTime'){
								//saveUserToken('oldUser');
                                //navigation.navigate('Anthropometric');
                                console.log('First Time');
							} else {
                                console.log('Old User');
                                //submitData();
								
							}
						}}
					/>
				</View>
			</View>
		</View>
    );
};

const styles = StyleSheet.create({
	button: {
        // color: ___
        alignItems: 'center',
        margin: ThemeConstants.CONTAINER_MARGIN*1.5,
	},
	container: {
		alignItems: 'center',
		backgroundColor: ThemeConstants.BACKGROUND_WHITE,
        borderRadius: ThemeConstants.CONTAINER_RADIUS,
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN,
        marginTop: ThemeConstants.CONTAINER_MARGIN
	},
    main: {
        backgroundColor: ThemeConstants.BACKGROUND_LIGHT_GRAY,
        flex: 1
	},
	text: {
		fontSize: ThemeConstants.FONT_SIZE_REGULAR,
        fontWeight: 'bold',
        paddingVertical: ThemeConstants.CONTAINER_MARGIN*4
	}
});

export default withNavigation(TestScreen);              