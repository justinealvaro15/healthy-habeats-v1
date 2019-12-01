import React, { useEffect, useState } from 'react';
import { AsyncStorage, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import MotionSlider from 'react-native-motion-slider';

import ActivityInput from '../components/ActivityInput';
import Input from '../components/Input';

import * as ThemeConstants from '../common/Themes';

const AnthropometricScreen = ({ navigation }) => {

    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [DBW, setDBW] = useState(0);
    const [TEA, setTEA] = useState(0);
    const [activityLevel, setActivityLevel] = useState(0);
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
    const activityDescription = 
        "• Bedrest (but mobile; hospital patients)\n" +
        "• Sedentary (mostly sitting)\n" +
        "• Light (tailor, nurse, physician, jeepney driver)\n" +
        "• Moderate (carpenter, painter, heavy housework)\n" +
        "• Very Active (swimming, lumberman, athlete)";

    const computeBMI = () => {
        let a = '';
        const pheight = Math.pow(parseFloat(height)/100,2);
        const result = Math.ceil((parseFloat(weight)/pheight));
        setBmi(result.toString());
        computeActivityLevel();
        if(result<18.5){
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
        else if(result > 30){
            setBmiAssessment('Obese');
            a = 'Obese';
        }
        saveData('weight', JSON.stringify(weight));
        saveData('height', JSON.stringify(height));
        saveData('bmi', JSON.stringify(result));
        saveData('bmiAssessment', a);
    }; 

    const computeActivityLevel = () => {
        let value = 0;
        console.log("HI");
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

        saveData('riceExchange', JSON.stringify( Math.round(((Math.ceil((((weight*value)*0.65)/4)/5)*5)-83)/23)));
        saveData('meatAndFishExchange', JSON.stringify( Math.round(((Math.ceil((((weight*value)*0.15)/4)/5)*5)-24)/8)));
        saveData('fatExchange', JSON.stringify( Math.round(((Math.ceil((((weight*value)*0.2)/9)/5)*5)-19)/5)));
      
        saveData('TEA', JSON.stringify(weight*value));
    };

    useEffect( () => {
        console.log("THIS IS SUMMONED")
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

        saveData('riceExchange', JSON.stringify( Math.round(((Math.ceil((((TEA)*0.65)/4)/5)*5)-83)/23)));
        saveData('meatAndFishExchange', JSON.stringify( Math.round(((Math.ceil((((TEA)*0.15)/4)/5)*5)-24)/8)));
        saveData('fatExchange', JSON.stringify( Math.round(((Math.ceil((((TEA)*0.2)/9)/5)*5)-19)/5)));
        
        saveData('TEA', JSON.stringify(TEA));
       
    }, [TEA]);

    const saveData = async (key, value) => {
		try {
			await AsyncStorage.setItem(key, value);
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}
	};
	  
	const getData = async (key) => {
		try {
			const data = await AsyncStorage.getItem(key);
            return data;
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}      
	};

	const deleteData = async (key) => {
		try {
			await AsyncStorage.removeItem(key);
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}
	};

    return (
        <ScrollView style={styles.main}>
            <MotionSlider
                backgroundColor={[ThemeConstants.MAIN_GREEN]}
                min={0}
                max={250}
                units={'kg'}
                value={50}
                onValueChanged={(input) => setWeight(input)}
            />

            <MotionSlider  
                backgroundColor={[ThemeConstants.MAIN_ORANGE]}
                min={0}
                max={250}
                units={'cm'}
                value={150}
                onValueChanged={(input) => setHeight(input)}
            />

            <MotionSlider  
                backgroundColor={[ThemeConstants.MAIN_BLUE, ThemeConstants.SHADOW_BLUE]}
                min={1}
                max={5}
                value={3}
                onValueChanged={(input) => setActivityLevel(input)}
            />

            <View style={styles.container}>
                <View style={styles.details}>
                    <Text style={styles.text_header}>Weight in kg</Text>
                    <Input
                        input="Weight"
                        term={weight.toString()}
                        onTermChange={newWeight => setWeight(parseInt(newWeight))}
                    />
                </View>
            </View>

            <View style={styles.container}>
                <View style={styles.details}>
                    <Text style={styles.text_header}>Height in cm</Text>
                    <Input
                        input="Height"
                        term={height.toString()}
                        onTermChange={newHeight => setHeight(parseInt(newHeight))}
                    />
                </View>
            </View>

            <View style={styles.container}>
                <View style={styles.details}>
                    {/* <Text style={styles.header}>{activityDescription}</Text> */}
                    <Text style={styles.text_header}>Activity Level</Text>
                    <Text style={styles.text_regular}>{activityDescription}</Text>
                    <ActivityInput
                        input="Activity Level"
                        term={activityLevel}
                        onTermChange={() => console.log('x')}
                        // onTermChange={newTerm => setActivityLevel(newTerm)}
                    />
                </View>
            </View>

            <View style={styles.button}>
                <Button
                    title='Save'
                    onPress={async () => {
                        computeBMI();
                        setDBW((height - 100) - ((height - 100) * 0.1));
                        saveData('DBW', JSON.stringify((height - 100) - ((height - 100) * 0.1)));
                        navigation.replace('Home');
                    }}
                />
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

export default withNavigation(AnthropometricScreen);