import React from 'react';
import { StyleSheet, View } from 'react-native';

import StatsDetail from './StatsDetail';
import * as ThemeConstants from '../common/Themes';

const StatsContainer = ({ valuesTotal, valuesCurrent }) => {
    return(
        <View style={styles.container}>
            <View style={styles.bar}>
                <StatsDetail style={styles.details} title='Energy' unit='kcal' valueTotal = {valuesTotal.calories} valueCurrent = {valuesCurrent.current_calories}/>
                <StatsDetail style={styles.details} title='Carbs' unit='g' valueTotal = {valuesTotal.carbs} valueCurrent = {valuesCurrent.current_carbs} />
            </View>

            <View style={styles.bar}>
                <StatsDetail style={styles.details} title='Protein' unit='g' valueTotal = {valuesTotal.proteins} valueCurrent = {valuesCurrent.current_proteins} />
                <StatsDetail style={styles.details} title='Fat' unit='g' valueTotal = {valuesTotal.fats} valueCurrent = {valuesCurrent.current_fats} />
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
        backgroundColor: ThemeConstants.MAIN_WHITE,
        borderRadius: ThemeConstants.CONTAINER_RADIUS,
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN,
        marginVertical: ThemeConstants.CONTAINER_MARGIN/2,
        paddingBottom: 18,
        paddingHorizontal: 10
    }
});

export default StatsContainer;