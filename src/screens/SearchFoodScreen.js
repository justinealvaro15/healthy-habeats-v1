import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import FoodResultsList from '../components/FoodResultsList';
import SearchBar from '../components/SearchBar';

import * as ThemeConstants from '../common/Themes';
import * as foodData from '../samplefooditems.json';

// Store food item data
const data = [];
for (let i = 0; i < 10; i++) {
    data.push(foodData[i]);
}

const filterResultsBySearch = (term) => {
    const foodArray=[];

    if(!term.length){
        return { };
    } else {
        const string_to_check = term.toUpperCase();
        for (let i = 0; i < 10; i++) {
            if(((data[i].foodName).toUpperCase()).includes(string_to_check)){
                const foodName = data[i].foodName;
                const id = data[i].id;
                
                foodArray.push({id, foodName});
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
            <Text>{term}</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Home')} title='return'/>

            <ScrollView>
                <FoodResultsList
                    foodArray={navigation.getParam('foodArray')}
                    setFoodArray={navigation.getParam('setFoodArray')}
                    results={filterResultsBySearch(term)}
                    title='Food Items'
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


export default withNavigation(SearchFoodScreen); 