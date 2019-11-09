import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Feather } from '@expo/vector-icons';

import * as foodData from '../samplefooditems.json';

const FoodResultsList = ({ foodArray, setFoodArray, navigation, results, title }) => {
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
                data={results}
                keyExtractor = {(result) => result.id}
                renderItem={({item})=>{
                    
                    return (
                        <View>
                            <Text>{item.foodName}</Text>
                            <Button
                                title='Add'
                                onPress={() => {
                                    setFoodArray([...foodArray, item])
                                    navigation.navigate('Home')
                                }}
                            />
                        </View>
                    )
                }}
                showsVerticalScrollIndicator={false}
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

export default withNavigation(FoodResultsList);