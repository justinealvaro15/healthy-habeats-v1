import React, { useState, useEffect } from 'react';
import { Text, TouchableHighlight, ToastAndroid, ScrollView, StyleSheet, View } from 'react-native';

import * as firebase from 'firebase';
import '@firebase/firestore';

import { Feather } from '@expo/vector-icons';
import * as ThemeConstants from '../common/Themes';

const increment = 0.5;
const minThreshold = 0.5;
const maxThreshold = 100.0;

const EditServingScreen = ({ navigation }) => {
    const firebaseRef = firebase.database().ref();

    let deleteID = 0;
    let counter = 0;
    let temp = [];

    let foodItem = navigation.getParam('foodItem');
    let foodArray = navigation.getParam('foodArray');
    let setFoodArray = navigation.getParam('setFoodArray');
    let action = navigation.getParam('action');
    let mealTitle = navigation.getParam('mealTitle');
    let userID = navigation.getParam('userID');
    let setIsModified = navigation.getParam('setIsModified');

    const [serving, setServing] = useState(foodItem.serving);
    const [pieces, setPieces] = useState(foodItem.pieces);

    let actionSubmit = '';

    useEffect( () => {
        //console.log(mealTitle);
        //console.log('User ID: ' + userID);
    }, []);

    const render_top = () => {
        return(
            <View style={styles.top}>
                <View style={{flex: 4}}>
                    <Text style={styles.text_header}>{foodItem.foodName}</Text>
                    <Text style={styles.text_servingsize}>{foodItem.grams} grams per serving</Text>
                    { pieces > 0 ? render_pieces() : null }
                </View>

                <View style={{ alignItems: 'center', flex: 1, paddingLeft: ThemeConstants.CONTAINER_MARGIN }}>
                    <TouchableHighlight
                        style={styles.button_green}
                        onPress={() => {
                            if(serving>minThreshold){
                                setServing(serving-increment);
                                setPieces(pieces)
                            }
                        }
                        }
                        underlayColor={ThemeConstants.HIGHLIGHT_GREEN}
                    >
                        <Feather name='minus' style={styles.text_button_green}/>
                    </TouchableHighlight>

                    <View style={styles.container_serving}>
                        <Text style={styles.text_regular}>{serving.toFixed(1)}</Text>
                        <Text style={{ color: ThemeConstants.FONT_GRAY, fontSize: ThemeConstants.FONT_SIZE_SMALL-2 }}>
                            { serving <= 1 ? 'serving' : 'servings' }
                        </Text>
                    </View>

                    <TouchableHighlight
                        style={styles.button_green}
                        onPress={() => serving<maxThreshold ? setServing(serving+increment) : null}
                        onPress={() => {
                            if(serving<maxThreshold){
                                setServing(serving+increment);
                                setPieces(pieces)
                            }
                        }
                        }
                        underlayColor={ThemeConstants.HIGHLIGHT_GREEN}
                    >
                        <Feather name='plus' style={styles.text_button_green}/>
                    </TouchableHighlight>
                </View>
            </View>
        );
    };

    const render_mid = () => {
        return (
            <View style={{ padding: ThemeConstants.CONTAINER_MARGIN*1.5 }}>
                <Text style={[styles.text_regular, styles.divider]}>Total</Text>

                { pieces > 0 ? render_total_pieces() : null }

                <View style={styles.container_details}> 
                    <Text>Calories:</Text>
                    <Text>{Math.round(foodItem.calories*serving*100)/100} kcal</Text>
                </View>

                <View style={styles.container_details}> 
                    <Text>Carbohydrates:</Text>
                    <Text>{Math.round(foodItem.carbs*serving*100)/100} grams</Text>
                </View>

                <View style={styles.container_details}> 
                    <Text>Proteins:</Text>
                    <Text>{Math.round(foodItem.proteins*serving*100)/100} grams</Text>
                </View>

                <View style={styles.container_details}> 
                    <Text>Fats:</Text>
                    <Text>{Math.round(foodItem.fats*serving*100)/100} grams</Text>
                </View>

                <View style={styles.container_details}> 
                    <Text>Weight:</Text>
                    <Text>{Math.round(foodItem.grams*serving*100)/100} grams</Text>
                </View>
            </View>
        );
    };

    const render_bot = () => {
        return(
            <TouchableHighlight
                style={styles.button_save}
                underlayColor={ThemeConstants.HIGHLIGHT_YELLOW}
                onPress={() => {
                    foodItem.serving = parseFloat(serving);
                    foodItem.pieces = parseFloat(pieces);
                    if(action === 'add'){
                        setFoodArray([...foodArray, foodItem]);
                        setIsModified(1);
                        temp = foodArray;
                        temp.push(foodItem);
                        actionSubmit = 'Added';
                    }
                    else if(action === 'edit'){
                        temp = [];
                        deleteID = foodItem.deleteID;
                        actionSubmit = 'Edited';
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
                        setIsModified(1);
                        temp = foodArray;
                        temp.push(foodItem);
                    }
                    
                    firebaseRef.child('Users').child(userID).child('Food Intakes').child(mealTitle).set(temp);

                    navigation.navigate('Home');
                    ToastAndroid.show(`${actionSubmit} ${foodItem.foodName} successfully!`, ToastAndroid.SHORT);
                }}
            >
                <Text style={styles.text_button_save}>Save</Text>
            </TouchableHighlight>
        );
    };

    const render_pieces = () => {
        return <Text style={styles.text_servingsize}>{foodItem.pieces} {foodItem.pieces <= 1 ? 'piece' : 'pieces'} per serving</Text>;
    };

    const render_total_pieces = () => {
        return (
            <View style={styles.container_details}> 
                <Text>Pieces:</Text>
                <Text>{Math.round(foodItem.pieces*serving*100)/100} {pieces*serving <= 1 ? 'piece' : 'pieces'}</Text>
            </View>
        );
    };

    return(
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}
        >
            <View style={{ justifyContent: 'flex-start' }}>
                {render_top()}
                {render_mid()}
            </View>
            
            <View style={{ justifyContent: 'flex-end' }}>
                {render_bot()}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    button_green: {
        backgroundColor: ThemeConstants.HIGHLIGHT_GREEN,
        borderRadius: ThemeConstants.CONTAINER_RADIUS,
    },
    button_save: {
        backgroundColor: ThemeConstants.MAIN_YELLOW,
        borderRadius: ThemeConstants.CONTAINER_RADIUS,
        marginBottom: ThemeConstants.CONTAINER_MARGIN*1,
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN*1.5,
        marginTop: ThemeConstants.CONTAINER_MARGIN*1.5
    },
    container_details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: ThemeConstants.CONTAINER_MARGIN/3
    },
    container_serving: {
        alignItems: 'center',
        backgroundColor: ThemeConstants.MAIN_WHITE,
        paddingVertical: ThemeConstants.CONTAINER_MARGIN/2,
        marginVertical: ThemeConstants.CONTAINER_MARGIN/2,
        width: 80
    },
    divider: {
        borderBottomColor: ThemeConstants.BORDER_GRAY,
        borderBottomWidth: 1,
        paddingBottom: ThemeConstants.CONTAINER_MARGIN/3,
        marginBottom: ThemeConstants.CONTAINER_MARGIN/3
    },
    text_button_green: {
        alignContent: 'center',
        color: ThemeConstants.MAIN_WHITE,
        fontSize: ThemeConstants.FONT_SIZE_REGULAR,
        fontWeight: 'bold',
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN,
        marginVertical: ThemeConstants.CONTAINER_MARGIN/2,
        textAlign: 'center'
    },
    text_button_save: {
        color: ThemeConstants.MAIN_WHITE,
        fontSize: ThemeConstants.FONT_SIZE_REGULAR,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: ThemeConstants.CONTAINER_MARGIN/2
    },
    text_header: {
        color: ThemeConstants.MAIN_WHITE,
        fontSize: ThemeConstants.FONT_SIZE_HEADER,
        fontWeight: 'bold',
    },
    text_regular: {
        fontSize: ThemeConstants.FONT_SIZE_REGULAR,
        fontWeight: 'bold'
    },
    text_servingsize: {
        color: ThemeConstants.MAIN_WHITE,
        fontSize: ThemeConstants.FONT_SIZE_REGULAR,
    },
    top: {
        backgroundColor: ThemeConstants.MAIN_BLUE,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: ThemeConstants.CONTAINER_MARGIN
    },
});

export default EditServingScreen;