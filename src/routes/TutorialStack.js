import { createStackNavigator, StackViewTransitionConfigs } from 'react-navigation';
import { StyleSheet } from 'react-native';

import TutorialScreen1 from '../screens/Tutorial/TutorialScreen1';
import TutorialScreen2 from '../screens/Tutorial/TutorialScreen2';
import TutorialScreen3 from '../screens/Tutorial/TutorialScreen3';
import TutorialScreen4 from '../screens/Tutorial/TutorialScreen4';
import { MAIN_BLUE, MAIN_WHITE } from '../common/Themes';


const screens = {
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
    }
};

const TutorialStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: MAIN_WHITE,
        headerStyle: { backgroundColor: MAIN_BLUE, height: 60 }
    },
    initialRouteName: 'Tutorial1',
    transitionConfig: () => StackViewTransitionConfigs.SlideFromRightIOS
});

const styles = StyleSheet.create({
    logo: {
        height: 21,
        width: 168
    }
});

export default TutorialStack;