import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { StyleSheet, Text } from 'react-native';

import AnthropometricScreen from '../screens/AnthropometricScreen';
import UserProfileScreen from '../screens/UserProfileScreen';

import Header from '../components/Header';
import { FONT_SIZE_MEDIUM, MAIN_BLUE, MAIN_WHITE } from '../common/Themes';

const screens = {
    UserProfile: {
        screen: UserProfileScreen,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => {
                    return <Header navigation={navigation} title={<Text style={styles.text_header}>Profile</Text>}/>
                }
            }
        }
    },
    Anthropometric: {
        screen: AnthropometricScreen,
        navigationOptions: {
            title: 'Personal Details',
            headerLeft: null
        }
    }
};

const UserProfileStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: MAIN_WHITE,
        headerStyle: { backgroundColor: MAIN_BLUE, height: 60 }
    },
    text_header: {
        color: MAIN_WHITE,
        fontSize: FONT_SIZE_MEDIUM,
        fontWeight: 'bold',
    }
});

const styles = StyleSheet.create({
    text_header: {
        color: MAIN_WHITE,
        fontSize: FONT_SIZE_MEDIUM,
        fontWeight: 'bold',
    }
});

export default UserProfileStack;