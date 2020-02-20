import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, YellowBox } from 'react-native';
import { withNavigation } from 'react-navigation';

import FoodResultsList from '../components/FoodResultsList';
import SearchBar from '../components/SearchBar';

import * as ThemeConstants from '../common/Themes';
import { DATABASE_LENGTH } from '../common/Constants';
import * as foodData from '../../assets/foodDatabase.json';
YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested',
    'Setting a timer for a long period of time', // TODO: Remove when fixed
]);
// Store food item data
const data = [];
for (let i = 0; i < DATABASE_LENGTH; i++) {
    data.push(foodData[i]);
}

const filterResultsBySearch = (term) => {
    const foodArray=[];
    //console.log(term);
    if(!term.length){
        return { };
    } else {
        const string_to_check = term.toUpperCase();
        for (let i = 0; i < DATABASE_LENGTH; i++) {
            if(((data[i].foodName).toUpperCase()).includes(string_to_check)){
                const foodName = data[i].foodName;
                const id = (data[i].id).toString();;
                const grams = data[i].grams;
                const calories = data[i].calories;
                const carbs = data[i].carbs;
                const fats = data[i].fats;
                const proteins = data[i].proteins;
                const dateConsumed = data[i].dateConsumed;
                const deleteID = data[i].deleteID;
                const serving = data[i].serving;
                const pieces = data[i].pieces;
                foodArray.push({id, foodName, grams, calories, carbs, fats, proteins, dateConsumed, deleteID, serving, pieces});
            }
        };
        return foodArray;
    }
};

const SearchFoodScreen = ({ navigation }) => {
    const [term, setTerm] = useState('');

    return (
        <View style={styles.main}>
            <SearchBar
                term={term}
                onTermChange={newTerm => setTerm(newTerm)}
                onTermSubmit={(word) => {
                }}
            />

            <TouchableOpacity onPress={() => navigation.navigate('Home')} title='return'/>

            <ScrollView showsVerticalScrollIndicator={false}>
                <FoodResultsList
                    foodArray={navigation.getParam('foodArray')}
                    setFoodArray={navigation.getParam('setFoodArray')}
                    currentDate={navigation.getParam('currentDate')}
                    deleteID = {navigation.getParam('deleteID')}
                    mealTitle = {navigation.getParam('mealTitle')}
                    userID = {navigation.getParam('userID')}
                    setIsModified = {navigation.getParam('setIsModified')}
                    results={filterResultsBySearch(term)}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        backgroundColor: ThemeConstants.MAIN_WHITE,
        flex: 1
    }
});


export default withNavigation(SearchFoodScreen); 