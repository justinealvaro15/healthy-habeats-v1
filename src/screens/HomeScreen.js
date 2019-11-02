import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import StatsContainer from '../components/StatsContainer';
import IntakeFoodContainer from '../components/IntakeFoodContainer';
import IntakeWaterContainer from '../components/IntakeWaterContainer';

const HomeScreen = () => {
    return(
        <ScrollView>
            <StatsContainer/>
            <IntakeFoodContainer title="Breakfast"/>
            <IntakeFoodContainer title="Lunch"/>
            <IntakeFoodContainer title="Dinner"/>
            <IntakeFoodContainer title="Snacks"/>
            <IntakeWaterContainer/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({});

export default HomeScreen;