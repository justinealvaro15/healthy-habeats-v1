import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import * as foodData from '../samplefooditems.json'
//import {withNavigation} from 'react-navigation';
//destructure props from SearchScreen.js
const FoodResultsList = ({title, results}) => {
   //food array
    if(!results.length){
        const data = [];
        const foodItems =[];
        //store in array
        for (let i = 0; i < 10; i++) {
            data.push(foodData[i]);
            const food = data[i].foodname;
            const id = data[i].id;
            foodItems.push({id, food});
        }
        results = foodItems;
    }
	
    return (
        <View style={styles.container} >
            <Text style={styles.titleStyle}>{title}</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={results}
                keyExtractor = {(result) => result.id}
                renderItem={({item})=>{
                    //2nd argument is passing info to the other screen
                    return (
                        <Text>{item.food}</Text>
                       // <TouchableOpacity onPress={ () => navigation.navigate('ResultsShow',{id: item.id })}> 
                        //<ResultsDetail result={item}/>
                        //</TouchableOpacity>
                    )       
                }}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 5
    },
    container: {
        marginBottom: 10
    }
});

export default FoodResultsList;