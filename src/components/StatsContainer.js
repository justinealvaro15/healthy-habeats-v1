import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import StatsDetail from './StatsDetail';
import * as ThemeConstants from '../common/Themes';

const StatsContainer = ({food,values1, values2}) => {



    //console.log(food);
    return(
        <View style={styles.container}>
            <StatsDetail style={styles.details} title='Energy' value1 = {values1.calories} value2 = {values2.current_calories}/>
            <StatsDetail style={styles.details} title='Carbs' value1 = {values1.carbs} value2 = {values2.current_carbs} />
            <StatsDetail style={styles.details} title='Protein' value1 = {values1.proteins} value2 = {values2.current_proteins} />
            <StatsDetail style={styles.details} title='Fat' value1 = {values1.fats} value2 = {values2.current_fats} />
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