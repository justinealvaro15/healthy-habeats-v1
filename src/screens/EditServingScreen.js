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


let quickServing = 0;

const EditServingScreen = ({ navigation }) => {
   
    const [serving, setServing] = useState(0.5);

    let foodItem = navigation.getParam('foodItem');
    let foodArray = navigation.getParam('foodArray');
    let setFoodArray = navigation.getParam('setFoodArray');
    

    return(
        <View>

            <Text>EditServingScreen</Text>
            <Text>EditServingScreen</Text>
            <Text>EditServingScreen</Text>
            <Text>EditServingScreen</Text>
            <TextInput
                keyboardType='numeric'
                term={serving.toString()}
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
                        console.log(foodItem);
                        
                        setFoodArray([...foodArray, foodItem]);
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