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


	const localNotification = { 
		sound: 'default',
		title: 'Local Notifications', 
		body: 'Done!' 
	};
	const scheduledNotification = { 
		sound: 'default',
		title: 'Scheduled Local Notifications', 
		body: 'Delivered!' 
	};
	const schedulingOptions = {

	};

	const [expoState, setExpoState] = useState({
		expoPushToken : '',
		notification: {},
	  });

	

	  registerForPushNotificationsAsync = async () => {
		if (Constants.isDevice) {
		  const { status: existingStatus } = await Permissions.getAsync(
			Permissions.NOTIFICATIONS
		  );
		  let finalStatus = existingStatus;
		  if (existingStatus !== 'granted') {
			const { status } = await Permissions.askAsync(
			  Permissions.NOTIFICATIONS
			);
			finalStatus = status;
		  }
		  if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		  }
		  let token = await Notifications.getExpoPushTokenAsync();
		  //console.log(token);
		  setExpoState({expoPushToken: token});
		} else {
		  alert('Must use physical device for Push Notifications');
		}
	  }; 

	  useEffect(() => {
			registerForPushNotificationsAsync();
			_notificationSubscription = Notifications.addListener(
				_handleNotification
			  );
		
	},[]);

	
	_handleNotification = notification => {
		Vibration.vibrate();
		setExpoState({ notification: notification });
	};

	sendPushNotification = async () => {
		const message = {
		  to: expoState.expoPushToken,
		  sound: 'default',
		  title: 'Welcome to EatUP',
		  body: 'Be healthy and stay fit!',
		  data: { data: 'SAMPLE DATA' },
		};
		const response = await fetch('https://exp.host/--/api/v2/push/send', {
		  method: 'POST',
		  headers: {
			Accept: 'application/json',
			'Accept-encoding': 'gzip, deflate',
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(message),
		});
		const data = response._bodyInit;
		console.log(`Status & Response ID-> ${JSON.stringify(data)}`);
	  };

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
								sendPushNotification();
								//navigation.replace('Home');
								Notifications.presentLocalNotificationAsync(localNotification);
								Notifications.cancelAllScheduledNotificationsAsync();
								let currentDate = Date.now();
								currentDate = new Date(currentDate);
								// get the day, month and year from current date to create time to schedule
								let year = currentDate.getFullYear();
								let month = currentDate.getMonth();
								let date = currentDate.getDate();
								let not0 = new Date(year, month, date, 22, 36);
								//console.log(not0);
								not0 = Date.parse(not0);
								//console.log(not0);
								const schedulingOptions = { time: not0, repeat: 'minute' };
								//Notifications.scheduleLocalNotificationAsync(scheduledNotification, schedulingOptions);
								
								
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