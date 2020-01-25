import React, { useEffect, useState } from 'react';
import { AsyncStorage, Button, Text, StyleSheet, Vibration, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import moment from "moment";

import * as ThemeConstants from '../common/Themes';


let welcome_counter= 0;
let home_counter = 1;

const WelcomeScreen = ({ navigation }) => {
	
	const [state, setState] = useState('');
	const [isCount, setIsCount] = useState(0);

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
//
	const prepareCounter = async () => {
		try {
			const data1 = await AsyncStorage.getItem('welcome_counter') || 'empty';
			const data2 = await AsyncStorage.getItem('home_counter') || 'empty';

            if(data1 === 'empty' ){
				
            } else{
				welcome_counter = parseInt(JSON.parse(data1));
				
			}
			if(data2 === 'empty' ){
				
            } else{
                home_counter = parseInt(JSON.parse(data2));
			}
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
        }    
	};
	const saveWelcomeCounter = async (key,value) => {
		try {
			
			await AsyncStorage.setItem(key,JSON.stringify(value));
			
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
	useEffect( () => {
		getUserToken('userToken');
		prepareCounter();
	}, []);
	
	useEffect( () => {
        focusListener = navigation.addListener('didFocus', () => {
			//console.log('Screen Focused');
			welcome_counter+=1;
			setIsCount(Math.random());
			console.log('Welcome Counter: ' + welcome_counter);	
		});
	},[]);
	
	useEffect( () => {
		saveWelcomeCounter('welcome_counter', welcome_counter);
	},[isCount]);


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
								saveUserToken('oldUser');
								navigation.navigate('Anthropometric');
							} else {
								navigation.navigate('Home');
								
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

export default withNavigation(WelcomeScreen);