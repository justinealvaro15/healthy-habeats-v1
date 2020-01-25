import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import moment from "moment";

import * as foodData from '../../assets/samplefooditems.json';
import * as ThemeConstants from '../common/Themes';

const FoodResultsList = ({ foodArray, setFoodArray, navigation, results, title, currentDate, deleteID }) => {
    // results === [Food Items]; 
    //      used for filtering search
    // foodArray === [Food Items]; 
    //      passed from Breakfast, Lunch, etc.,
    //      used for adding Food Items at HomeScreen

    // food array
    if(!results.length){
        const data = [];
        const foodItems =[];
        
        // store in array
        for (let i = 0; i < 10; i++) {
            data.push(foodData[i]);

            const foodName = data[i].foodName;
            const id = data[i].id;
            const grams = data[i].grams;
            const calories = data[i].calories;
            const carbs = data[i].carbs;
            const fats = data[i].fats;
            const proteins = data[i].proteins;
            const dateConsumed = data[i].dateConsumed;
            const deleteID = data[i].deleteID
            foodItems.push({id, foodName, grams, calories, carbs, fats, proteins, dateConsumed, deleteID});
        }       
        results = foodItems;
    }
    else{
        results=results;
    }

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <FlatList
                    data={results}
                    keyExtractor = {(result) => result.id}
                    renderItem={({item})=>{
                        return (
                            <TouchableOpacity 
                                style={styles.food}
                                onPress={() => {
                                    item.dateConsumed = moment(currentDate).format('MMMM DD YYYY');
                                    item.deleteID = deleteID
                                    setFoodArray([...foodArray, item])
                                    navigation.navigate('Home')
                                }}
                            >
                                <View>
                                    <Text style={styles.text_regular}>{item.foodName}</Text>
                                    <Text style={styles.text_small}>
                                        Weight: {item.grams} g  •  Energy: {item.calories} kcal
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN*2
    },
    food: {
        // borderBottomColor: ThemeConstants.BORDER_GRAY,
        // borderBottomWidth: 1,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: ThemeConstants.CONTAINER_MARGIN/2,
    },
    main: {
        backgroundColor: ThemeConstants.MAIN_WHITE
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
});

export default withNavigation(FoodResultsList);