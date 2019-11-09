import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'

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
                            <Text>{item.foodName}</Text>
                        )
                    }}
                    showsVerticalScrollIndicator={false}
                />

                <View style={styles.add}>
                    <FontAwesome
                        name='plus-square'
                        onPress={navigateToSearchFood}
                        style={styles.button}
                    />
                    <Text>Add</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    add: {
        alignItems: 'center',
        flexDirection: 'row',

    },
    button: {
        color: 'gray',
        fontSize: 30,
        marginRight: 10
    },
    container: {
        backgroundColor: ThemeConstants.BACKGROUND_WHITE,
        borderRadius: ThemeConstants.CONTAINER_RADIUS,
        marginBottom: ThemeConstants.CONTAINER_MARGIN,
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN
    },
    details: {
        margin: 15
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default IntakeFoodContainer;