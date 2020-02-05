import React, { useEffect, useState } from 'react';
import { AsyncStorage, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Tooltip } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { Feather } from '@expo/vector-icons';

import AnthropometricContainer from '../components/AnthropometricContainer';

import * as ThemeConstants from '../common/Themes';
import * as DbwText from '../common/DbwText';
import Constants from 'expo-constants';


const UserProfileScreen = ({ navigation }) => {
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
        fatExchange: 0,
        activityLevel: 0
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
            const activityLevel = await AsyncStorage.getItem('activityLevel');
            
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
                activityLevel: activityLevel
            });
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}      
    };

    /*const prepareCounter = async () => {
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
	};*/

    useEffect( () => {
        getUserData();
        //prepareCounter();
        //console.log(screen_counter);
        //console.log('USER PROFILE');
    },[]);

    useEffect( () => {
        focusListener = navigation.addListener('didFocus', () => {
			//console.log('Screen Focused');
			//userProfile_counter+=1;
            //saveUserProfileCounter('userProfile_counter', userProfile_counter);
            getUserData();
			//console.log('UserProfile Counter: ' + userProfile_counter);	
		});
	},[]);
	
	

    return (
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}
            showsVerticalScrollIndicator={false}
            style={styles.main}
        >
            <View style={{ justifyContent: 'flex-start' }}>
                <View style={styles.status_bar}/>

                <View>
                    <View style={styles.padding}/>
                    <AnthropometricContainer
                        activityLevel={parseInt(userData.activityLevel)}
                        height={userData.height}
                        weight={userData.weight}
                    />
                </View>

                <TouchableHighlight
                    style={styles.button_edit}
                    onPress={() => navigation.navigate('Anthropometric')}
                    underlayColor={ThemeConstants.HIGHLIGHT_YELLOW}
                >
                    <View>
                        <Text style={styles.text_button}>Edit Personal Details</Text>
                    </View>
                </TouchableHighlight>
            </View>

            <View style={{ justifyContent: 'flex-end' }}>
                <View style={styles.container_blue}>
                    <View style={styles.container_dbw}>
                        <View alignItems='center' flexDirection='row' justifyContent='space-between'>
                            <Text style={styles.text_title}>Ideal Body Weight</Text>
                            <Tooltip 
                                backgroundColor={ThemeConstants.HIGHLIGHT_GRAY}
                                height={100}
                                popover={<Text>{DbwText.tooltip}</Text>}
                                width={250}
                            >
                                <Feather
                                    name='info'
                                    style={styles.info_dbw}
                                />
                            </Tooltip>
                        </View>
                        <View style={styles.details_dbw}>
                            <View style={styles.container_number}>
                                <Text style={styles.text_number}>{userData.DBW} kg</Text>
                            </View>

                            <View style={styles.container_desc}>
                                <Text>
                                    {userData.weight < userData.DBW*0.9 ? DbwText.message[0] :
                                        (userData.weight > userData.DBW*1.1 ? DbwText.message[2] : DbwText.message[1])}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View> 
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    button_edit: {
        backgroundColor: ThemeConstants.MAIN_YELLOW,
        borderRadius: ThemeConstants.CONTAINER_RADIUS,
        flex: 1,
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN*2,
        marginVertical: ThemeConstants.CONTAINER_MARGIN
    },
    container_blue: {
        backgroundColor: ThemeConstants.MAIN_BLUE,
        flex: 1
    },
    container_dbw: {
        backgroundColor: ThemeConstants.MAIN_WHITE,
        marginBottom: ThemeConstants.CONTAINER_MARGIN*1.5,
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN*1.5,
        paddingBottom: ThemeConstants.CONTAINER_MARGIN,
        paddingHorizontal: ThemeConstants.CONTAINER_MARGIN,
        paddingTop: ThemeConstants.CONTAINER_MARGIN/2
    },
    container_number: {
        alignItems: 'center'
    },
    container_desc: {
        flex: 1
    },
    details_dbw: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: ThemeConstants.CONTAINER_MARGIN/2,
    },
    info_dbw: {
        color: ThemeConstants.FONT_GRAY,
        fontSize: ThemeConstants.FONT_SIZE_MEDIUM,
        fontWeight: 'bold'
    },
    padding: {
        backgroundColor: ThemeConstants.MAIN_BLUE,
        height: 75,
        position: 'absolute',
        left: 0,
        right: 0
    },
    status_bar: {
        backgroundColor: ThemeConstants.MAIN_BLUE,
        height: Constants.statusBarHeight
    },
    text_button: {
        alignContent: 'center',
        color: ThemeConstants.MAIN_WHITE,
        fontSize: ThemeConstants.FONT_SIZE_REGULAR,
        fontWeight: 'bold',
        marginVertical: ThemeConstants.CONTAINER_MARGIN/2,
        textAlign: 'center'
    },
    text_header: {
        color: ThemeConstants.MAIN_WHITE,
        fontSize: ThemeConstants.FONT_SIZE_HEADER,
        fontWeight: 'bold',
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN*1.5,
        paddingVertical: ThemeConstants.CONTAINER_MARGIN
    },
    text_number: {
        fontSize: ThemeConstants.FONT_SIZE_MEDIUM,
        fontWeight: 'bold',
        includeFontPadding: false,
        marginRight: ThemeConstants.CONTAINER_MARGIN/2,
        padding: ThemeConstants.CONTAINER_MARGIN/2,
        textTransform: 'uppercase',
        borderWidth: 1,
        borderColor: ThemeConstants.BORDER_GRAY,
        borderRadius: ThemeConstants.CONTAINER_RADIUS
    },
    text_title: {
        color: ThemeConstants.FONT_GRAY,
        fontSize: ThemeConstants.FONT_SIZE_SMALL,
        fontWeight: 'bold'
    },
});

export default withNavigation(UserProfileScreen);