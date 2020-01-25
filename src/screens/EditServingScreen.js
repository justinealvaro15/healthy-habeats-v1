import React, { useState, useEffect } from 'react';
import { AsyncStorage, Button, Text, TextInput , ScrollView, StyleSheet, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

import CalendarStrip from 'react-native-calendar-strip';
import moment from "moment";

import IntakeFoodContainer from '../components/IntakeFoodContainer';
import IntakeWaterContainer from '../components/IntakeWaterContainer';
import StatsContainer from '../components/StatsContainer';

import * as ThemeConstants from '../common/Themes';
import Constants from 'expo-constants';
import { any } from 'prop-types';


            /*const foodName = data[i].foodName;
            const id = data[i].id;
            const grams = data[i].grams;
            const calories = data[i].calories;
            const carbs = data[i].carbs;
            const fats = data[i].fats;
            const proteins = data[i].proteins;
            const dateConsumed = data[i].dateConsumed;
            const deleteID = data[i].deleteID;
            const serving = data[i].serving;*/

const EditServingScreen = ({ navigation }) => {
   
    

    let deleteID = 0;
    let counter = 0;

    let foodItem = navigation.getParam('foodItem');
    let foodArray = navigation.getParam('foodArray');
    let setFoodArray = navigation.getParam('setFoodArray');
    let action = navigation.getParam('action');

    const [serving, setServing] = useState(foodItem.serving);

    //let foodItemEdit = navigation.getParam('foodItemEdit');
    //let foodArrayEdit = navigation.getParam('foodArrayEdit');
    //let setFoodArrayEdit = navigation.getParam('setFoodArrayEdit');
    

    return(
        <View>

            <Text>EditServingScreen</Text>
            <Text>EditServingScreen</Text>
            <Text>EditServingScreen</Text>
            <Text>EditServingScreen</Text>

            <Text>Serving: {foodItem.serving} </Text>
            <Text>Calories: {foodItem.calories * serving } </Text>
            <Text>Carbohydrates: {foodItem.carbs * serving} </Text>
            <Text>Proteins: {foodItem.proteins * serving} </Text>
            <Text>Fats: {foodItem.fats * serving} </Text>




            <TextInput
                keyboardType='numeric'
                value={serving.toString()}
                onChangeText={newServing => {
                    setServing(newServing);
                    }
                }
                placeholder='Serving Count'
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            />
            <Button
                    title = "Submit"
                    style={styles.button}
                    underlayColor={ThemeConstants.HIGHLIGHT_YELLOW}
                    onPress={ () => {
                        //console.log(serving);
                        foodItem.serving = parseFloat(serving);
                        //console.log(foodItem);
                        if(action === 'add'){
                            //console.log("ADD");
                            setFoodArray([...foodArray, foodItem]);
                            //console.log(foodArray);
                        }
                        else if(action === 'edit'){
                            //console.log('EDIT');
                            deleteID = foodItem.deleteID;
                            
                            for (let i = 0; i < foodArray.length; i++) {
                                if (foodArray[i].deleteID != deleteID ){
                                    counter = counter + 1;
                                }
                                else{
                                    break;
                                }
                            }
                            foodArray.splice(counter,1);
                            setFoodArray([...foodArray, foodItem]);
                            //console.log(foodArray);
                        }
                        
                        //console.log('SETT');
                        navigation.navigate('Home');
                    }}
                >
                    <Text style={styles.text_button}>Save</Text>
            </Button>


        </View>
        
    );
};

const styles = StyleSheet.create({
    calendar: {
        height:100,
        paddingTop: 5,
        paddingBottom: 5
    },
    main: {
        backgroundColor: ThemeConstants.MAIN_WHITE,
        flex: 1
    },
    padding: {
        backgroundColor: ThemeConstants.MAIN_BLUE,
        height: 100,
        position: 'absolute',
        left: 0,
        right: 0
    },
    status_bar: {
        backgroundColor: ThemeConstants.MAIN_BLUE,
        height: Constants.statusBarHeight+5
    },
    stats: {
        position: 'relative',
    },
    button: {
        backgroundColor: ThemeConstants.MAIN_YELLOW,
        borderRadius: ThemeConstants.CONTAINER_RADIUS,
        flex: 1,
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN*2,
        marginVertical: ThemeConstants.CONTAINER_MARGIN*1.25
    },
});

export default EditServingScreen;