import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';

const navigator = createStackNavigator({
    Home: HomeScreen
}, {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
        title: 'Health Food App'
    }
});

export default createAppContainer(navigator);

