import React from 'react';
import { AsyncStorage, Text, StyleSheet, View } from 'react-native';

import * as ThemeConstants from '../common/Themes';

const TIMER = 2500;

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
	};

	deleteUserToken = async () => {
		try {
			await AsyncStorage.removeItem(token);
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}
	}
	
	componentDidMount() {
		setTimeout(() => {
			// USE TO RESET STORAGE
			// this.deleteUserToken().then(() => 
				this.getUserToken()
			// )
			.then((state) => {
				if(this.state.userToken === 'firstTime'){
					this.saveUserToken('oldUser');
					this.props.navigation.navigate('Anthropometric');
				} else {
					this.props.navigation.navigate('Home');
				}
			})
		}, TIMER);
	}

	render() {
		return(
			<View style={styles.main}>
				<Text>HEALTHY</Text>
				<Text>HABEATS</Text>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	main: {
		alignItems: 'center',
		backgroundColor: ThemeConstants.MAIN_BLUE,
		flex: 1,
		justifyContent: 'center'
	}
});