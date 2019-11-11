import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import ActivityInput from '../components/ActivityInput';
import Input from '../components/Input';

import * as ThemeConstants from '../common/Themes';

const AnthropometricScreen = ({ navigation }) => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] =  useState('');
    const [bmiAssessment, setBmiAssessment] =  useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [activityLevelValue, setActivityLevelValue] = useState(0);
    const [DBW, setDBW] = useState(0);
    const [TEA, setTEA] = useState(0);
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
        const pheight = Math.pow(parseFloat(height)/100,2);
        const result = Math.ceil((parseFloat(weight)/pheight));
        setBmi(result.toString());
        computeActivityLevel();
        if(result<18.5){
            setBmiAssessment('Underweight');
        }
        else if(result >= 18.5 && result <= 24.9){
            setBmiAssessment('Normal');
        }
        else if(result >= 25 && result <= 29.9){
            setBmiAssessment('Overweight');
        }
        else if(result > 30){
            setBmiAssessment('Obese');
        }
    }; 

    const computeActivityLevel = () => {
        var value = 0;

        switch(activityLevel){
            
            case 'Bedrest':
                value = 27.5;
                break;
            case 'Sedentary':
                value = 30;
                break;
            case 'Light':
                value = 35;
                break;
            case 'Moderate':
                value = 40;
                break;
            case 'Very Active':
                value = 45;
                break;
            default:
                value = 35;
                break;
        }
        setActivityLevelValue(value);
        setTEA((weight*value));
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
    }, [TEA]);

    return (
        <ScrollView style={styles.main}>
            <View style={styles.container}>
                <View style={styles.details}>
                    <Text style={styles.text_header}>Weight in kg</Text>
                    <Input
                        input="Weight"
                        term={weight.toString()}
                        onTermChange={newWeight => setWeight(newWeight.toString())}
                    />
                </View>
            </View>

            <View style={styles.container}>
                <View style={styles.details}>
                    <Text style={styles.text_header}>Height in cm</Text>
                    <Input
                        input="Height"
                        term={height.toString()}
                        onTermChange={newHeight => setHeight(newHeight)}
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
                        onTermChange={newTerm => setActivityLevel(newTerm)}
                    />
                </View>
            </View>

            <View style={styles.button}>
                <Button
                    title='Save'
                    onPress={async () => {
                        computeBMI();
                        setDBW((height - 100) - ((height - 100) * 0.1));
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