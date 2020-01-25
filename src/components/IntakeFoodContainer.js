import React, { useState } from 'react';
import { Alert, AsyncStorage, FlatList, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation';
import * as ThemeConstants from '../common/Themes';

// FOODARRAY: contains list of foods in a particular setting
// when pressed => FOODARRAY[INDEX] get the food object
// after deletion setFoodArray to

var totalFood = [];
const deleteData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        // Error retrieving data
        console.log(error.message);
    }
}
const saveData = async (key, value) => {
    try {
        await (AsyncStorage.setItem(key, value));
    } catch (error) {
        // Error retrieving data
        console.log(error.message);
    }
};

const IntakeFoodContainer = ({ food, mealTitle, navigateToSearchFood, onDeletion, onDeletion2, onDeletion3, onDeletion4, onDeletion5, foodArray1, setFoodArray1, navigation }) => {
    const meal = onDeletion5;
    const foodArray = food;
    let x_date = foodArray;
    const [isDelete, setIsDelete] = useState();
    let counter = 0;
    const dateSelected = onDeletion4;

    const setFoodArray = onDeletion;
    
    const setIsDeleted = onDeletion2;
    const setTotalFoodArray = onDeletion3;

    
    return(
        <View style={styles.container}>
            <View style={styles.details}>
                <Text style={styles.text_header}>{mealTitle}</Text>
            
                <FlatList
                    data={x_date}
                    keyExtractor = {(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item,index})=>{
                        return (
                            <TouchableOpacity style={styles.food}
                                onPress = { () => {
                                    console.log(item);
                                    navigation.navigate('EditServing',{
                                        foodArray: foodArray1,
                                        setFoodArray: setFoodArray1,
                                        foodItem: item,
                                        action: 'edit'
                                    });
                                }

                                }
                            >
                                <View>
                                    <Text style={styles.text_regular}>{item.foodName}</Text>
                                    <Text style={styles.text_small}>
                                        Weight: {item.grams} g  •  Energy: {item.calories} kcal
                                    </Text>
                                </View>

                                <View style={styles.button_delete}>
                                    <Feather
                                        name='x-circle'
                                        onPress={() => Alert.alert(
                                            'Are you sure?',
                                            'Remove ' + item.foodName + ' from ' + mealTitle + '?',
                                            [
                                                {
                                                    text: 'Cancel',
                                                    onPress: () => console.log('cancel pressed')
                                                },
                                                {
                                                    text: 'Remove',
                                                    onPress: () => {
                                                        counter = 0;
                                                        let x = foodArray.filter(foodArray => foodArray.foodName !== item.foodName);
                                                        let y = foodArray.filter(foodArray => foodArray.foodName === item.foodName);
                                                        let data = y[0].deleteID;
                                                        
                                                        for (let i = 0; i < meal.length; i++) {
                                                            if (meal[i].deleteID != data ){
                                                                counter = counter + 1;
                                                            }
                                                            else{
                                                                break;
                                                            }
                                                        }
                                                        
                                                        meal.splice(counter,1); // strip in total breakfast [1,2,3]
                                                        
                                                        if (x.length == 0){
                                                            setFoodArray([]);
                                                            setIsDeleted(Math.random());
                                                            setIsDelete(Math.random());
                                                        }
                                                        else{
                                                            setFoodArray(x); //current meal we are setting breakfast to contain
                                                            setTotalFoodArray(meal);
                                                            setIsDeleted(Math.random());
                                                            setIsDelete(Math.random());
                                                        }
                                                    }
                                                }
                                            ]
                                        )}
                                        style={{fontSize: 25, color: ThemeConstants.FONT_GRAY}}
                                    />
                                </View>
                            </TouchableOpacity>
                            //</Swipeout>
                        )
                    }}
                />
            </View>

            <View>
                <TouchableHighlight
                    style={styles.button_add}
                    onPress={navigateToSearchFood}
                    underlayColor={ThemeConstants.HIGHLIGHT_YELLOW}
                >
                    <View>
                        <Text style={styles.text_button}>Add {mealTitle}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    add: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN*2,
        paddingVertical: ThemeConstants.CONTAINER_MARGIN/2,
    },
    button_add: {
        backgroundColor: ThemeConstants.MAIN_YELLOW,
        borderRadius: ThemeConstants.CONTAINER_RADIUS,
        flex: 1,
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN*2,
        marginVertical: ThemeConstants.CONTAINER_MARGIN/2
    },
    button_delete: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    container: {
        backgroundColor: ThemeConstants.MAIN_WHITE,
        marginBottom: ThemeConstants.CONTAINER_MARGIN*0.8
    },
    details: {
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN*2
    },
    food: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: ThemeConstants.CONTAINER_MARGIN/2,
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
        fontSize: ThemeConstants.FONT_SIZE_HEADER,
        fontWeight: 'bold',
        paddingBottom: ThemeConstants.CONTAINER_MARGIN/3
    },
    text_regular: {
        fontSize: ThemeConstants.FONT_SIZE_REGULAR,
        fontWeight: '400',
        paddingBottom: 4
    },
    text_small: {
        color: ThemeConstants.FONT_GRAY,
        fontSize: ThemeConstants.FONT_SIZE_SMALL
    },
    touchable: {
       backgroundColor: 'red' 
    }
});

export default withNavigation(IntakeFoodContainer);