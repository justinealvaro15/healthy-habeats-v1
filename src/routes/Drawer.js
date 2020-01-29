import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import HomeStack from './HomeStack';
import UserProfileStack from './UserProfileStack';
import TestScreen from '../screens/TestScreen';

const RootDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeStack,
    },
    UserProfile: {
        screen: UserProfileStack,
    },
    Test: {
        screen: TestScreen
    }
});

export default createAppContainer(RootDrawerNavigator);