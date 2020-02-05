import React, { useEffect, useState } from 'react';
import { AsyncStorage, BackHandler, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableHighlight, View } from 'react-native';
import Slider from "react-native-slider";
import { withNavigation } from 'react-navigation';

import * as ThemeConstants from '../common/Themes';
import * as AnthroText from '../common/AnthropometricText';

const AnthropometricScreen = ({ navigation }) => {
    const [tokenState, setTokenState] = useState('firstTime');
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [DBW, setDBW] = useState(0);
    const [TEA, setTEA] = useState(0);
    const [activityLevel, setActivityLevel] = useState(3);
    const [activityLevelValue, setActivityLevelValue] = useState(0);
    const [bmi, setBmi] =  useState('');
    const [bmiAssessment, setBmiAssessment] =  useState('');
    const [distributions, setDistributions] = useState({ 
        carbsCalorie: 0,
        proteinsCalorie: 0,
        fatsCalorie: 0,
        carbs: 0,
        proteins: 0,
        fats: 0,
        riceExchange: 0,
        meatAndFishExchange: 0,
        fatExchange: 0
    });

    const weightError = 'Please enter your weight.';
    const heightError = 'Please enter your height.';

    const [weightValid, setWeightValid] = useState();
    const [heightValid, setHeightValid] = useState();

    const getUserData = async () => {
        const data1 = await AsyncStorage.getItem('weight') || 0;
        const data2 = await AsyncStorage.getItem('height') || 0;
        const data3 = await AsyncStorage.getItem('activityLevel') || 3;

        setWeight(parseInt(JSON.parse(data1)));
        setHeight(parseInt(JSON.parse(data2)));
        setActivityLevel(parseInt(JSON.parse(data3)));
    };

    const getUserToken = async () => {
		try {
			const userToken = await AsyncStorage.getItem('userToken') || 'firstTime';
            setTokenState(userToken);

			return userToken;
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}      
	};

    const computeBMI = () => {
        let a = '';
        const pheight = Math.pow(parseFloat(height)/100,2);
        const result = Math.ceil((parseFloat(weight)/pheight));
        setBmi(result.toString());
        computeActivityLevel();
        if(result < 18.5){
            setBmiAssessment('Underweight');
            a = 'Underweight';
        }
        else if(result >= 18.5 && result <= 24.9){
            setBmiAssessment('Normal');
            a = 'Normal';
        }
        else if(result >= 25 && result <= 29.9){
            setBmiAssessment('Overweight');
            a = 'Overweight';
        }
        else{
            setBmiAssessment('Obese');
            a = 'Obese';
        }
        saveData('weight', JSON.stringify(weight));
        saveData('height', JSON.stringify(height));
        saveData('bmi', JSON.stringify(result));
        saveData('bmiAssessment', JSON.stringify(a));
        saveData('activityLevel', JSON.stringify(activityLevel));
    }; 

    const computeActivityLevel = () => {
        let value = 0;
        switch(activityLevel){
            case 1:
                value = 27.5;
                break;
            case 2:
                value = 30;
                break;
            case 3:
                value = 35;
                break;
            case 4:
                value = 40;
                break;
            case 5:
                value = 45;
                break;
            default:
                value = 35;
                break;
        }
        setActivityLevelValue(value);
        setTEA((weight*value));
        setDistributions({
            carbsCalorie: (weight*value)*0.65,
            proteinsCalorie: (weight*value)*0.15,
            fatsCalorie: (weight*value)*0.2,
            carbs: ((weight*value)*0.65)/4,
            proteins: ((weight*value)*0.15)/4,
            fats: ((weight*value)*0.2)/9,
            riceExchange: Math.round(((Math.ceil((((weight*value)*0.65)/4)/5)*5)-83)/23),
            meatAndFishExchange: Math.round(((Math.ceil((((weight*value)*0.15)/4)/5)*5)-24)/8),
            fatExchange: Math.round(((Math.ceil((((weight*value)*0.2)/9)/5)*5)-19)/5),
        });
        saveData('total_calories', JSON.stringify(Math.ceil((weight*value)/50)*50));
        saveData('total_carbs', JSON.stringify(Math.ceil((((weight*value)*0.65)/4)/5)*5));
        saveData('total_proteins', JSON.stringify(Math.ceil((((weight*value)*0.15)/4)/5)*5));
        saveData('total_fats', JSON.stringify(Math.ceil((((weight*value)*0.2)/9)/5)*5));

        saveData('riceExchange', JSON.stringify(Math.round(((Math.ceil((((weight*value)*0.65)/4)/5)*5)-83)/23)));
        saveData('meatAndFishExchange', JSON.stringify(Math.round(((Math.ceil((((weight*value)*0.15)/4)/5)*5)-24)/8)));
        saveData('fatExchange', JSON.stringify(Math.round(((Math.ceil((((weight*value)*0.2)/9)/5)*5)-19)/5)));
      
        saveData('TEA', JSON.stringify(weight*value));
    };

    useEffect( () => {
        setDistributions({
            carbsCalorie: TEA*0.65,
            proteinsCalorie: TEA*0.15,
            fatsCalorie: TEA*0.2,
            carbs: (TEA*0.65)/4,
            proteins: (TEA*0.15)/4,
            fats: (TEA*0.2)/9,
            riceExchange: Math.round(((Math.ceil(((TEA*0.65)/4)/5)*5)-83)/23),
            meatAndFishExchange: Math.round(((Math.ceil(((TEA*0.15)/4)/5)*5)-24)/8),
            fatExchange: Math.round(((Math.ceil(((TEA*0.2)/9)/5)*5)-19)/5),
        });
        saveData('total_calories', JSON.stringify(Math.ceil(TEA/50)*50));
        saveData('total_carbs', JSON.stringify(Math.ceil(((TEA*0.65)/4)/5)*5));
        saveData('total_proteins', JSON.stringify(Math.ceil(((TEA*0.15)/4)/5)*5));
        saveData('total_fats', JSON.stringify(Math.ceil(((TEA*0.2)/9)/5)*5));

        saveData('riceExchange', JSON.stringify(Math.round(((Math.ceil((((TEA)*0.65)/4)/5)*5)-83)/23)));
        saveData('meatAndFishExchange', JSON.stringify(Math.round(((Math.ceil((((TEA)*0.15)/4)/5)*5)-24)/8)));
        saveData('fatExchange', JSON.stringify(Math.round(((Math.ceil((((TEA)*0.2)/9)/5)*5)-19)/5)));
        
        saveData('TEA', JSON.stringify(TEA));
    }, [TEA]);

    useEffect( () => {
        getUserData();
        getUserToken();
    },[]);

    useEffect( () => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    },[]);

    const handleBackButton = () => {
        return true;
    };

    const saveData = async (key, value) => {
		try {
			await AsyncStorage.setItem(key, value);
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}
	};
    
    const submit = async () => {
        Keyboard.dismiss();
        computeBMI();
        setDBW((height - 100) - ((height - 100) * 0.1));
        saveData('DBW', JSON.stringify((height - 100) - ((height - 100) * 0.1)));

        if(tokenState === 'firstTime'){
            saveData('userToken', 'oldUser');
            navigation.navigate('UserProfile');
            navigation.navigate('Home');
        } else {
            navigation.navigate('UserProfile');
        }
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        ToastAndroid.show('Saved successfully!', ToastAndroid.SHORT);
    };

    return (
        <KeyboardAvoidingView 
            behavior='padding'
            style={{flex: 1}}
        >
            <ScrollView style={styles.main} keyboardShouldPersistTaps='handled'>
                <View style={styles.container}>
                    <View style={styles.details}>
                        <Text style={styles.text_header}>Weight (kg)</Text>
                        <View style={styles.input_row}>
                            <View style={styles.input}>
                                <TextInput
                                    keyboardType='numeric'
                                    term={weight.toString()}
                                    value = {weight != 0 ? weight.toString() : null}
                                    onChangeText={newWeight => setWeight(newWeight.length === 0 ? 0 : parseInt(newWeight))}
                                    placeholder={weight == 0 ? 'Weight in kg' : null}
                                    style={{flex: 1}}
                                />
                            </View>
                            <Text style={styles.input_converted}>{(weight*2.20462).toFixed(1)} lb</Text>
                        </View>
                        {weightValid === false && <Text style={styles.error}>{weightError}</Text>}
                    </View>
                </View>

                <View style={styles.container}>
                    <View style={styles.details}>
                        <Text style={styles.text_header}>Height (cm)</Text>
                        <View style={styles.input_row}>
                            <View style={styles.input}>
                                <TextInput
                                    keyboardType='numeric'
                                    term={height.toString()}
                                    value = {height != 0 ? height.toString() : null}
                                    onChangeText={newHeight => setHeight(newHeight.length === 0 ? 0 : parseInt(newHeight))}
                                    placeholder={height == 0 ? 'Height in cm' : null}
                                    style={{flex: 1}}
                                />
                            </View>
                            <Text style={styles.input_converted}>
                                {Math.floor((height/2.54)/12)} ft {'\n'}
                                {Math.floor((height/2.54)%12)} in
                            </Text>
                        </View>
                        {heightValid === false && <Text style={styles.error}>{heightError}</Text>}
                    </View>
                </View>

                <View style={styles.container}>
                    <View style={styles.details}>
                        <Text style={styles.text_header}>Activity Level</Text>
                        <Slider
                            value = {activityLevel != 3 ? activityLevel : activityLevel}
                            maximumValue={5}
                            minimumValue={1}
                            onValueChange={(value) => setActivityLevel(value)}
                            step={1}
                        />
                        <Text style={styles.text_regular2}>{AnthroText.activityTitle[activityLevel-1]}</Text>
                        <Text>{AnthroText.activityDesc[activityLevel-1]}</Text>
                    </View>
                </View>

                <TouchableHighlight
                    style={styles.button}
                    underlayColor={ThemeConstants.HIGHLIGHT_YELLOW}
                    onPress={() => {
                        const isWeightValid = weight > 40 && weight < 350;
                        const isHeightValid = height > 120 && height < 275;

                        setWeightValid(isWeightValid);
                        setHeightValid(isHeightValid);
                        
                        if(isWeightValid && isHeightValid){
                            submit();
                        };
                    }}
                >
                    <Text style={styles.text_button}>Save</Text>
                </TouchableHighlight>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: ThemeConstants.MAIN_YELLOW,
        borderRadius: ThemeConstants.CONTAINER_RADIUS,
        flex: 1,
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN*2,
        marginBottom: ThemeConstants.CONTAINER_MARGIN*4,
        marginTop: ThemeConstants.CONTAINER_MARGIN*1.25
    },
    container: {
        backgroundColor: ThemeConstants.MAIN_WHITE,
        borderRadius: ThemeConstants.CONTAINER_RADIUS,
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN*2,
        marginTop: ThemeConstants.CONTAINER_MARGIN*1.25
    },
    details: {
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN,
        paddingBottom: ThemeConstants.CONTAINER_MARGIN
    },
    error: {
        color: 'red',
        paddingTop: 5
    },
    input: {
        borderBottomColor: ThemeConstants.BORDER_GRAY,
        borderBottomWidth: 1,
        borderTopColor: ThemeConstants.BORDER_GRAY,
        borderTopWidth: 1,
        flex: 1,
        flexDirection: 'row',
        fontSize: ThemeConstants.FONT_SIZE_REGULAR,
        marginRight: ThemeConstants.CONTAINER_MARGIN/2,
        paddingVertical: ThemeConstants.CONTAINER_MARGIN/3
    },
    input_converted: {
        alignSelf: 'center'
    },
    input_row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    main: {
        backgroundColor: ThemeConstants.MAIN_BLUE,
        flex: 1
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
        fontSize: ThemeConstants.FONT_SIZE_REGULAR,
        fontWeight: 'bold',
        paddingVertical: ThemeConstants.CONTAINER_MARGIN
    },
    text_regular: {
        fontSize: ThemeConstants.FONT_SIZE_REGULAR,
        paddingVertical: ThemeConstants.CONTAINER_MARGIN
    },
    text_regular2: {
        fontSize: ThemeConstants.FONT_SIZE_REGULAR,
        fontWeight: 'bold',
        paddingBottom: ThemeConstants.CONTAINER_MARGIN/4
    },
    text_subtitle: {
        alignContent: 'center',
        color: ThemeConstants.MAIN_WHITE,
        fontSize: ThemeConstants.FONT_SIZE_REGULAR,
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN*2,
        textAlign: 'center'
    },
    text_title: {
        alignSelf: 'center',
        color: ThemeConstants.MAIN_WHITE,
        fontSize: ThemeConstants.FONT_SIZE_HEADER,
        fontWeight: 'bold',
        marginTop: ThemeConstants.CONTAINER_MARGIN*2,
        paddingVertical: ThemeConstants.CONTAINER_MARGIN*1.25,
    }
});

export default withNavigation(AnthropometricScreen);
