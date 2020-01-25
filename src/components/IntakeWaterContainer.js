import React, { useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import * as ThemeConstants from '../common/Themes';

const IntakeWaterContainer = () => {
    const [water, setWater] = useState(0)

    return(
        <View style={styles.container}>
            <View style={styles.details}>
                <Text style={styles.text_header}>Water Intake</Text>

                <View 
                    style={{alignItems: 'center', 
                        justifyContent: 'space-between',
                        flexDirection: 'row'}}
                    >
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => water > 0 ? setWater(water-1) : null}
                    >
                        <View>
                            <Text style={styles.text_button}>-</Text>
                        </View>
                    </TouchableHighlight>

                    <View style={styles.glass}>
                        <Text style={styles.text_water}>{water} {water <= 1 ? 'glass' : 'glasses'}</Text>
                    </View>

                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => setWater(water+1)}
                    >
                        <View>
                            <Text style={styles.text_button}>+</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: ThemeConstants.MAIN_YELLOW,
        borderRadius: ThemeConstants.CONTAINER_RADIUS,
        marginVertical: ThemeConstants.CONTAINER_MARGIN/2,
        width: 50
    },
    container: {
        backgroundColor: ThemeConstants.MAIN_BLUE,
        borderTopLeftRadius: ThemeConstants.CONTAINER_RADIUS,
        borderTopRightRadius: ThemeConstants.CONTAINER_RADIUS 
    },
    details: {
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN*2,
        marginBottom: ThemeConstants.CONTAINER_MARGIN
    },
    glass: {
        backgroundColor: ThemeConstants.MAIN_WHITE,
        borderRadius: ThemeConstants.CONTAINER_RADIUS,
        marginVertical: ThemeConstants.CONTAINER_MARGIN/2,
        paddingHorizontal: ThemeConstants.CONTAINER_MARGIN*1.5,
        maxWidth: 160
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
        color: ThemeConstants.MAIN_WHITE,
        fontSize: ThemeConstants.FONT_SIZE_HEADER,
        fontWeight: 'bold',
        paddingBottom: ThemeConstants.CONTAINER_MARGIN/3,
        paddingTop: ThemeConstants.CONTAINER_MARGIN*1.25
    },
    text_water: {
        textAlign: 'center',
        fontSize: ThemeConstants.FONT_SIZE_REGULAR,
        marginVertical: ThemeConstants.CONTAINER_MARGIN/2
    }
});

export default IntakeWaterContainer;