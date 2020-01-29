import React from 'react';
import { createStackNavigator } from 'react-navigation';

import AboutScreen from '../screens/AboutScreen';

import Header from '../components/Header';
import { MAIN_BLUE, MAIN_WHITE } from '../common/Themes';

const screens = {
    About: {
        screen: AboutScreen,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='About Healthy Habeats'/>
            }
        }
    }
};

const AboutStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: MAIN_WHITE,
        headerStyle: { backgroundColor: MAIN_BLUE, height: 60 }
    },
    initialRouteName: 'About'
});

export default AboutStack;