import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import FoodResultsList from '../components/FoodResultsList';
import * as ThemeConstants from '../common/Themes';
import SearchBar from '../components/SearchBar';
//import useResults from '../hooks/useResults';

import * as foodData from '../samplefooditems.json'
//food array
const data = [];
//store in array
for (let i = 0; i < 10; i++) {
    data.push(foodData[i]);
}

//const {calories, carbs, fats, foodname, grams, id, proteins} = data[5];

//const newdata = data.filter(data => data.foodname === "Pork Adobo");


//const {calories1, carbs1, fats1, foodname1, grams1, id1, proteins1} = newdata[0]; //get result
//console.log(newdata[0].foodname);
//const substring1 = "Adobo";
//const substring2 = "adobo";

//const condition = (newdata[0].foodname).includes(substring1);
/*for (let i = 0; i < 10; i++) {
    if(data[i].foodname.includes(substring1)){
        console.log((data[i].foodname).toUpperCase());
    }
}*/


const SearchFoodScreen = () => {
    const [term, setTerm] = useState('')

	const filterResultsBySearch = (term) => {
        const foodArray=[];
        if(!term.length){
            console.log("NO TERM GIVEN");
            return { };
            
        }
        else{   
            console.log("TERMS");
        const string_to_check = term.toUpperCase();
        for (let i = 0; i < 10; i++) {
            if(((data[i].foodname).toUpperCase()).includes(string_to_check)){
                const food = data[i].foodname;
                const id = data[i].id;
                
                console.log(food.toUpperCase());
                foodArray.push({id, food});
            }     
        };
        return foodArray;
    }
    
};

    return (
        <View style={styles.main}>
            <SearchBar
                term={term}
                onTermChange={newTerm => setTerm(newTerm)}
                onTermSubmit={(word) => {
                    console.log('term submitted')
                    //console.log(word);
                }}
            />
            <Text>{term}</Text>

            <ScrollView>
                <FoodResultsList
                    title="Food Items"
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