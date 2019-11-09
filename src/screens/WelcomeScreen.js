import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, AsyncStorage, Button } from 'react-native';
import * as ThemeConstants from '../common/Themes';


const WelcomeScreen = ({navigation}) => {
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
			

			//setState("HATDOG");
			//console.log(userToken);
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
	  
	//USE TO RESET STORAGE
	//deleteUserToken(); 
	//comment it out again and rebuild
	
	useEffect(() => {
       // console.log('useEffect has been called!');
		getUserToken();
		

		//console.log({state});
		//console.log({x});
    },[]); //Pass Array as second argument

    return( <View>
        <Text style={styles.text}>WelcomeScreen</Text>
		<Button title='CONTINUE' onPress={ () => {
	
			if(state === 'firstTime'){
				saveUserToken('oldUser');
				navigation.navigate('Anthropometric');
			}
			else{
				navigation.navigate('SearchFood');
				
				}
			}} 
		/>
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

export default WelcomeScreen;