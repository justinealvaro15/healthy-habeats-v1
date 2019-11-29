import React, {useState, useEffect} from 'react';
import { AsyncStorage, FlatList, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Button } from 'react-native';
import { Feather } from '@expo/vector-icons'
import Swipeout from 'react-native-swipeout';

import * as ThemeConstants from '../common/Themes';
import { isNull } from 'util';


//FOODARRAY: contains list of foods in a particular setting
//when pressed => FOODARRAY[INDEX] get the food object
//after deletion setFoodArray to
var sample = [
    {
        data: '1',
        id: '1'
    },
    {
        data: '2',
        id: '2'
    },
    {
        data: '3',
        id: '3'
    }
];

// total_breakfast
// total_lunch
// total_dinner
// total_snacks


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

const IntakeFoodContainer = ({ bannerUri, food, highlight, mealTitle, navigateToSearchFood, onDeletion, onDeletion2, onDeletion3, onDeletion4, onDeletion5 }) => {
    const meal = onDeletion5;
    const foodArray = food;
    let x_date = foodArray;
    const [isDelete, setIsDelete] = useState();
    let counter = 0;
    const dateSelected = onDeletion4;
    //console.log(dateSelected);

    const setFoodArray = onDeletion;
    
    const setIsDeleted = onDeletion2;
    const setTotalFoodArray = onDeletion3;

    
    return(
        <View style={styles.container}>
            <Image
                source={bannerUri}
                style={{width: '100%', height: 32}}
            />
            <View style={styles.details}>
                <Text style={styles.text_header}>{mealTitle}</Text>
            
                <FlatList
                    data={x_date}
                    keyExtractor = {(item) => item.id}
                    renderItem={({item,index})=>{
                        return (
                            // <Text>{item.foodName}</Text>
                            //<Swipeout {...swipeSettings}>
                                <TouchableOpacity
                                    style={styles.food}
                                    onPress={() => console.log(item.foodName + ' is pressed.')}
                                >
                                    <View>
                                        <Button
                                           // 1  | 3 4
                                            title='Delete'
                                            onPress={ () => {
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
                                                //console.log(counter);
                                                meal.splice(counter,1); // strip in total breakfast [1,2,3]
                                                //console.log(x);
                                                if (x.length == 0){
                                                    //deleteData('total_'+mealTitle.toLowerCase());
                                                    //deleteData('total_'+mealTitle.toLowerCase());
                                                    setFoodArray([]);
                                                    setIsDeleted(Math.random());
                                                    setIsDelete(Math.random());
                                                }
                                                else{
                                                    
                                                    //console.log(mealTitle.toLowerCase());
                                                    //saveData('total_'+mealTitle.toLowerCase(), JSON.stringify(meal));
                                                    setFoodArray(x); //current meal we are setting breakfast to contain
                                                    setTotalFoodArray(meal);
                                                    //console.log(meal.length);
                                                    

                                                    setIsDeleted(Math.random());
                                                    setIsDelete(Math.random());
                                                }
                                                
                                            }}
                                           
                                        />
                                        <Text style={styles.text_regular}>{item.foodName}</Text>
                                        <Text style={styles.text_small}>
                                            Weight: {item.grams} g  •  Energy: {item.calories} kCal
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            //</Swipeout>
                        )
                    }}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            <View>
                <TouchableHighlight
                    onPress={navigateToSearchFood}
                    underlayColor={highlight}
                    // style={styles.touchable}
                >
                    <View style={styles.add}>
                        <Feather
                            name='plus-circle'
                            style={styles.button}
                        />
                        <Text style={styles.text_light}>Add</Text>
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
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN+9,
        paddingVertical: 15,
    },
    banner: {
        width: 100
    },
    button: {
        fontSize: 30,
        marginRight: 10
    },
    container: {
        backgroundColor: ThemeConstants.BACKGROUND_WHITE,
        marginBottom: ThemeConstants.CONTAINER_MARGIN
    },
    details: {
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN+9
    },
    food: {
        borderBottomColor: ThemeConstants.BORDER_GRAY,
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    text_header: {
        borderBottomColor: ThemeConstants.BORDER_GRAY,
        borderBottomWidth: 1,
        fontSize: ThemeConstants.FONT_SIZE_HEADER,
        fontWeight: 'bold',
        paddingVertical: ThemeConstants.CONTAINER_MARGIN+5
    },
    text_light: {
        fontSize: ThemeConstants.FONT_SIZE_MEDIUM
    },
    text_regular: {
        fontSize: ThemeConstants.FONT_SIZE_REGULAR,
        fontWeight: '400'
    },
    text_small: {
        color: ThemeConstants.FONT_GRAY,
        fontSize: ThemeConstants.FONT_SIZE_SMALL
    },
    touchable: {
       backgroundColor: 'red' 
    }
});

export default IntakeFoodContainer;

   /* const swipeSettings = {
        autoClose: true,
        onClose: (secId, rowId, direction) => {

        },
        onOpen: (secId, rowId, direction) => {

        },
        right: [
            {
                onPress: () => {

                },
                text: 'Delete', type: 'delete'
            }
        ]

    };*/