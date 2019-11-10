import React, { useState, useEffect } from 'react';
import { AsyncStorage, ScrollView, StyleSheet } from 'react-native';

import IntakeFoodContainer from '../components/IntakeFoodContainer';
import IntakeWaterContainer from '../components/IntakeWaterContainer';
import StatsContainer from '../components/StatsContainer';

import * as ThemeConstants from '../common/Themes';

const reducer = (state, action) => {
    return {...state, foodArray: state.foodArray.push(action.payload) }
}
var s =global
const HomeScreen = ({ navigation }) => {
    
    const breakfastArray = [];
    
    const [breakfast, setBreakfast] = useState([]);
    const [lunch, setLunch] = useState([]);
    const [dinner, setDinner] = useState([]);
    const [snacks, setSnacks] = useState([]);
    var checker = 0;

    const deleteData = async (key) => {
		try {
			await AsyncStorage.removeItem(key);
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}
    }
    
    const getData = async (key) => {
		try {
            
            const data = await AsyncStorage.getItem(key);
            let x =  JSON.parse(data);
            //console.log(x);
           
            return data;
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}      
    };    
    const syncBreakfastData = async (key) => {
		try {
            let x = 0;
            const data = await AsyncStorage.getItem(key) || 'empty';
            //console.log(data);
            if(data === 'empty'){
                setBreakfast([]);
            }else{
                x =  JSON.parse(data);
                setBreakfast(x);
            }
            
            return data;
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}      
    };    

    const syncLunchData = async (key) => {
		try {
            let x = 0;
            const data = await AsyncStorage.getItem(key) || 'empty';
            //console.log(data);
            if(data === 'empty'){
                setLunch([]);
            }else{
                x =  JSON.parse(data);
                setLunch(x);
            }
            
            return data;
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}      
    }; 

    const syncDinnerData = async (key) => {
		try {
            let x = 0;
            const data = await AsyncStorage.getItem(key) || 'empty';
            //console.log(data);
            if(data === 'empty'){
                setDinner([]);
            }else{
                x =  JSON.parse(data);
                setDinner(x);
            }
            
            return data;
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}      
    };  

    const syncSnacksData = async (key) => {
		try {
            let x = 0;
            const data = await AsyncStorage.getItem(key) || 'empty';
            //console.log(data);
            if(data === 'empty'){
                setSnacks([]);
            }else{
                x =  JSON.parse(data);
                setSnacks(x);
            }
            
            return data;
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}      
    };  
    
    const saveData = async (key, value) => {
		try {
            await AsyncStorage.setItem(key, value);
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}
    };
    //DELETE FOR DEV PURPOSES ONLY
    //deleteData('total_breakfast');
    //deleteData('total_lunch');
    //deleteData('total_dinner');
    //deleteData('total_snacks');
  
    useEffect( () => {
        //console.log("RQTQYWU");
        syncBreakfastData('total_breakfast');
        syncLunchData('total_lunch');
        syncDinnerData('total_dinner');
        syncDinnerData('total_snacks');
    },[]);

    useEffect( () => {
        if(breakfast.length == 0){
            //console.log("NEW USERS");
            //getData('total_breakfast');
           
        }else{
            //console.log("OLD USER");
            saveData('total_breakfast',JSON.stringify(breakfast));
            //getData('total_breakfast'); 
        }
    }, [breakfast]);

    useEffect( () => {
        if(lunch.length == 0){
            //console.log("NEW USERS");
            //getData('total_breakfast');
           
        }else{
            //console.log("OLD USER");
            saveData('total_lunch',JSON.stringify(lunch));
            //getData('total_lunch'); 
        }
    }, [lunch]);

    useEffect( () => {
        if(dinner.length == 0){
            //console.log("NEW USERS");
            //getData('total_breakfast');
           
        }else{
            //console.log("OLD USER");
            saveData('total_dinner',JSON.stringify(dinner));
            //getData('total_dinner'); 
        }
    }, [dinner]);

    useEffect( () => {
        if(snacks.length == 0){
            //console.log("NEW USERS");
            //getData('total_snacks');
           
        }else{
            //console.log("OLD USER");
            saveData('total_snacks',JSON.stringify(snacks));
            //getData('total_snacks'); 
        }
    }, [snacks]);


    
    return(
        

        <ScrollView style={styles.main}>
            <StatsContainer/>
            <IntakeFoodContainer
                food={breakfast}
                title='Breakfast'
                navigateToSearchFood={() => navigation.navigate('SearchFood', {
                    foodArray: breakfast,
                    setFoodArray: setBreakfast
                })}
            />
            <IntakeFoodContainer
                food={lunch}
                title='Lunch'
                navigateToSearchFood={() => navigation.navigate('SearchFood', {
                    foodArray: lunch,
                    setFoodArray: setLunch
                })}
            />
            <IntakeFoodContainer
                food={dinner}
                title='Dinner'
                navigateToSearchFood={() => navigation.navigate('SearchFood', {
                    foodArray: dinner,
                    setFoodArray: setDinner
                })}
            />
            <IntakeFoodContainer
                food={snacks}
                title='Snacks'
                navigateToSearchFood={() => navigation.navigate('SearchFood', {
                    foodArray: snacks,
                    setFoodArray: setSnacks
                })}
            />
            <IntakeWaterContainer/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    main: {
        backgroundColor: ThemeConstants.BACKGROUND_LIGHT_GRAY,
        flex: 1
    }
});

export default HomeScreen;