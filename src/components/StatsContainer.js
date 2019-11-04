import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import StatsDetail from './StatsDetail';
import * as ThemeConstants from '../common/Themes';

const StatsContainer = () => {
    return(
        <View style={styles.container}>
            <StatsDetail style={styles.details} title='Energy'/>
            <StatsDetail style={styles.details} title='Carbs'/>
            <StatsDetail style={styles.details} title='Protein'/>
            <StatsDetail style={styles.details} title='Fat'/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: ThemeConstants.BACKGROUND_WHITE,
        borderRadius: ThemeConstants.CONTAINER_RADIUS,
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: ThemeConstants.CONTAINER_MARGIN
    }
});

export default StatsContainer;