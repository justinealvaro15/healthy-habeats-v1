import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import PhoneCase from './PhoneCase';
import * as ThemeConstants from '../../common/Themes';

const FoodResultsList = () => {
    const foodArray = [
        { "id": "1", "foodName": "Apple", "grams": 130, "calories": 80  },
        { "id": "3", "foodName": "Chopsuey", "grams": 147, "calories": 112 }
    ];

    const render_inside = () => {
        return (
            <View style={styles.container}>
                <View style={styles.details}>
                    <View style={styles.background}>
                        <Feather name='search' style={styles.icon}/>
                        <Text style={styles.input}>Search for food</Text>
                    </View>

                    <FlatList
                        data={foodArray}
                        keyExtractor = {(result) => result.id}
                        renderItem={({item})=>{
                            return (
                                <View style={styles.food}>
                                    <View>
                                        <Text style={styles.text_regular}>{item.foodName}</Text>
                                        <Text style={styles.text_small}>
                                            Serving Size: {item.grams} g  •  Energy: {item.calories} kcal
                                        </Text>
                                    </View>
                                </View>
                            )
                        }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        );
    };

    return (
        <PhoneCase render_content={render_inside()}/>
    );
};

const styles = StyleSheet.create({
    background: {
        alignItems: 'center',
        backgroundColor: ThemeConstants.MAIN_WHITE,
        borderColor: ThemeConstants.BORDER_GRAY,
        borderRadius: ThemeConstants.CONTAINER_RADIUS,
        borderWidth: 1,
        flexDirection: 'row',
        height: 50,
        marginBottom: ThemeConstants.CONTAINER_MARGIN/2
    },
    container: {
        backgroundColor: ThemeConstants.MAIN_WHITE,
        justifyContent: 'center',
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN*0.5,
        marginTop: ThemeConstants.CONTAINER_MARGIN*1.75,
        paddingTop: ThemeConstants.CONTAINER_MARGIN*0.2
    },
    details: {
        margin: ThemeConstants.CONTAINER_MARGIN,
    },
    food: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: ThemeConstants.CONTAINER_MARGIN/2,
    },
    icon: {
        fontSize: 35,
        alignSelf: 'center',
        margin: 10,
        marginRight: 15
    },
    input: {
        color: ThemeConstants.FONT_GRAY,
        flex: 1,
        fontSize: ThemeConstants.FONT_SIZE_REGULAR
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
    }
});

export default FoodResultsList;