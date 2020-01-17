import React from 'react';
import { StyleSheet, View } from 'react-native';

import StatsDetail from './StatsDetail';
import * as ThemeConstants from '../common/Themes';

const StatsContainer = ({ valuesTotal, valuesCurrent }) => {
    return(
        <View style={styles.container}>
            <View style={styles.bar}>
                <StatsDetail style={styles.details} title='Energy' valueTotal = {valuesTotal.calories} valueCurrent = {valuesCurrent.current_calories}/>
                <StatsDetail style={styles.details} title='Carbs' valueTotal = {valuesTotal.carbs} valueCurrent = {valuesCurrent.current_carbs} />
            </View>

            <View style={styles.bar}>
                <StatsDetail style={styles.details} title='Protein' valueTotal = {valuesTotal.proteins} valueCurrent = {valuesCurrent.current_proteins} />
                <StatsDetail style={styles.details} title='Fat' valueTotal = {valuesTotal.fats} valueCurrent = {valuesCurrent.current_fats} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    container: {
        backgroundColor: ThemeConstants.BACKGROUND_LIGHT_GRAY,
        borderRadius: ThemeConstants.CONTAINER_RADIUS,
        margin: ThemeConstants.CONTAINER_MARGIN,
        paddingBottom: 18,
        paddingHorizontal: 10
    }
});

export default StatsContainer;