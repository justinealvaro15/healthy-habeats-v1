import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons'

import * as ThemeConstants from '../common/Themes';

const IntakeFoodContainer = ({ food, title, navigateToSearchFood }) => {
    const foodArray = food;

    return(
        <View style={styles.container}>
            <View style={styles.details}>
                <Text style={styles.header}>{title}</Text>

                <FlatList
                    data={foodArray}
                    keyExtractor = {(item) => item.id}
                    renderItem={({item})=>{
                        return (
                            // <Text>{item.foodName}</Text>
                            <TouchableOpacity
                                style={styles.food}
                                onPress={() => console.log(item.foodName + ' is pressed.')}
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

                <TouchableOpacity style={styles.add} onPress={navigateToSearchFood}>
                    <Feather
                        name='plus-circle'
                        style={styles.button}
                    />
                    <Text style={styles.text_light}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    add: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 15,
    },
    button: {
        color: ThemeConstants.BUTTON_LIGHT_GRAY,
        fontSize: 30,
        marginRight: 10
    },
    container: {
        backgroundColor: ThemeConstants.BACKGROUND_WHITE,
        marginBottom: ThemeConstants.CONTAINER_MARGIN
    },
    details: {
        marginHorizontal: 15
    },
    food: {
        borderBottomColor: ThemeConstants.BORDER_GRAY,
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    header: {
        borderBottomColor: ThemeConstants.BORDER_GRAY,
        borderBottomWidth: 1,
        fontSize: ThemeConstants.FONT_SIZE_HEADER,
        fontWeight: 'bold',
        paddingVertical: 10
    },
    text_light: {
        color: ThemeConstants.FONT_GRAY,
        fontSize: ThemeConstants.FONT_SIZE_MEDIUM
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

export default IntakeFoodContainer;