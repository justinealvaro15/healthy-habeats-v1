import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import StatsContainer from '../components/StatsContainer';
import IntakeFoodContainer from '../components/IntakeFoodContainer';
import IntakeWaterContainer from '../components/IntakeWaterContainer';

import * as ThemeConstants from '../common/Themes';

const HomeScreen = () => {
    return(
        <ScrollView style={styles.main}>
            <StatsContainer/>
            <IntakeFoodContainer title="Breakfast"/>
            <IntakeFoodContainer title="Lunch"/>
            <IntakeFoodContainer title="Dinner"/>
            <IntakeFoodContainer title="Snacks"/>
            <IntakeWaterContainer/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    main: {
        backgroundColor: ThemeConstants.BACKGROUND_LIGHT_GRAY,
        flex: 1
    }
});

export default HomeScreen;