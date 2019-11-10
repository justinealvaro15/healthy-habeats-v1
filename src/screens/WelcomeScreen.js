import React, { useEffect, useState } from 'react';
import { AsyncStorage, Button, Text, StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import * as ThemeConstants from '../common/Themes';

const WelcomeScreen = ({ navigation }) => {
	const [state, setState] = useState('');

	const saveUserToken = async (userToken) => {
		setState(userToken);
		try {
			await AsyncStorage.setItem('userToken', userToken);
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}
	};
	  
	const getUserToken = async () => {
		try {
			const userToken = await AsyncStorage.getItem('userToken') || 'firstTime'
			setState(userToken);

			return userToken;
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}      
	}

	const deleteUserToken = async () => {
		try {
			await AsyncStorage.removeItem('userToken');
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}
	}
	  
	// USE TO RESET STORAGE
	//deleteUserToken();
	// comment it out again and rebuild
	
	useEffect(() => {
		getUserToken();
	}, []);
	
	//Pass Array as second argument
    return( 
		<View>
			<Text style={styles.text}>WelcomeScreen</Text>
			<Button title='CONTINUE' onPress={ () => {
				if(state === 'firstTime'){
					saveUserToken('oldUser');
					navigation.navigate('Anthropometric');
				} else {
					navigation.navigate('Home');
				}
			}}/>
		</View>
    );
};

const styles = StyleSheet.create({
    main: {
        backgroundColor: ThemeConstants.BACKGROUND_LIGHT_GRAY,
        flex: 1
    },
    text:{
        fontSize: 20
    }
});

export default withNavigation(WelcomeScreen);