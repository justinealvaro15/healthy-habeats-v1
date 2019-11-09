import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import * as foodData from '../../assets/samplefooditems.json';

const FoodResultsList = ({ title, results }) => {
   // food array
    if(!results.length){
        const data = [];
        const foodItems =[];

        // store in array
        for (let i = 0; i < 10; i++) {
            data.push(foodData[i]);
            const foodName = data[i].foodName;
            const id = data[i].id;
            foodItems.push({id, foodName});
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
                    return (
                        <Text>{item.foodName}</Text>
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
        marginBottom: 5,
        marginLeft: 15
    },
    container: {
        marginBottom: 10
    }
});

export default FoodResultsList;