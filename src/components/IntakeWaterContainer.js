import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'

import * as ThemeConstants from '../common/Themes';

const IntakeWaterContainer = () => {
    return(
        <View style={styles.container}>
            <View style={styles.details}>
                <Text style={styles.header}>Water Intake</Text>
                <View style={styles.add}>
                    <FontAwesome
                        name='plus-square'
                        onPress={() => console.log('add water')}
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
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        color: 'gray',
        fontSize: 30,
        marginRight: 10
    },
    container: {
        backgroundColor: ThemeConstants.BACKGROUND_LIGHT_GRAY,
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

export default IntakeWaterContainer;