import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as ThemeConstants from '../common/Themes';
import * as AnthroText from '../common/AnthropometricText';

const AnthropometricContainer = ({ activityLevel, height, weight }) => {
    return (
        <View>
            <View style={styles.main_top}>
                <View style={styles.details_top}>
                    <Text style={styles.text_title}>Height</Text>
                    <Text style={styles.text_number}>{height}</Text>
                    <Text style={styles.text_unit}>CM</Text>
                </View>

                <View style={styles.details_top}>
                    <Text style={styles.text_title}>Weight</Text>
                    <Text style={styles.text_number}>{weight}</Text>
                    <Text style={styles.text_unit}>KG</Text>
                </View>
            </View>

            <View style={styles.main_bot}>
                <Text style={styles.text_title}>Activity Level</Text>
                <Text style={styles.text_level}>{(AnthroText.activityTitle[activityLevel-1])}</Text>
                <Text style={styles.text_desc}>{AnthroText.activityDesc[activityLevel-1]}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    details_top: {
        alignItems: 'center',
        flex: 1
    },
    main_bot: {
        marginTop: ThemeConstants.CONTAINER_MARGIN,
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN*2,
    },
    main_top: {
        backgroundColor: ThemeConstants.MAIN_WHITE,
        borderTopLeftRadius: ThemeConstants.CONTAINER_RADIUS,
        borderTopRightRadius: ThemeConstants.CONTAINER_RADIUS,
        flexDirection: 'row',
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN*1.5,
        paddingVertical: ThemeConstants.CONTAINER_MARGIN,
        borderBottomColor: ThemeConstants.BORDER_GRAY,
        borderBottomWidth: 1
    },
    text_desc: {
        fontSize: ThemeConstants.FONT_SIZE_REGULAR,
        paddingTop: ThemeConstants.CONTAINER_MARGIN/4
    },
    text_level: {
        fontSize: ThemeConstants.FONT_SIZE_MEDIUM,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    text_number: {
        fontSize: ThemeConstants.FONT_SIZE_HEADER*1.75,
        fontWeight: 'bold'
    },
    text_title: {
        color: ThemeConstants.FONT_GRAY,
        fontSize: ThemeConstants.FONT_SIZE_SMALL,
        fontWeight: 'bold'
    },
    text_unit: {
        fontSize: ThemeConstants.FONT_SIZE_SMALL,
        includeFontPadding: false
    }
});

export default AnthropometricContainer;

