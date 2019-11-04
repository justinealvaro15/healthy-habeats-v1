import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import SearchFoodScreen from './src/screens/SearchFoodScreen';

const navigator = createStackNavigator({
    Home: HomeScreen,
    SearchFood: SearchFoodScreen
}, {
    initialRouteName: 'SearchFood',
    defaultNavigationOptions: {
        title: 'Health Food App'
    }
}, {
    headerMode: 'screen',
    cardStyle: { backgroundColor: '#EFF0F1' }
});

export default createAppContainer(navigator);


