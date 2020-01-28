import React from 'react';
import { createStackNavigator } from 'react-navigation';

import AnthropometricScreen from '../screens/AnthropometricScreen';
import UserProfileScreen from '../screens/UserProfileScreen';

import Header from '../components/Header';
import { MAIN_BLUE, MAIN_WHITE } from '../common/Themes';

const screens = {
    UserProfile: {
        screen: UserProfileScreen,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='My Profile'/>
            }
        }
    },
    Anthropometric: {
        screen: AnthropometricScreen,
        navigationOptions: {
            title: 'Personal Details'
        }
    }
};

const UserProfileStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: MAIN_WHITE,
        headerStyle: { backgroundColor: MAIN_BLUE, height: 60 }
    }
});

export default UserProfileStack;