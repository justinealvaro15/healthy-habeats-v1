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
								navigation.replace('Home');
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