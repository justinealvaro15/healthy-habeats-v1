import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import IntakeFoodContainer from '../components/IntakeFoodContainer';
import IntakeWaterContainer from '../components/IntakeWaterContainer';
import StatsContainer from '../components/StatsContainer';

import * as ThemeConstants from '../common/Themes';

const reducer = (state, action) => {
    return {...state, foodArray: state.foodArray.push(action.payload) }
}

const HomeScreen = ({ navigation }) => {
    const [breakfast, setBreakfast] = useState([]);
    const [lunch, setLunch] = useState([]);
    const [dinner, setDinner] = useState([]);
    const [snacks, setSnacks] = useState([]);

    const bannerUriBreakfast = require('../../assets/banners/banner-breakfast.png');
    const bannerUriLunch = require('../../assets/banners/banner-lunch.png')
    const bannerUriDinner = require('../../assets/banners/banner-dinner.png')
    const bannerUriSnacks = require('../../assets/banners/banner-snacks.png')

    return(
        <ScrollView style={styles.main}>
            <StatsContainer/>
            <IntakeFoodContainer
                bannerUri={bannerUriBreakfast}
                food={breakfast}
                title='Breakfast'
                navigateToSearchFood={() => navigation.navigate('SearchFood', {
                    foodArray: breakfast,
                    setFoodArray: setBreakfast
                })}
            />
            <IntakeFoodContainer
                bannerUri={bannerUriLunch}
                food={lunch}
                title='Lunch'
                navigateToSearchFood={() => navigation.navigate('SearchFood', {
                    foodArray: lunch,
                    setFoodArray: setLunch
                })}
            />
            <IntakeFoodContainer
                bannerUri={bannerUriDinner}
                food={dinner}
                title='Dinner'
                navigateToSearchFood={() => navigation.navigate('SearchFood', {
                    foodArray: dinner,
                    setFoodArray: setDinner
                })}
            />
            <IntakeFoodContainer
                bannerUri={bannerUriSnacks}
                food={snacks}
                title='Snacks'
                navigateToSearchFood={() => navigation.navigate('SearchFood', {
                    foodArray: snacks,
                    setFoodArray: setSnacks
                })}
            />
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