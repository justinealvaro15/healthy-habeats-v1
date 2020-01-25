import React, { useEffect, useState } from 'react';
import { AsyncStorage, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Permissions, Notifications } from 'expo';
import Input from '../components/Input';

import * as ThemeConstants from '../common/Themes';

let home_counter = 1;
let userProfile_counter = 1;

const UserProfileScreen = ({ navigation }) => {

    const [hasSwitched, setHasSwitched] = useState(0);

    const [userData, setUserData] = useState({
        weight: 0,
        height: 0,
        DBW: 0,
        TEA: 0,
        bmi: 0,
        bmiAssessment: '',
        calories: 0,
        carbs: 0,
        proteins: 0,
        fats: 0,
        riceExchange: 0,
        meatAndFishExchange: 0,
        fatExchange:0
    });
    
    const saveData = async (key, value) => {
		try {
			await AsyncStorage.setItem(key, value);
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}
	};
	  
	const getUserData = async () => {
		try {
            const height = await AsyncStorage.getItem('height');
            const weight = await AsyncStorage.getItem('weight');
            const bmi = await AsyncStorage.getItem('bmi');
            const bmiAssessment = await AsyncStorage.getItem('bmiAssessment');
            const DBW = await AsyncStorage.getItem('DBW');
            const TEA = await AsyncStorage.getItem('TEA');
            
            const calories = await AsyncStorage.getItem('total_calories');
            const carbs = await AsyncStorage.getItem('total_carbs');
            const proteins = await AsyncStorage.getItem('total_proteins');
            const fats = await AsyncStorage.getItem('total_fats');

            const riceExchange = await AsyncStorage.getItem('riceExchange');
            const meatAndFishExchange = await AsyncStorage.getItem('meatAndFishExchange');
            const fatExchange = await AsyncStorage.getItem('fatExchange');
            
            setUserData({
                height: height,
                weight: weight,
                bmi: bmi,
                bmiAssessment: bmiAssessment,
                DBW: DBW,
                TEA, TEA,
                calories: calories,
                carbs: carbs,
                proteins: proteins,
                fats: fats,
                riceExchange: riceExchange,
                meatAndFishExchange: meatAndFishExchange,
                fatExchange, fatExchange
            });
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}      
    };

    const prepareCounter = async () => {
		try {
			const data2 = await AsyncStorage.getItem('home_counter') || 'empty';
			const data3 = await AsyncStorage.getItem('userProfile_counter') || 'empty';

			if(data2 === 'empty' ){
				
            } else{
                home_counter = parseInt(JSON.parse(data2));
			}
			if(data3 === 'empty' ){
				
            } else{
                userProfile_counter = parseInt(JSON.parse(data3));
               
            }
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
        }    
	};
	const saveUserProfileCounter = async (key,value) => {
		try {
			
			await AsyncStorage.setItem(key,JSON.stringify(value));
			
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}
	};

    useEffect( () => {
        getUserData();
        prepareCounter();
        //console.log(screen_counter);
    },[]);

    useEffect( () => {
        focusListener = navigation.addListener('didFocus', () => {
			//console.log('Screen Focused');
			userProfile_counter+=1;
            saveUserProfileCounter('userProfile_counter', userProfile_counter);
			console.log('UserProfile Counter: ' + userProfile_counter);	
		});
	},[]);
	
	

    return (
        <ScrollView style={styles.main}>
            <View style={styles.container}>
                <View style={styles.details}>
                <Text>Your Height is: {(userData.height)} cm</Text>
                <Text>Your Weight is: {(userData.weight)} kg</Text>
                <Text>Your BMI is: {userData.bmi}</Text>
                <Text>Your BMI Assessment is: {userData.bmiAssessment}</Text>
                <Text>Your Desirable Body Weight is {userData.DBW}</Text>
                <Text>Your Total Energy Allowance is: {userData.TEA} calories</Text>
                <Text>Diet Prescription:</Text>
                <Text>Calories: {userData.calories} calories</Text>
                <Text>Carbohydrates: {userData.carbs} grams</Text>
                <Text>Proteins: {userData.proteins} grams</Text>
                <Text>Fats: {userData.fats} grams</Text>
                <Text>Food Exchanges: </Text>
                {userData.riceExchange < 0 
                    ? <Text>Rice Exchanges: 0</Text>
                    : <Text>Rice Exchanges: {userData.riceExchange}</Text>
                }
                {userData.meatAndFishExchange < 0 
                    ? <Text>Meat and Fish Exchanges: 0 </Text>
                    : <Text>Meat and Fish Exchanges: {userData.meatAndFishExchange}</Text>
                }
                {userData.fatExchange < 0 
                    ? <Text>Fat Exchanges: 0 </Text>
                    : <Text>Fat Exchanges: {userData.fatExchange}</Text>
                }
                </View>
            </View>
        </ScrollView>

        // Insert inside ScrollView
        //     <Text>Your BMI is: {bmi}</Text>
        //     <Text>Your BMI Assessment is: {bmiAssessment}</Text>
        //     <Text>Your Desirable Body Weight is {DBW}</Text>
        //     <Text>Your Total Energy Allowance is: {TEA} calories</Text>
        //     <Text>Calorie Allowance Distribution:</Text>
        //     <Text>Carbohydrates: {distributions.carbsCalorie} calories</Text>
        //     <Text>Proteins: {distributions.proteinsCalorie} calories</Text>
        //     <Text>Fats: {distributions.fatsCalorie} calories</Text>
        //     <Text>Grams Allowance Distribution:</Text>
        //     <Text>Carbohydrates: {distributions.carbs} grams</Text>
        //     <Text>Proteins: {distributions.proteins} grams</Text>
        //     <Text>Fats: {distributions.fats} grams</Text>
        //     <Text>Diet Prescription:</Text>
        //     <Text>Calories: {Math.ceil(TEA/50)*50} {} calories</Text>
        //     <Text>Carbohydrates: {Math.ceil((distributions.carbs)/5)*5} grams</Text>
        //     <Text>Proteins: {Math.ceil((distributions.proteins)/5)*5} grams</Text>
        //     <Text>Fats: {Math.ceil((distributions.fats)/5)*5} grams</Text>
        //     <Text>Food Exchanges: </Text>
        //     {distributions.riceExchange < 0 
        //         ? <Text>Rice Exchanges: 0</Text>
        //         : <Text>Rice Exchanges: {distributions.riceExchange}</Text>
        //     }
        //     {distributions.meatAndFishExchange < 0 
        //         ? <Text>Meat and Fish Exchanges: 0 </Text>
        //         : <Text>Meat and Fish Exchanges: {distributions.meatAndFishExchange}</Text>
        //     }
        //     {distributions.fatExchange < 0 
        //         ? <Text>Fat Exchanges: 0 </Text>
        //         : <Text>Fat Exchanges: {distributions.fatExchange}</Text>
        //     }
    );
};

const styles = StyleSheet.create({
    button: {
        // color: ___
        alignItems: 'center',
        marginTop: ThemeConstants.CONTAINER_MARGIN+5,
    },
    container: {
        backgroundColor: ThemeConstants.BACKGROUND_WHITE,
        borderRadius: ThemeConstants.CONTAINER_RADIUS,
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN,
        marginTop: ThemeConstants.CONTAINER_MARGIN
    },
    details: {
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN+9,
        paddingBottom: 15
    },
    input: {
        flex: 1,
        fontSize: ThemeConstants.FONT_SIZE_REGULAR
    },
    main: {
        backgroundColor: ThemeConstants.BACKGROUND_LIGHT_GRAY,
        flex: 1
    },
    text_header: {
        fontSize: ThemeConstants.FONT_SIZE_REGULAR,
        fontWeight: 'bold',
        paddingVertical: ThemeConstants.CONTAINER_MARGIN-1
    },
    text_regular: {
        borderTopColor: ThemeConstants.BORDER_GRAY,
        borderTopWidth: 1,
        fontSize: ThemeConstants.FONT_SIZE_REGULAR,
        paddingVertical: ThemeConstants.CONTAINER_MARGIN
    }
});

export default withNavigation(UserProfileScreen);