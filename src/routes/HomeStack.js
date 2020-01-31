import React from 'react';
import { createStackNavigator, StackViewTransitionConfigs } from 'react-navigation';
import { Image, StyleSheet } from 'react-native';

import EditServingScreen from '../screens/EditServingScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchFoodScreen from '../screens/SearchFoodScreen';
import TutorialScreen1 from '../screens/Tutorial/TutorialScreen1';
import TutorialScreen2 from '../screens/Tutorial/TutorialScreen2';
import TutorialScreen3 from '../screens/Tutorial/TutorialScreen3';
import TutorialScreen4 from '../screens/Tutorial/TutorialScreen4';
import TutorialScreen5 from '../screens/Tutorial/TutorialScreen5';
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
    Tutorial1: {
        screen: TutorialScreen1,
        navigationOptions: {
            header: null
        }
    },
    Tutorial2: {
        screen: TutorialScreen2,
        navigationOptions: {
            header: null
        }
    },
    Tutorial3: {
        screen: TutorialScreen3,
        navigationOptions: {
            header: null
        }
    },
    Tutorial4: {
        screen: TutorialScreen4,
        navigationOptions: {
            header: null
        }
    },
    Tutorial5: {
        screen: TutorialScreen5,
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
    initialRouteName: 'Welcome',
    transitionConfig: () => StackViewTransitionConfigs.SlideFromRightIOS
});

const styles = StyleSheet.create({
    logo: {
        height: 21,
        width: 168
    }
});

export default HomeStack;