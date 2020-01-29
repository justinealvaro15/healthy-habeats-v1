import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { StyleSheet, Text } from 'react-native';

import AboutScreen from '../screens/AboutScreen';

import Header from '../components/Header';
import { FONT_SIZE_MEDIUM, MAIN_BLUE, MAIN_WHITE } from '../common/Themes';

const screens = {
    About: {
        screen: AboutScreen,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => {
                    return <Header navigation={navigation} title={<Text style={styles.text_header}>About Healthy Habeats</Text>}/>
                }
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

const styles = StyleSheet.create({
    text_header: {
        color: MAIN_WHITE,
        fontSize: FONT_SIZE_MEDIUM,
        fontWeight: 'bold',
    }
});

export default AboutStack;