import React from 'react';
import { createAppContainer, createDrawerNavigator, DrawerItems } from 'react-navigation';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

import HomeStack from './HomeStack';
import UserProfileStack from './UserProfileStack';
import AboutStack from './AboutStack';

import { Feather } from '@expo/vector-icons';
import { MAIN_BLUE, MAIN_GREEN, MAIN_WHITE } from '../common/Themes';
import Constants from 'expo-constants';
import TutorialStack from './TutorialStack';

class Hidden extends React.Component {
    render() {
      return null;
    }
  }

const RootDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            drawerLabel: 'Home',
            drawerIcon: ({tintColor}) => <Feather name='home' size={20} color={tintColor}/>
        }
    },
    UserProfile: {
        screen: UserProfileStack,
        navigationOptions: {
            drawerLabel: 'Profile',
            drawerIcon: ({tintColor}) => <Feather name='user' size={20} color={tintColor}/>
        }
    },
    About: {
        screen: AboutStack,
        navigationOptions: {
            drawerLabel: 'About',
            drawerIcon: ({tintColor}) => <Feather name='info' size={20} color={tintColor}/>
        }
    },
    Tutorial: {
        screen: TutorialStack,
        navigationOptions: {
            drawerLabel: <Hidden/>,
            drawerLockMode: 'locked-closed',
            disableGestures: true
        }
    }
}, {
    contentComponent: (props) => (
        <View style={{ flex: 1, backgroundColor: MAIN_BLUE }}>
            <Image source={require('../../assets/logo.png')} style={styles.logo}/>

            <ScrollView>
                <DrawerItems {...props}/>
            </ScrollView>
        </View> 
    ),
    contentOptions: {
        activeBackgroundColor: MAIN_WHITE,
        activeTintColor: MAIN_GREEN,
        inactiveTintColor: MAIN_WHITE
    },
    initialRouteName: 'Home'
});

const styles = StyleSheet.create({
	logo: {
        alignSelf: 'center',
        marginBottom: Constants.statusBarHeight*1.5,
        marginTop: Constants.statusBarHeight*2.5,
		height: 163,
        width: 150,
    }
});

export default createAppContainer(RootDrawerNavigator);