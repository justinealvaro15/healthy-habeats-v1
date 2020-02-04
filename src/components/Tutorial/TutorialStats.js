import React from 'react';
import { StyleSheet, View } from 'react-native';

import StatsDetail from '../StatsDetail';
import * as ThemeConstants from '../../common/Themes';

const StatsContainer = () => {
    return(
        <View style={styles.container}>
            <View style={styles.bar}>
                <StatsDetail style={styles.details} title='Energy' unit='kcal' valueTotal={2375} valueCurrent={500}/>
                <StatsDetail style={styles.details} title='Carbs' unit='g' valueTotal={380} valueCurrent={375}/>
            </View>

            <View style={styles.bar}>
                <StatsDetail style={styles.details} title='Protein' unit='g' valueTotal={90} valueCurrent={69}/>
                <StatsDetail style={styles.details} title='Fat' unit='g' valueTotal={55} valueCurrent={125}/>
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
        margin: ThemeConstants.CONTAINER_MARGIN/2,
        paddingBottom: 18,
    }
});

export default StatsContainer;