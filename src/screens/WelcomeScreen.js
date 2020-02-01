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

const scheduledNotification1 = { 
	sound: 'default',
	title: 'Breakfast', 
	body: 'Rise and shine! ☀️ Time to enter your breakfast!' 
};
const scheduledNotification2 = { 
	sound: 'default',
	title: 'Lunch', 
	body: 'Have a healthy and a balanced diet! 🍱 Time to enter your lunch!' 
};
const scheduledNotification3 = { 
	sound: 'default',
	title: 'Dinner', 
	body: 'Your day is almost done! 🌙 Time to enter your dinner!' 
};

const scheduledNotification4 = { 
	sound: 'default',
	title: 'Health Tips', 
	body: 'Eat more vegetables and fruits to get the essential vitamins, minerals, and fiber for regulation of body processes!' 
};
const scheduledNotification5 = { 
	sound: 'default',
	title: 'Health Tips', 
	body: 'Consume fish, lean meat, poultry, eggs, dried beans or nuts daily for growth and repair of body tissues!' 
};
const scheduledNotification6 = { 
	sound: 'default',
	title: 'Health Tips', 
	body: 'Limit intake of salty, fried, fatty and sugar-rich foods to prevent cardiovascular diseases!' 
};
const scheduledNotification7 = { 
	sound: 'default',
	title: 'Health Tips', 
	body: 'Fruit intake can be improved by eating fresh fruits as snacks!' 
};
const scheduledNotification8 = { 
	sound: 'default',
	title: 'Health Tips', 
	body: 'Vegetable intake can be improved by always including vegetables in meals!' 
};
const scheduledNotification9 = { 
	sound: 'default',
	title: 'Health Tips', 
	body: 'Fat intake can be reduced by limiting consumption of baked and fried foods, and pre-packaged snacks and foods!' 
};
const scheduledNotification10 = { 
	sound: 'default',
	title: 'Health Tips', 
	body: 'Remember to choose and eat healthy foods!' 
};
const scheduledNotification11 = { 
	sound: 'default',
	title: 'Health Tips', 
	body: 'Reach your required calorie intake while balancing the intake of your carbs, proteins and fats!' 
};





const TIMER = 2000;
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
firebase.analytics();

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
		registerForPushNotificationsAsync();
		_notificationSubscription = Notifications.addListener(_handleNotification);
		Notifications.cancelAllScheduledNotificationsAsync();
		let currentDate = Date.now();
		currentDate = new Date(currentDate);
		// get the day, month and year from current date to create time to schedule
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();
		const date = currentDate.getDate();
		let time1 = new Date(year, month, date, 07, 00); //7am
		let time2 = new Date(year, month, date, 12, 00); //12nn
		let time3 = new Date(year, month, date, 19, 00); //7pm
		//Notif before-ish lunch and after-ish lunch
		let time4 = new Date(year, month, date, 10, 00); //10am
		let time5 = new Date(year, month, date, 10, 00); //2:30pm
		let time6 = new Date(year, month, date, 17, 30); //5:30pm
		let time7 = new Date(year, month, date, 18, 30); //8:30pm
		
		not0 = Date.parse(not0);
		
		const schedulingOptions1 = { time: time1, repeat: 'day' };
		const schedulingOptions2 = { time: time2, repeat: 'day' };
		const schedulingOptions3 = { time: time3, repeat: 'day' };
		const schedulingOptions4 = { time: time4, repeat: 'day' };
		const schedulingOptions5 = { time: time5, repeat: 'day' };
		const schedulingOptions6 = { time: time6, repeat: 'day' };
		const schedulingOptions7 = { time: time7, repeat: 'day' };
		//B,L,D notifs
		Notifications.scheduleLocalNotificationAsync(scheduledNotification1, schedulingOptions1);
		Notifications.scheduleLocalNotificationAsync(scheduledNotification2, schedulingOptions2);
		Notifications.scheduleLocalNotificationAsync(scheduledNotification3, schedulingOptions3);
		//4 healthy tips notif
		//4-12
		const winner_array = [scheduledNotification4, scheduledNotification5, scheduledNotification6, scheduledNotification7, scheduledNotification8, scheduledNotification9, scheduledNotification10, scheduledNotification11]
		let winner = Math.floor(Math.random() * 8 );
		let winner2 = Math.floor(Math.random() * 8 );

		while(true){
			if(winner2 == winner){
				winner2 = Math.floor(Math.random() * 8 );
			}else{
				console.log('BREAK');
				break;
			}
		};

		Notifications.scheduleLocalNotificationAsync(winner_array[winner], schedulingOptions4);
		Notifications.scheduleLocalNotificationAsync(winner_array[winner2], schedulingOptions5);
		Notifications.scheduleLocalNotificationAsync(winner_array[winner], schedulingOptions6);
		Notifications.scheduleLocalNotificationAsync(winner_array[winner2], schedulingOptions7);
		console.log('Notifications Scheduled successfully!');
		setTimeout(() => {
			
			// USE TO RESET STORAGE
			//  this.deleteUserToken().then(() => 
				this.getUserToken()
			//  )
			.then((state) => {
				//Notifications.presentLocalNotificationAsync(localNotification);
				if(this.state.userToken === 'firstTime'){
					this.saveUserToken('oldUser');
					this.props.navigation.replace('Tutorial1');
				} else {
					this.props.navigation.replace('Home');
				}
			})
		}, TIMER);
	}

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
		width: ratio*350
	},
	main: {
		alignItems: 'center',
		backgroundColor: ThemeConstants.MAIN_BLUE,
		flex: 1,
		justifyContent: 'center'
	}
});