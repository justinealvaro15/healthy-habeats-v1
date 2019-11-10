import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons'

import * as ThemeConstants from '../common/Themes';

const IntakeWaterContainer = () => {
    const [water, setWater] = useState(0)

    return(
        <View style={styles.container}>
            <View style={styles.details}>
                <Text style={styles.header}>Water Intake</Text>

                <Text style={styles.food}>
                    Water intake: {water} glasses
                </Text>

                <TouchableOpacity style={styles.add} onPress={() => setWater(water+1)}>
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
        paddingVertical: 15
    },
    button: {
        color: ThemeConstants.BUTTON_LIGHT_GRAY,
        fontSize: 30,
        marginRight: 10
    },
    container: {
        backgroundColor: ThemeConstants.BACKGROUND_WHITE,
        marginBottom: ThemeConstants.CONTAINER_MARGIN,
    },
    details: {
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN+9
    },
    header: {
        borderBottomColor: ThemeConstants.BORDER_GRAY,
        borderBottomWidth: 1,
        fontSize: ThemeConstants.FONT_SIZE_HEADER,
        fontWeight: 'bold',
        paddingVertical: ThemeConstants.CONTAINER_MARGIN+5
    },
    food: {
        borderBottomColor: ThemeConstants.BORDER_GRAY,
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    }
});

export default IntakeWaterContainer;