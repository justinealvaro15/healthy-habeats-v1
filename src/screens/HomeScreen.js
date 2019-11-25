import React, { useState, useEffect } from 'react';
import { AsyncStorage, ScrollView, StyleSheet } from 'react-native';

import IntakeFoodContainer from '../components/IntakeFoodContainer';
import IntakeWaterContainer from '../components/IntakeWaterContainer';
import StatsContainer from '../components/StatsContainer';

import * as ThemeConstants from '../common/Themes';

const reducer = (state, action) => {
    return {...state, foodArray: state.foodArray.push(action.payload) }
}

const HomeScreen = ({ navigation }) => {
    var totalFood = [];

    const [userData, setUserData] = useState({
        calories: 0,
        carbs: 0,
        proteins: 0,
        fats: 0,
    });
    const [current, setCurrent] = useState({
        current_calories: 0,
        current_carbs: 0,
        current_proteins: 0,
        current_fats: 0,
    })
    const [totalFoodArray, setTotalFoodArray] = useState([]);
    const [breakfast, setBreakfast] = useState([]);
    const [lunch, setLunch] = useState([]);
    const [dinner, setDinner] = useState([]);
    const [snacks, setSnacks] = useState([]);

    const bannerUriBreakfast = require('../../assets/banners/banner-breakfast.png');
    const bannerUriLunch = require('../../assets/banners/banner-lunch.png')
    const bannerUriDinner = require('../../assets/banners/banner-dinner.png')
    const bannerUriSnacks = require('../../assets/banners/banner-snacks.png')

    const deleteData = async (key) => {
		try {
			await AsyncStorage.removeItem(key);
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}
    }
    
    const getUserData = async () => {
		try {
            const calories = await AsyncStorage.getItem('total_calories');
            const carbs = await AsyncStorage.getItem('total_carbs');
            const proteins = await AsyncStorage.getItem('total_proteins');
            const fats = await AsyncStorage.getItem('total_fats');
            setUserData({
                calories: calories,
                carbs: carbs,
                proteins: proteins,
                fats: fats
            });
           
            //return data;
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
                //console.log(x);
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

    const syncFoodsData = async () => {
		try {
            let a,b,c,d = 0;
            const breakfast = await AsyncStorage.getItem('total_breakfast') || 'empty';
            const lunch = await AsyncStorage.getItem('total_lunch') || 'empty';
            const dinner = await AsyncStorage.getItem('total_dinner') || 'empty';
            const snacks = await AsyncStorage.getItem('total_snacks') || 'empty';
           
            if(breakfast === 'empty'){
               
            }else{
                a =  JSON.parse(breakfast);
                for (let i = 0; i < a.length; i++) {
                     totalFood.push(a[i]);
                }
            }
            
            if(lunch === 'empty'){
                
            }else{
                b =  JSON.parse(lunch);
                for (let i = 0; i < b.length; i++) {
                    totalFood.push(b[i]);
               }

            }

            if(dinner === 'empty'){
                
            }else{
                c =  JSON.parse(dinner);
                for (let i = 0; i < a.length; i++) {
                    totalFood.push(c[i]);
               }
                
            }

            if(snacks === 'empty'){
               
                //console.log(totalFoodArray);
                
            }else{
                d =  JSON.parse(snacks);
                for (let i = 0; i < a.length; i++) {
                    totalFood.push(d[i]);
               }
               
            }
            //console.log(totalFood);
            var calories = 0;
            var carbs = 0;
            var proteins = 0;
            var fats = 0;
            for (let i = 0; i < totalFood.length; i++) {
                calories = calories + totalFood[i].calories;
                carbs = carbs + totalFood[i].carbs;
                proteins = proteins + totalFood[i].proteins;
                fats = fats + totalFood[i].fats;
            }
            setCurrent({
                current_calories: calories,
                current_carbs: carbs,
                current_proteins: proteins,
                current_fats: fats
            });
            setTotalFoodArray(totalFood);
            
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}      
    };

    const saveData = async (key, value) => {
		try {
            await (AsyncStorage.setItem(key, value), syncFoodsData());
            

            
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}
    };

    //////////////////////////////////////
    //
    // DELETE FOR DEV PURPOSES ONLY
    // deleteData('total_breakfast');
    // deleteData('total_lunch');
    // deleteData('total_dinner');
    // deleteData('total_snacks');
    // console.log(totalFoodArray);
    //
    //////////////////////////////////////
    
    useEffect( () => {
        //console.log("RQTQYWU");
        syncBreakfastData('total_breakfast');
        syncLunchData('total_lunch');
        syncDinnerData('total_dinner');
        syncSnacksData('total_snacks');
        syncFoodsData();
        getUserData();
    },[]);

    useEffect( () => {
        if(breakfast.length == 0){
            //console.log("NEW USERS");
            //getData('total_breakfast');
           
        }else{
            //console.log("OLD USER");
            saveData('total_breakfast',JSON.stringify(breakfast));
            //setTotalFoodArray([...totalFoodArray, breakfast]);
            //console.log(totalFoodArray);
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
            //setTotalFoodArray([...totalFoodArray,lunch]);
            //console.log(totalFoodArray);
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
            //setTotalFoodArray([...totalFoodArray, dinner]);
            //console.log(totalFoodArray);
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
            //setTotalFoodArray([...totalFoodArray, snacks]);
            //console.log(totalFoodArray);
            //getData('total_snacks'); 
        }
    }, [snacks]);


    return(
        <ScrollView style={styles.main}>
            <StatsContainer
                valuesTotal = {userData}
                valuesCurrent = {current}
            />

            <IntakeFoodContainer
                bannerUri={bannerUriBreakfast}
                food={breakfast}
                highlight={ThemeConstants.HIGHLIGHT_GREEN}
                title='Breakfast'
                navigateToSearchFood={() => navigation.navigate('SearchFood', {
                    foodArray: breakfast,
                    setFoodArray: setBreakfast
                })}
            />

            <IntakeFoodContainer
                bannerUri={bannerUriLunch}
                food={lunch}
                highlight={ThemeConstants.HIGHLIGHT_ORANGE}
                title='Lunch'
                navigateToSearchFood={() => navigation.navigate('SearchFood', {
                    foodArray: lunch,
                    setFoodArray: setLunch
                })}
            />

            <IntakeFoodContainer
                bannerUri={bannerUriDinner}
                food={dinner}
                highlight={ThemeConstants.HIGHLIGHT_PURPLE}
                title='Dinner'
                navigateToSearchFood={() => navigation.navigate('SearchFood', {
                    foodArray: dinner,
                    setFoodArray: setDinner
                })}
            />

            <IntakeFoodContainer
                bannerUri={bannerUriSnacks}
                food={snacks}
                highlight={ThemeConstants.HIGHLIGHT_BLUE}
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