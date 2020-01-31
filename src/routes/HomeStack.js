import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Image, StyleSheet } from 'react-native';

import EditServingScreen from '../screens/EditServingScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchFoodScreen from '../screens/SearchFoodScreen';
import TutorialScreen from '../screens/TutorialScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

import Header from '../components/Header';
import { MAIN_BLUE, MAIN_WHITE } from '../common/Themes';

const screens = {
    EditServing: {
        screen: EditServingScreen,
        navigationOptions: {
            title: 'Food Servings'
        }
    },
    Home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => {
                    return <Header navigation={navigation} title={<Image source={require('../../assets/logo_name.png')} style={styles.logo}/>}/>
                }
            }
        }
    },
    SearchFood: {
        screen: SearchFoodScreen,
        navigationOptions: {
            title: 'Search for food'
        }
    },
    Tutorial: {
        screen: TutorialScreen,
        navigationOptions: {
            header: null
        }
    },
    Welcome: {
        screen: WelcomeScreen,
        navigationOptions: {
            header: null
        }
    }
};

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: MAIN_WHITE,
        headerStyle: { backgroundColor: MAIN_BLUE, height: 60 }
    },
    initialRouteName: 'Welcome'
});

const styles = StyleSheet.create({
    logo: {
        height: 21,
        width: 168
    }
});

export default HomeStack;