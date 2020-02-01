import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Image, StyleSheet } from 'react-native';

import AboutScreen from '../screens/AboutScreen';

import Header from '../components/Header';
import { FONT_SIZE_MEDIUM, MAIN_BLUE, MAIN_WHITE } from '../common/Themes';

const screens = {
    About: {
        screen: AboutScreen,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => {
                    return <Header navigation={navigation} title={<Image source={require('../../assets/logo_name.png')} style={styles.logo}/>}/>
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
    logo: {
        height: 21,
        width: 168
    }
});


export default AboutStack;