import React from 'react';
import { createAppContainer, createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import AnthropometricScreen from './src/screens/AnthropometricScreen';
import EditServingScreen from './src/screens/EditServingScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchFoodScreen from './src/screens/SearchFoodScreen';
import TestScreen from './src/screens/TestScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';

import { Feather } from '@expo/vector-icons'
import { MAIN_BLUE, MAIN_WHITE, MAIN_YELLOW } from './src/common/Themes';

const AppStack = createStackNavigator({
    Anthropometric: {
        screen: AnthropometricScreen,
        navigationOptions: {
            title: 'Anthropometric',
            header: null
        }
    },
    EditServing: {
        screen: EditServingScreen,
        navigationOptions: {
            title: 'Food servings'
        }
    },
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            title: 'Home',
            header: null
        }
    },
    SearchFood: {
        screen: SearchFoodScreen,
        navigationOptions: {
            title: 'Search for food'
        }
    },
    Test:{
        screen: TestScreen,
        navigationOptions:{
            title: 'Test Screen'
        }
    }
}, {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: MAIN_BLUE
        },
        headerTintColor: MAIN_WHITE,
        title: 'HEALTHY HABEATS'
    }
}, {
    headerMode: 'screen',
    cardStyle: { backgroundColor: MAIN_WHITE }
});

const ScreenTab = createBottomTabNavigator({
    Home: {
        screen: AppStack,
        navigationOptions: {
            title: 'Home'
        }
    },
    UserProfile: createStackNavigator({
        UserProfile: {
            screen: UserProfileScreen,
            navigationOptions: {
                title: 'Profile',
                header: null
            }
        }
    }, {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: MAIN_BLUE
            },
            headerTintColor: MAIN_WHITE,
            title: 'User Profile'
        }
    }),
}, {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({tintColor}) => {
            let { routeName } = navigation.state;
            let iconName;
            if(routeName === 'Home'){
                iconName = 'home';
            } else if(routeName === 'UserProfile'){
                iconName = 'user';
            }
            return (
                <Feather 
                    color={`${tintColor}`}
                    name={`${iconName}`}
                    size={25}
                />
            );
        }
    }),
    tabBarOptions: {
        activeBackgroundColor: MAIN_BLUE,
        activeTintColor: MAIN_YELLOW,
        inactiveBackgroundColor: MAIN_BLUE,
        inactiveTintColor: MAIN_WHITE,
        showLabel: false
    }
});

export default createAppContainer(createSwitchNavigator({
    App: ScreenTab,
    Splash: WelcomeScreen
}, {
    initialRouteName: 'Splash'
}));


