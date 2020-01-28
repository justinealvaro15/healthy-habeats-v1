import React, { useState } from 'react';
import { Text, TextInput, ToastAndroid, StyleSheet, View } from 'react-native';

import { TouchableHighlight } from 'react-native-gesture-handler';

import * as ThemeConstants from '../common/Themes';

const EditServingScreen = ({ navigation }) => {
    let deleteID = 0;
    let counter = 0;

    let foodItem = navigation.getParam('foodItem');
    let foodArray = navigation.getParam('foodArray');
    let setFoodArray = navigation.getParam('setFoodArray');
    let action = navigation.getParam('action');

    const [serving, setServing] = useState(foodItem.serving);

    // console.log(foodItem)

    return(
        <View>
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
                        foodItem.serving = parseFloat(serving);
                        if(action === 'add'){
                            setFoodArray([...foodArray, foodItem]);
                        }
                        else if(action === 'edit'){
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
                        }

                        navigation.navigate('Home');
                        ToastAndroid.show('Saved successfully!', ToastAndroid.LONG);
                    }}
                >
                    <Text style={styles.text_button}>Save</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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

export default EditServingScreen;