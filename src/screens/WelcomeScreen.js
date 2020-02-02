import React from 'react';
import { AsyncStorage, Dimensions, Image, StyleSheet, Vibration, View } from 'react-native';

import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import * as ThemeConstants from '../common/Themes';
import * as firebase from 'firebase';
import '@firebase/firestore';

import * as NotificationsText from '../common/NotificationsText';


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
		const current_date = currentDate.getDate();
		const tomorrow_date = currentDate.getDate() + 1;
		const hour = currentDate.getHours();
		let time1 = 0;
		let time2 = 0;
		let time3 = 0;
		let time4 = 0;
		let time5 = 0;
		let time6 = 0;
		let time7 = 0;

		let temp_date1 = new Date();
		let temp_date2 = new Date();
		let temp_date3 = new Date();

		temp_date1.setHours(14,30);
		temp_date2.setHours(17,30);
		temp_date3.setHours(20,30);

		//notif#1 check: current_hour > 7am, set notif for 7am tommorow 
		if(hour >= 7){
			console.log('7am tom');
			time1 = new Date(year, month, tomorrow_date, 7); //7am tomorrow
		}else{
			console.log('7am today');
			time1 = new Date(year, month, current_date, 7); //7am today
		};
		if(hour >= 12){
			console.log('12nn tom');
			time2 = new Date(year, month, tomorrow_date, 12); //12nn
		}else{
			console.log('12nn today');
			time2 = new Date(year, month, current_date, 12); //12nn
		};
		if(hour >= 19){
			console.log('7pm tom');
			time3 = new Date(year, month, tomorrow_date, 19); //7pm
		}else{
			console.log('7pm today');
			time3 = new Date(year, month, current_date, 19); //7pm
		};
		//tips/notifs
		if(hour >= 10){
			console.log('10am tom');
			time4 = new Date(year, month, tomorrow_date, 10); //10am
		}else{
			console.log('10am today');
			time4 = new Date(year, month, current_date, 10); //10am
		};
		if(currentDate > temp_date1){
			console.log('2:30pm tom');
			time5 = new Date(year, month, tomorrow_date, 14, 30); //2:30pm
		}else{
			console.log('2:30pm today');
			time5 = new Date(year, month, current_date, 14, 30); //2:30pm
		};
		if(currentDate > temp_date2){
			console.log('5:30pm tom');
			time6 = new Date(year, month, tomorrow_date, 17, 30); //5:30pm
		}else{
			console.log('5:30pm today');
			time6 = new Date(year, month, current_date, 17, 30); //5:30pm
		};
		if(currentDate > temp_date3){
			console.log('8:30pm tom');
			time7 = new Date(year, month, tomorrow_date, 20, 30); //8:30pm
		}else{
			console.log('8:30pm today');
			time7 = new Date(year, month, current_date, 20, 30); //8:30pm
		};
		time1 = Date.parse(time1);
		time2 = Date.parse(time2);
		time3 = Date.parse(time3);
		time4 = Date.parse(time4);
		time5 = Date.parse(time5);
		time6 = Date.parse(time6);
		time7 = Date.parse(time7);

		const schedulingOptions1 = { time: time1, repeat: 'day' };
		const schedulingOptions2 = { time: time2, repeat: 'day' };
		const schedulingOptions3 = { time: time3, repeat: 'day' };
		const schedulingOptions4 = { time: time4, repeat: 'day' };
		const schedulingOptions5 = { time: time5, repeat: 'day' };
		const schedulingOptions6 = { time: time6, repeat: 'day' };
		const schedulingOptions7 = { time: time7, repeat: 'day' };
		//B,L,D notifs
		Notifications.scheduleLocalNotificationAsync(NotificationsText.scheduledNotification1, schedulingOptions1);
		Notifications.scheduleLocalNotificationAsync(NotificationsText.scheduledNotification2, schedulingOptions2);
		Notifications.scheduleLocalNotificationAsync(NotificationsText.scheduledNotification3, schedulingOptions3);
		//4 healthy tips notif
		//4-12
		const winner_array = [NotificationsText.scheduledNotification4, NotificationsText.scheduledNotification5, NotificationsText.scheduledNotification6, NotificationsText.scheduledNotification7, NotificationsText.scheduledNotification8, NotificationsText.scheduledNotification9, NotificationsText.scheduledNotification10, NotificationsText.scheduledNotification11]
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