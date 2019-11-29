import React, { useState, useEffect } from 'react';
import { AsyncStorage, ScrollView, StyleSheet } from 'react-native';

import CalendarStrip from 'react-native-calendar-strip';
import moment from "moment";

import IntakeFoodContainer from '../components/IntakeFoodContainer';
import IntakeWaterContainer from '../components/IntakeWaterContainer';
import StatsContainer from '../components/StatsContainer';

import * as ThemeConstants from '../common/Themes';

const reducer = (state, action) => {
    return {...state, foodArray: state.foodArray.push(action.payload) }
}

const HomeScreen = ({ navigation }) => {
    let totalFood = [];
    let current_totalFood = [];

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
    });
    const [totalFoodArray, setTotalFoodArray] = useState([]);
    const [breakfast, setBreakfast] = useState([]);
    const [lunch, setLunch] = useState([]);
    const [dinner, setDinner] = useState([]);
    const [snacks, setSnacks] = useState([]);

    const [current_totalFoodArray, setCurrentTotalFoodArray] = useState([]);
    const [current_breakfast, setCurrentBreakfast] = useState([]);
    const [current_lunch, setCurrentLunch] = useState([]);
    const [current_dinner, setCurrentDinner] = useState([]);
    const [current_snacks, setCurrentSnacks] = useState([]);

    const [dateSelected, setDateSelected] = useState( moment().format('MMMM DD YYYY'));
    const [dateMoment, setDateMoment] = useState(moment());

    const bannerUriBreakfast = require('../../assets/banners/banner-breakfast.png');
    const bannerUriLunch = require('../../assets/banners/banner-lunch.png')
    const bannerUriDinner = require('../../assets/banners/banner-dinner.png')
    const bannerUriSnacks = require('../../assets/banners/banner-snacks.png')

    const [isDeleted, setIsDeleted] = useState();

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
                //console.log(x.length)
                //let x_date = [];
               // for (let i = 0; i < x.length; i++) {
                //    if(x[i].dateConsumed === dateSelected){
                        //x_date.push(x[i]);
                //    }
                    
                //}
                //FIX NAWAWALA DATA IF NAPUNTA SA IBANG DATE
                //console.log("HELLO");
                //console.log(x);
                //console.log("WORLD");
                //console.log(x_date);
                //setCurrentBreakfast(x_date);
                setBreakfast(x); //naooverwirite si breakfast
                
               
               
                
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
            let x_date = [];
            const breakfast1 = await AsyncStorage.getItem('total_breakfast') || 'empty';
            const lunch1 = await AsyncStorage.getItem('total_lunch') || 'empty';
            const dinner1 = await AsyncStorage.getItem('total_dinner') || 'empty';
            const snacks1 = await AsyncStorage.getItem('total_snacks') || 'empty';
           
            if(breakfast1 === 'empty'){
               
            }else{
                a =  JSON.parse(breakfast1);
                
                for (let i = 0; i < a.length; i++) {
                    if(a[i].dateConsumed === dateSelected){
                        totalFood.push(a[i]);
                        x_date.push(a[i])
                    }
                }
                setCurrentBreakfast(x_date);
                
            }
            x_date = [];

            if(lunch1 === 'empty'){
                
            }else{
                b =  JSON.parse(lunch1);
                for (let i = 0; i < b.length; i++) {
                    if(b[i].dateConsumed === dateSelected){
                        totalFood.push(b[i]);
                        x_date.push(b[i]);
                    }
               }
               setCurrentLunch(x_date);

            }
            x_date = [];

            if(dinner1 === 'empty'){
                
            }else{
                c =  JSON.parse(dinner1);
                for (let i = 0; i < c.length; i++) {
                    if(c[i].dateConsumed === dateSelected){
                        totalFood.push(c[i]);
                        x_date.push(c[i]);
                    }
               }
               setCurrentDinner(x_date);
                
            }
            x_date = [];
            if(snacks1 === 'empty'){
               
                //console.log(totalFoodArray);
                
            }else{
                d =  JSON.parse(snacks1);
                for (let i = 0; i < d.length; i++) {
                    if(d[i].dateConsumed === dateSelected){
                        totalFood.push(d[i]);
                        x_date.push(d[i]);
                    }
               }
               setCurrentSnacks(x_date);
               
            }
            x_date = [];
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
            saveCurrentUserData('current_calories', JSON.stringify(calories));
            saveCurrentUserData('current_carbs', JSON.stringify(carbs));
            saveCurrentUserData('current_proteins', JSON.stringify(proteins));
            saveCurrentUserData('current_fats', JSON.stringify(fats));
            

            setTotalFoodArray(totalFood);
            //var z = totalFood;
            //console.log("HELLO");
            //console.log(z);
            
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}      
    };
    const saveCurrentUserData = async (key, value) => {
		try {
			await AsyncStorage.setItem(key, value);
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
        //syncFoodsData();
        //syncCurrentUserData();
        //console.log(totalFoodArray);
        //console.log("JKJKKJK");
        //console.log(breakfast);
    },[isDeleted]);

    useEffect( () => {
        //console.log("RQTQYWU");
        syncBreakfastData('total_breakfast');
        syncLunchData('total_lunch');
        syncDinnerData('total_dinner');
        syncSnacksData('total_snacks');
        syncFoodsData();
        //syncCurrentUserData();
        getUserData();
    },[]);

    useEffect( () => {
        if(breakfast.length == 0){
            //console.log("NEW USERS");
            //getData('total_breakfast');
            saveData('total_breakfast', JSON.stringify(breakfast));
           
        }else{
            //console.log("OLD USER");
            saveData('total_breakfast', JSON.stringify(breakfast));
            //setTotalFoodArray([...totalFoodArray, breakfast]);
            //console.log(totalFoodArray);
            //getData('total_breakfast'); 
        }
    }, [breakfast]);

    useEffect( () => {
        if(lunch.length == 0){
            //console.log("NEW USERS");
            //getData('total_breakfast');
            saveData('total_lunch',JSON.stringify(lunch));
           
        }else{
            //console.log("OLD USER");
            saveData('total_lunch',JSON.stringify(lunch));
            
            //setTotalFoodArray([...totalFoodArray,lunch]);
            //console.log(lunch);
            //getData('total_lunch'); 
        }
    }, [lunch]);

    useEffect( () => {
        if(dinner.length == 0){
            //console.log("NEW USERS");
            //getData('total_breakfast');
            saveData('total_dinner',JSON.stringify(dinner));
           
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
            saveData('total_snacks',JSON.stringify(snacks));
           
        }else{
            //console.log("OLD USER");
            saveData('total_snacks',JSON.stringify(snacks));
            //setTotalFoodArray([...totalFoodArray, snacks]);
            //console.log(totalFoodArray);
            //getData('total_snacks'); 
        }
    }, [snacks]);

    useEffect( () => {
       
        syncFoodsData();
        //console.log(dateSelected);
    },[dateSelected]);
    return(
         
        <ScrollView style={styles.main}>
            <CalendarStrip
                style={{height:100, paddingTop: 5, paddingBottom: 5}}
                daySelectionAnimation={{type: 'background', duration: 200, highlightColor: '#a9a9ab'}}
                calendarHeaderStyle={{color: 'white'}}
                calendarColor={'#7743CE'}
                dateNumberStyle={{color: 'white'}}
                dateNameStyle={{color: 'white'}}
                highlightDateNumberStyle={{color: 'yellow'}}
                highlightDateNameStyle={{color: 'yellow'}}
                disabledDateNameStyle={{color: 'grey'}}
                disabledDateNumberStyle={{color: 'grey'}}
                onDateSelected = { (onDateSelected) => {
                    var currentDateSelected = moment(onDateSelected).format('MMMM DD YYYY');
                    console.log(currentDateSelected);
                    setDateSelected(currentDateSelected);
                    setDateMoment(moment(onDateSelected));
                    //console.log(moment('2019-11-30T13:51:45.046Z').format('MMMM DD YYYY')); // FOR DEV PURPOSES ONLY
                }}
                
            />
            <StatsContainer
                valuesTotal = {userData}
                valuesCurrent = {current}
            />

            <IntakeFoodContainer
                bannerUri={bannerUriBreakfast}
                food={current_breakfast}
                highlight={ThemeConstants.HIGHLIGHT_GREEN}
                mealTitle='Breakfast'
                navigateToSearchFood={() => navigation.navigate('SearchFood', {
                    foodArray: breakfast,
                    setFoodArray: setBreakfast,
                    currentDate: dateMoment
                })}
                onDeletion = {setBreakfast}
                onDeletion2 = {setIsDeleted}
                onDeletion3 = {setCurrent}
            />

            <IntakeFoodContainer
                bannerUri={bannerUriLunch}
                food={current_lunch}
                highlight={ThemeConstants.HIGHLIGHT_ORANGE}
                mealTitle='Lunch'
                navigateToSearchFood={() => navigation.navigate('SearchFood', {
                    foodArray: lunch,
                    setFoodArray: setLunch,
                    currentDate: dateMoment
                })}
                onDeletion = {setLunch}
                onDeletion2 = {setIsDeleted}
                onDeletion3 = {setCurrent}
                
  
            />

            <IntakeFoodContainer
                bannerUri={bannerUriDinner}
                food={current_dinner}
                highlight={ThemeConstants.HIGHLIGHT_PURPLE}
                mealTitle='Dinner'
                navigateToSearchFood={() => navigation.navigate('SearchFood', {
                    foodArray: dinner,
                    setFoodArray: setDinner,
                    currentDate: dateMoment
                })}
                onDeletion = {setDinner}
                onDeletion2 = {setIsDeleted}
                onDeletion3 = {setCurrent}
            />

            <IntakeFoodContainer
                bannerUri={bannerUriSnacks}
                food={current_snacks}
                highlight={ThemeConstants.HIGHLIGHT_BLUE}
                mealTitle='Snacks'
                navigateToSearchFood={() => navigation.navigate('SearchFood', {
                    foodArray: snacks,
                    setFoodArray: setSnacks,
                    currentDate: dateMoment



                })}
                onDeletion = {setSnacks}
                onDeletion2 = {setIsDeleted}
                onDeletion3 = {setCurrent}
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