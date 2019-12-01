import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import SearchFoodScreen from './src/screens/SearchFoodScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import AnthropometricScreen from './src/screens/AnthropometricScreen';

const navigator = createStackNavigator({
    Home: HomeScreen,
    SearchFood: SearchFoodScreen,
    Welcome: WelcomeScreen,
    Anthropometric: AnthropometricScreen
}, {
    initialRouteName: 'Anthropometric',
    defaultNavigationOptions: {
        title: 'Health Food App'
    }
}, {
    headerMode: 'screen',
    cardStyle: { backgroundColor: '#EFF0F1' }
});

export default createAppContainer(navigator);


