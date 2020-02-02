import React, { useState, useEffect } from 'react';
import { Text, TouchableHighlight, ToastAndroid, StyleSheet, View } from 'react-native';

import * as firebase from 'firebase';
import '@firebase/firestore';

import { Feather } from '@expo/vector-icons';
import * as ThemeConstants from '../common/Themes';


const increment = 0.5;
const min_threshold = 0.5;
const max_threshold = 100.0;

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

    // const foodItem = { "id": "1", "foodName": "Beef Shawarma", "grams": 255, "calories": 315, "carbs": 30, "fats": 15, "proteins": 10, "dateConsumed": "", "deleteID": "", "serving": 1  };
    const [serving, setServing] = useState(foodItem.serving);

    let actionSubmit = '';

    useEffect( () => {
        console.log(mealTitle);
        console.log('User ID: ' + userID);
    }, []);

    const render_top = () => {
        return(
            <View style={styles.top}>
                <View>
                    <Text style={styles.text_header}>{foodItem.foodName}</Text>
                    <Text style={styles.text_servingsize}>{foodItem.grams} grams per serving</Text>
                </View>

                <View style={{ alignItems: 'center', paddingLeft: ThemeConstants.CONTAINER_MARGIN }}>
                    <TouchableHighlight
                        style={styles.button_green}
                        onPress={() => serving>min_threshold ? setServing(serving-increment) : null }
                        underlayColor={ThemeConstants.HIGHLIGHT_GREEN}
                    >
                        <Feather name='minus' style={styles.text_button_green}/>
                    </TouchableHighlight>

                    <View style={styles.container_serving}>
                        <Text style={styles.text_regular}>{serving.toFixed(1)}</Text>
                        <Text style={{ color: ThemeConstants.FONT_GRAY, fontSize: ThemeConstants.FONT_SIZE_SMALL-2 }}>
                            { serving<= 1 ? 'serving' : 'servings' }
                        </Text>
                    </View>

                    <TouchableHighlight
                        style={styles.button_green}
                        onPress={() => serving<max_threshold ? setServing(serving+increment) : null}
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

                <View style={styles.container_details}> 
                    <Text>Calories:</Text>
                    <Text>{foodItem.calories*serving} kcal</Text>
                </View>

                <View style={styles.container_details}> 
                    <Text>Carbohydrates:</Text>
                    <Text>{foodItem.carbs*serving} grams</Text>
                </View>

                <View style={styles.container_details}> 
                    <Text>Proteins:</Text>
                    <Text>{foodItem.proteins*serving} grams</Text>
                </View>

                <View style={styles.container_details}> 
                    <Text>Fats:</Text>
                    <Text>{foodItem.fats*serving} grams</Text>
                </View>

                <View style={styles.container_details}> 
                    <Text>Weight:</Text>
                    <Text>{foodItem.grams*serving} grams</Text>
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
                    if(action === 'add'){
                        setFoodArray([...foodArray, foodItem]);
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

    return(
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View>
                {render_top()}
                {render_mid()}
            </View>
            {render_bot()}
        </View>
    );
};

const styles = StyleSheet.create({
    button_green: {
        backgroundColor: ThemeConstants.MAIN_GREEN,
        borderRadius: ThemeConstants.CONTAINER_RADIUS,
    },
    button_save: {
        backgroundColor: ThemeConstants.MAIN_YELLOW,
        borderRadius: ThemeConstants.CONTAINER_RADIUS,
        margin: ThemeConstants.CONTAINER_MARGIN*1.5
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

const styles2 = StyleSheet.create({
    button: {
        backgroundColor: ThemeConstants.MAIN_YELLOW,
        borderRadius: ThemeConstants.CONTAINER_RADIUS,
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN*2,
        marginTop: ThemeConstants.CONTAINER_MARGIN/2
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    details: {
        alignItems: 'center',
        flex: 1,
        paddingVertical: ThemeConstants.CONTAINER_MARGIN/2
    },
    main: {
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN*2
    },
    input_background: {
        backgroundColor: ThemeConstants.MAIN_WHITE,
        borderBottomWidth: 1,
        borderBottomColor: ThemeConstants.BORDER_GRAY,
        borderTopWidth: 1,
        borderTopColor: ThemeConstants.BORDER_GRAY,
        flexDirection: 'row',
        height: 50,
        marginVertical: ThemeConstants.CONTAINER_MARGIN/2,
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN*2,
    },
    input_title: {
        alignSelf: 'center',
        color: ThemeConstants.FONT_GRAY,
        fontSize: ThemeConstants.FONT_SIZE_SMALL,
        fontWeight: 'bold',
        margin: 10,
        marginRight: 15
    },
    input: {
        flex: 1,
        fontSize: ThemeConstants.FONT_SIZE_REGULAR
    },
    text_button: {
        color: ThemeConstants.MAIN_WHITE,
        fontSize: ThemeConstants.FONT_SIZE_REGULAR,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: ThemeConstants.CONTAINER_MARGIN/2
    },
    text_stat: {
        fontSize: ThemeConstants.FONT_SIZE_MEDIUM,
        fontWeight: 'bold',
    },
    text_header: {
        fontSize: ThemeConstants.FONT_SIZE_HEADER,
        fontWeight: 'bold',
        marginTop: ThemeConstants.CONTAINER_MARGIN*1,
        paddingBottom: ThemeConstants.CONTAINER_MARGIN/3
    },
    text_title: {
        color: ThemeConstants.FONT_GRAY,
        fontSize: ThemeConstants.FONT_SIZE_SMALL,
        fontWeight: 'bold'
    },
});

{/* <View>
        <View style={styles.main}>
            <Text style={styles.text_header}>{foodItem.foodName}</Text>

            <View style={styles.container}>
                <View style={styles.details}>
                    <Text style={styles.text_title}>Calories</Text>
                    <Text style={styles.text_stat}>{Math.round(foodItem.calories*serving*100)/100} kcal</Text>
                </View>
            </View>

            <View style={styles.container}>
                <View style={styles.details}>
                    <Text style={styles.text_title}>Carbs</Text>
                    <Text style={styles.text_stat}>{Math.round(foodItem.carbs*serving*100)/100} g</Text>
                </View>

                <View style={styles.details}>
                    <Text style={styles.text_title}>Fats</Text>
                    <Text style={styles.text_stat}>{Math.round(foodItem.fats*serving*100)/100} g</Text>
                </View>

                <View style={styles.details}>
                    <Text style={styles.text_title}>Proteins</Text>
                    <Text style={styles.text_stat}>{Math.round(foodItem.proteins*serving*100)/100} g</Text>
                </View>
            </View>
        </View>

        <View>
            <View style={styles.input_background}>
                <Text style={styles.input_title}>Number of serving(s):</Text>
                <TextInput
                    keyboardType='numeric'
                    value={serving.toString()}
                    onChangeText={newServing => {
                        setServing(newServing);
                        }
                    }
                    placeholder='Serving count'
                    style={styles.input}
                />
            </View>

            <TouchableHighlight
                style={styles.button}
                underlayColor={ThemeConstants.HIGHLIGHT_YELLOW}
                onPress={() => {
                    Keyboard.dismiss();
                    const isServingValid = serving > 0;
                    if(isServingValid){
                        foodItem.serving = parseFloat(serving);
                        if(action === 'add'){
                            setFoodArray([...foodArray, foodItem]);
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
                            temp = foodArray;
                            temp.push(foodItem);
                        }
                        
                        
                        firebaseRef.child('Users').child(userID).child('Food Intakes').child(mealTitle).set(temp);

                        navigation.navigate('Home');
                        ToastAndroid.show(`${actionSubmit} ${foodItem.foodName} successfully!`, ToastAndroid.SHORT);
                    } else{
                        ToastAndroid.show('Please enter number of food serving(s).', ToastAndroid.SHORT);
                    }
                }}
            >
                <Text style={styles.text_button}>Save</Text>
            </TouchableHighlight>
        </View>
    </View> */}

export default EditServingScreen;