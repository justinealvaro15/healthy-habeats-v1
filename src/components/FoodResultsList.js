import React from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import moment from "moment";

import * as foodData from '../../assets/samplefooditems.json';
import * as ThemeConstants from '../common/Themes';

const FoodResultsList = ({ foodArray, setFoodArray, navigation, results, title, currentDate }) => {
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
            foodItems.push({id, foodName, grams, calories, carbs, fats, proteins, dateConsumed});
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
                                    //console.log(currentDate);
                                    item.dateConsumed = moment(currentDate).format('MMMM DD YYYY');
                                    //console.log(item);
                                    setFoodArray([...foodArray, item])
                                    navigation.navigate('Home')
                                }}
                            >
                                <View>
                                    <Text style={styles.text_regular}>{item.foodName}</Text>
                                    <Text style={styles.text_small}>
                                        Weight: {item.grams} g  •  Energy: {item.calories} kCal
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
    main: {
        backgroundColor: ThemeConstants.BACKGROUND_WHITE
    },
    text_regular: {
        fontSize: ThemeConstants.FONT_SIZE_REGULAR,
        fontWeight: '400'
    },
    text_small: {
        color: ThemeConstants.FONT_GRAY,
        fontSize: ThemeConstants.FONT_SIZE_SMALL
    }
});

export default withNavigation(FoodResultsList);