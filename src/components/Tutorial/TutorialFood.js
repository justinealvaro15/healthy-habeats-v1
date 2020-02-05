import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import PhoneCase from './PhoneCase';
import { Feather } from '@expo/vector-icons';
import * as ThemeConstants from '../../common/Themes';


const TutorialFood = () => {
    const foodArray = [
        { "id": "1", "foodName": "Beef Shawarma", "calories": 315, "serving": 1  }
    ];
    
    const render_inside = () => {
        return(
            <View style={styles.main}>
                <View style={styles.details}>
                    <View>
                        <Text style={styles.text_header}>Breakfast</Text>
                        <FlatList
                            data={foodArray}
                            keyExtractor = {(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item,index})=>{
                                return (
                                    <View style={styles.food}>
                                        <View>
                                            <Text style={styles.text_regular}>{item.foodName}</Text>
                                            <Text style={styles.text_small}>
                                                Serving: {item.serving}  •  Energy: {item.calories * item.serving} kcal
                                            </Text>
                                        </View>

                                        <View style={styles.button_delete}>
                                            <Feather
                                                name='x-circle'
                                                style={{fontSize: 25, color: ThemeConstants.FONT_GRAY}}
                                            />
                                        </View>
                                    </View>
                                )
                            }}
                        />
                    </View>

                    <View style={styles.button_add}>
                        <Text style={styles.text_button}>Add Breakfast</Text>
                    </View>
                </View>
            </View>
        );
    };

    return(
        <PhoneCase render_content={render_inside()}/>
    );
};

const styles = StyleSheet.create({
    button_add: {
        backgroundColor: ThemeConstants.MAIN_YELLOW,
        borderRadius: ThemeConstants.CONTAINER_RADIUS,
        marginTop: ThemeConstants.CONTAINER_MARGIN/2
    },
    button_delete: {
        alignItems: 'center',
        flexDirection: 'row',
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
    main: {
        backgroundColor: ThemeConstants.MAIN_WHITE,
        justifyContent: 'center',
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN*0.5,
        marginTop: ThemeConstants.CONTAINER_MARGIN*1.75,
        paddingTop: ThemeConstants.CONTAINER_MARGIN*0.2
    },
    text_button: {
        alignContent: 'center',
        color: ThemeConstants.MAIN_WHITE,
        fontSize: ThemeConstants.FONT_SIZE_REGULAR,
        fontWeight: 'bold',
        marginVertical: ThemeConstants.CONTAINER_MARGIN/2,
        textAlign: 'center'
    },
    text_header: {
        fontSize: ThemeConstants.FONT_SIZE_HEADER,
        fontWeight: 'bold',
        paddingBottom: ThemeConstants.CONTAINER_MARGIN/3
    },
    text_regular: {
        fontSize: ThemeConstants.FONT_SIZE_REGULAR,
        fontWeight: '400',
        paddingBottom: 4
    },
    text_small: {
        color: ThemeConstants.FONT_GRAY,
        fontSize: ThemeConstants.FONT_SIZE_SMALL
    },
});

export default TutorialFood;