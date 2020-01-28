import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import HomeStack from './HomeStack';
import UserProfileStack from './UserProfileStack';

const RootDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeStack,
    },
    UserProfile: {
        screen: UserProfileStack,
    }
});

export default createAppContainer(RootDrawerNavigator);