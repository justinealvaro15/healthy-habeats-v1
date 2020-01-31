import React from 'react';
import { AsyncStorage, Dimensions, Image, StyleSheet, Vibration, View } from 'react-native';

import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import * as ThemeConstants from '../common/Themes';
import * as firebase from 'firebase';
import '@firebase/firestore';


const localNotification = { 
	sound: 'default',
	title: 'Welcome to Healthy HabEATS!!', 
	body: 'Testing!' 
};

const TIMER = 3000;
const dimensions = Dimensions.get('window');
const ratio = dimensions.width/350*0.7;

let token = 0;

const firebaseConfig = {
    apiKey: "AIzaSyAw1snBB_7XJxxqTtiW3XdPCzyHqh3LDu4",
    authDomain: "healthyhabeats-cs199.firebaseapp.com",
    databaseURL: "https://healthyhabeats-cs199.firebaseio.com",
    storageBucket: "healthyhabeats-cs199.appspot.com",
  };

  

	firebase.initializeApp(firebaseConfig);

	_handleNotification = notification => {
		Vibration.vibrate();
	};

	saveExpoToken = async (token) => {
		try {
			await AsyncStorage.setItem('userID', token);
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}
	};

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
		  token = await Notifications.getExpoPushTokenAsync();
		  token = token.slice(18,40);
		  console.log(token);
		  saveExpoToken(token);
		} else {
		  alert('Must use physical device for Push Notifications');
		}
	  }; 

	
export default class WelcomeScreen extends React.Component {



	saveUserToken = async (userToken) => {
		this.setState({ userToken });
		try {
			await AsyncStorage.setItem('userToken', userToken);
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}
	};
	
		
	getUserToken = async () => {
		try {
			const userToken = await AsyncStorage.getItem('userToken') || 'firstTime'
			this.setState(state => {
				return {
					userToken
				};
			})

			return userToken;
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}      
	}

	deleteUserToken = async () => {
		try {
			await AsyncStorage.removeItem('userToken');
			await AsyncStorage.removeItem('weight');
			await AsyncStorage.removeItem('height');
			await AsyncStorage.removeItem('activityLevel');
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}
	}
	
	componentDidMount() {
		setTimeout(() => {
			registerForPushNotificationsAsync();
			_notificationSubscription = Notifications.addListener(_handleNotification);
			// USE TO RESET STORAGE
			//  this.deleteUserToken().then(() => 
				this.getUserToken()
			//  )
			.then((state) => {
				Notifications.presentLocalNotificationAsync(localNotification);
				if(this.state.userToken === 'firstTime'){
					this.saveUserToken('oldUser');
					
					this.props.navigation.replace('Anthropometric');
				} else {
					
					this.props.navigation.replace('Home');
					
				}
			})
		}, TIMER);
	}

	//Pass Array as second argument
	render() {
		return(
			<View style={styles.main}>
				<Image source={require('../../assets/logo.png')} style={styles.logo}/>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	logo: {
		height: ratio*380,
		width: dimensions.width*0.7
	},
	main: {
		alignItems: 'center',
		backgroundColor: ThemeConstants.MAIN_BLUE,
		flex: 1,
		justifyContent: 'center'
	}
});