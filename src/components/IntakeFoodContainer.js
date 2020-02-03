import React, { useState } from 'react';
import { Alert, AsyncStorage, FlatList, Keyboard, StyleSheet, Text, ToastAndroid, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { withNavigation } from 'react-navigation';
import * as ThemeConstants from '../common/Themes';


import * as firebase from 'firebase';
import '@firebase/firestore';
// FOODARRAY: contains list of foods in a particular setting
// when pressed => FOODARRAY[INDEX] get the food object
// after deletion setFoodArray to

const IntakeFoodContainer = ({ food, mealTitle, navigateToSearchFood, onDeletion, onDeletion2, onDeletion3, onDeletion4, onDeletion5, foodArray1, setFoodArray1, token, setIsModified, navigation }) => {
    const firebaseRef = firebase.database().ref();
    const meal = onDeletion5;
    const foodArray = food;
    let x_date = foodArray;
    let temp = [];
    const [isDelete, setIsDelete] = useState();
    let counter = 0;
    const dateSelected = onDeletion4;

    const setFoodArray = onDeletion;
    
    const setIsDeleted = onDeletion2;
    const setTotalFoodArray = onDeletion3;


    /*const getUserID = async () => {
        try {
            const userID = await AsyncStorage.getItem('userID');
            userTokenID = userID;
            console.log(userID);
            console.log(userTokenID);
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}      
    };*/

    
    return(
        <View style={styles.container}>
            <View style={styles.details}>
                <Text style={styles.text_header}>{mealTitle}</Text>
            
                <FlatList
                    data={x_date}
                    keyExtractor = {(item) => (item.deleteID).toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item,index})=>{
                        return (
                            <TouchableOpacity style={styles.food}
                                onPress = { () => {
                                    // console.log(item);
                                    navigation.navigate('EditServing',{
                                        foodArray: foodArray1,
                                        setFoodArray: setFoodArray1,
                                        foodItem: item,
                                        action: 'edit',
                                        mealTitle : mealTitle,
                                        userID: token,
                                        setIsModified: setIsModified
                                    });
                                }

                                }
                            >
                                <View>
                                    <Text style={styles.text_regular}>{item.foodName}</Text>
                                    <Text style={styles.text_small}>
                                        Serving: {item.serving}  •  Energy: {item.calories * item.serving} kcal
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
                                                       

                                                        temp = [];
                                                        Keyboard.dismiss();
                                                        counter = 0;
                                                        let x = foodArray.filter(foodArray => (foodArray.foodName !== item.foodName) && (foodArray.deleteID !== item.deleteID));
                                                        let y = foodArray.filter(foodArray => (foodArray.foodName === item.foodName) && (foodArray.deleteID === item.deleteID));
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
                                                        temp = meal;
                                                        firebaseRef.child('Users').child(token).child('Food Intakes').child(mealTitle).set(temp);

                                                        ToastAndroid.show(`Removed ${item.foodName} successfully.`, ToastAndroid.SHORT);                                                        
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