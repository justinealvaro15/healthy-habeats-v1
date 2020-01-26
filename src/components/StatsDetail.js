import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Bar } from 'react-native-progress';

import * as ThemeConstants from '../common/Themes';

const StatsDetail = ({ title, unit, valueTotal, valueCurrent }) => {
    const progress = valueCurrent/valueTotal ? valueCurrent/valueTotal : null;

    return(
        <View style={styles.details}>
            <View style={styles.bar}>
                <Bar
                    color={ThemeConstants.MAIN_BLUE}
                    progress={progress}
                    width={100}
                />
            </View>
            <Text style={styles.text_header}>{title}</Text>
            <Text style={styles.text_regular}>{Math.round(valueCurrent*100)/100}/{Math.round(valueTotal*100)/100} {unit}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    bar: {
        alignSelf: 'center',
        backgroundColor: ThemeConstants.MAIN_WHITE,
        marginBottom: 4
    },
    details: {
        flex: 1,
        marginTop: 30
    },
    text_header: {
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    text_regular: {
        alignSelf: 'center'
    }
});

export default StatsDetail;