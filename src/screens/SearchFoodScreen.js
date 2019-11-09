import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, AsyncStorage } from 'react-native';

import FoodResultsList from '../components/FoodResultsList';
import SearchBar from '../components/SearchBar';

import * as ThemeConstants from '../common/Themes';
import * as foodData from '../../assets/samplefooditems.json';

// Store food item data
const data = [];
for (let i = 0; i < 10; i++) {
    data.push(foodData[i]);
}

const filterResultsBySearch = (term) => {
    const foodArray=[];
    if(!term.length){
        console.log('NO TERM GIVEN');
        return { };
    } else {   
        console.log('TERMS');
        const string_to_check = term.toUpperCase();
        for (let i = 0; i < 10; i++) {
            if(((data[i].foodName).toUpperCase()).includes(string_to_check)){
                const foodName = data[i].foodName;
                const id = data[i].id;
                
                console.log(foodName.toUpperCase());
                foodArray.push({id, foodName});
            }     
        };
        return foodArray;
    }
};

const SearchFoodScreen = () => {
    const [term, setTerm] = useState('')

    return (
        <View style={styles.main}>
            <SearchBar
                term={term}
                onTermChange={newTerm => setTerm(newTerm)}
                onTermSubmit={(word) => {
                    console.log('term submitted')
                }}
            />
            <Text>{term}</Text>

            <ScrollView>
                <FoodResultsList
                    title='Food Items'
                    results={filterResultsBySearch(term)}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        backgroundColor: ThemeConstants.BACKGROUND_LIGHT_GRAY,
        flex: 1
    }
});


export default SearchFoodScreen; 