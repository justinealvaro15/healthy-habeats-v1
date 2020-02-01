import React, { useState, useEffect } from 'react';
import { AsyncStorage, ScrollView, StyleSheet, View, Text } from 'react-native';

import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';

import IntakeFoodContainer from '../components/IntakeFoodContainer';
import StatsContainer from '../components/StatsContainer';

import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import * as firebase from 'firebase';
import '@firebase/firestore';

import * as ThemeConstants from '../common/Themes';

let firstSync = 0;

const HomeScreen = ({ navigation }) => {
    let totalFood = [];
    const firebaseRef = firebase.database().ref();
    
    
    let temp_token = 0;
    
    const [token,setToken] = useState(0);
    let accessCounter = {
        count: 1,
        dateAccessed:  moment().format('MMMM DD YYYY')
    };

    const [isLoadingBreakfast, setIsLoadingBreakfast] = useState(true);
    const [isLoadingLunch, setIsLoadingLunch] = useState(true);
    const [isLoadingDinner, setIsLoadingDinner] = useState(true);
    const [isLoadingSnacks, setIsLoadingSnacks] = useState(true);

    const [isLoadingFood, setIsLoadingFood] = useState(true);
    const [isLoadingUserData, setIsLoadingUserData] = useState(true);
    const [isDeleteMagic, setIsDeleteMagic] = useState(true);
    const [isDeletionData, setIsDeletionData] = useState(true);
    const [isReinitialized, setIsReinitialized] = useState(true);
    
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

    const [dateSelected, setDateSelected] = useState(moment().format('MMMM DD YYYY'));
    const [dateMoment, setDateMoment] = useState(moment());

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
            console.log(calories+'/'+carbs+'/'+proteins+'/'+fats);
            setUserData({
                calories: calories,
                carbs: carbs,
                proteins: proteins,
                fats: fats
            });
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}      
    };

    const deleteMagic = async () => {
        const x = await AsyncStorage.getItem('userID');
        //console.log('TOKEN: ' + x);
        setToken(x);
        temp_token = x;
        setIsDeleted(Math.random());
        //setWaterDeleted(Math.random());
        //setIsWaterAdded(Math.random());
        prepareCounter();
        console.log("RE-INITIALIZE");
    };

    const prepareCounter = async () => {
		try {
            
            let data = await AsyncStorage.getItem('home_counter') || 'empty';
            
			if(data === 'empty' ){
				console.log('empty');
            } else{
                data = JSON.parse(data);
                //console.log(data);
                //same day
                if(data.dateAccessed === moment().format('MMMM DD YYYY')){
                    accessCounter.count = data.count + 1;
                    accessCounter.dateAccessed = data.dateAccessed;
                }
                //next day
                else{
                    accessCounter.count = 1;
                    accessCounter.dateAccessed = moment().format('MMMM DD YYYY');
                }


                
			}
               
            
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
        }    
        firebaseRef.child('Users').child(temp_token).child('Screen Access Counters').child(moment().format('MMMM DD YYYY')).child('count').set(accessCounter.count);
    };
    
	const saveHomeCounter = async (key,value) => {
		try {
			
			await AsyncStorage.setItem(key,JSON.stringify(value));
			
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
		}
	};

    const syncBreakfastData = async (key) => {
		try {
            let x = 0;
            const data = await (AsyncStorage.getItem(key) || 'empty');
           
            //console.log(data);
            if(data === 'empty' || Array.isArray(JSON.parse(data)) == false ){
                setBreakfast([]);
            } else{
                x =  JSON.parse(data);
                setBreakfast(x); //naooverwirite si breakfast 
            } 
            
            return data;
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
        }      
        //console.log("function#1: breakfast sync");
    };

    const syncLunchData = async (key) => {
		try {
            let x = 0;
            const data = await AsyncStorage.getItem(key) || 'empty';

            if(data === 'empty' || Array.isArray(JSON.parse(data)) == false ){
                setLunch([]);
            } else{
                x =  JSON.parse(data);
                setLunch(x);
            }
            
            return data;
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
        }    
        //console.log("function#2: lunch sync");  
    };

    const syncDinnerData = async (key) => {
		try {
            let x = 0;
            const data = await AsyncStorage.getItem(key) || 'empty';

            if(data === 'empty' || Array.isArray(JSON.parse(data)) == false){
                setDinner([]);
            } else{
                x =  JSON.parse(data);
                setDinner(x);
            }
            
            return data;
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
        }      
        //console.log("function#3: dinner sync");
    };

    const syncSnacksData = async (key) => {
		try {
            let x = 0;
            const data = await AsyncStorage.getItem(key) || 'empty';

            if(data === 'empty' || Array.isArray(JSON.parse(data)) == false){
                setSnacks([]);
            } else{
                x =  JSON.parse(data);
                setSnacks(x);
            }
            
            return data;
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
        }      
        //console.log("function#4: snacks sync");
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

            } else{
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
  
            } else{
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

            } else{
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
 
            } else{
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

            var calories = 0;
            var carbs = 0;
            var proteins = 0;
            var fats = 0;
            for (let i = 0; i < totalFood.length; i++) {
                calories = calories + (totalFood[i].calories * totalFood[i].serving);
                carbs = carbs + (totalFood[i].carbs * totalFood[i].serving);
                proteins = proteins + (totalFood[i].proteins * totalFood[i].serving);
                fats = fats + (totalFood[i].fats * totalFood[i].serving);
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
        //console.log("function#6: save current user data");
	};

    const saveData = async (key, value) => {
        //console.log('FOOD IS ADDED');
		try {
            await (AsyncStorage.setItem(key, value), syncFoodsData().then( () => {
                setIsLoadingFood(false);
            }));
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
        }
       // console.log("function#7: save data");
    };    

    const saveDeletionData = async () => {
		try {
            await (AsyncStorage.setItem('total_breakfast', JSON.stringify(breakfast)));
            await (AsyncStorage.setItem('total_lunch', JSON.stringify(lunch)));
            await (AsyncStorage.setItem('total_dinner', JSON.stringify(dinner)));
            await (AsyncStorage.setItem('total_snacks', JSON.stringify(snacks)));
		} catch (error) {
			// Error retrieving data
			console.log(error.message);
        }
        //console.log("function#8: delete save data");
    };
    
    //////////////////////////////////////
    //
    // DELETE FOR DEV PURPOSES ONLY
    // deleteData('total_breakfast');
    // deleteData('total_lunch');
    // deleteData('total_dinner');
    // deleteData('total_snacks');
    // deleteData('home_counter');
    // console.log(totalFoodArray);
    //
    //////////////////////////////////////

    useEffect(() => {
        syncBreakfastData('total_breakfast').then( () => {
            setIsLoadingBreakfast(false);
        });
        syncLunchData('total_lunch').then( () => {
            setIsLoadingLunch(false);
        });
        syncDinnerData('total_dinner').then( () => {
            setIsLoadingDinner(false);
        });
        syncSnacksData('total_snacks').then( () => {
            setIsLoadingSnacks(false);
        });
        

        //syncFoodsData();
        //syncCurrentUserData();
        getUserData().then( () => {
            setIsLoadingUserData(false);
        });
        
        //console.log("useEffect#1 in action: sync data from startup");
    },[]);

    useEffect(() => {
        if(breakfast.length == 0){
            saveData('total_breakfast', JSON.stringify(breakfast));
           
        } else{
            saveData('total_breakfast', JSON.stringify(breakfast));
        }
        //console.log("useEffect#2 in action: breakfast sync ");
    }, [breakfast]);

    useEffect(() => {
        if(lunch.length == 0){
            saveData('total_lunch', JSON.stringify(lunch));
        }else{
            saveData('total_lunch', JSON.stringify(lunch));
            //setTotalFoodArray([...totalFoodArray,lunch]);  
        }
        //console.log("useEffect#3 in action: lunch sync ");
    }, [lunch]);

    useEffect(() => {
        if(dinner.length == 0){
            saveData('total_dinner', JSON.stringify(dinner));   
        } else{
            saveData('total_dinner', JSON.stringify(dinner));
            //setTotalFoodArray([...totalFoodArray, dinner]);
        }
        //console.log("useEffect#4 in action: dinner sync ");
    }, [dinner]);

    useEffect(() => {
        if(snacks.length == 0){
            saveData('total_snacks',JSON.stringify(snacks));
        } else{
            //console.log("OLD USER");
            saveData('total_snacks', JSON.stringify(snacks));
            //setTotalFoodArray([...totalFoodArray, snacks]);
        }
        //console.log("useEffect#5 in action: snacks sync ");
    }, [snacks]);

    useEffect(() => {
        syncFoodsData().then( () => {
            setIsLoadingFood(false);
        });
        /*syncWaterData2().then( () => {
            setIsLoading7(false);
        });;*/
    }, [dateSelected]);

    useEffect(() => {
        //syncCurrentUserData();
        //saveData('total_breakfast', JSON.stringify(breakfast));
        //saveData('total_lunch', JSON.stringify(lunch));
        //saveData('total_dinner', JSON.stringify(dinner));
        //saveData('total_snacks', JSON.stringify(snacks));
        saveDeletionData().then( () => {
            setIsDeletionData(false);
        });
        syncFoodsData().then( () => {
            setIsLoadingFood(false);
        });
        //console.log(firstSync);
        if(firstSync == 1){
            //console.log('READY FOR 2nd SYNC');
            setIsReinitialized(false);
        };
        firstSync = 1;
       // console.log("useEffect#7 in action: data is deleted");
    }, [isDeleted]);

    useEffect( () => {
        setTimeout(function() { deleteMagic().then( () => {setIsDeleteMagic(false)}); }, 2000);
        //setTimeout(function() { syncWaterData2('total_water'); }, 5000);
        //setTimeout(function() { getUserData(); }, 2000);
    }, []);

    useEffect( () => {
        focusListener = navigation.addListener('didFocus', () => {
			console.log('Screen Focused');
            getUserData();
            accessCounter.count+=1
            saveHomeCounter('home_counter', accessCounter);
            console.log('HomeScreen Counter: ' + accessCounter.count);
            firebaseRef.child('Users').child(temp_token).child('Screen Access Counters').child(moment().format('MMMM DD YYYY')).child('count').set(accessCounter.count);	
		});
	},[]);

    if(isLoadingBreakfast || isLoadingLunch || isLoadingDinner || isLoadingSnacks || isLoadingUserData || isDeleteMagic || isDeletionData || isLoadingFood || isReinitialized){
        return(
            <View>
                <Text>LOADING</Text>
            </View>
        )
    }

    return(
        <ScrollView style={styles.main}>
            <CalendarStrip
                style={styles.calendar}
                daySelectionAnimation={{type: 'background', duration: 200, highlightColor: ThemeConstants.MAIN_YELLOW}}
                calendarHeaderStyle={{color: 'white'}}
                calendarColor={ThemeConstants.MAIN_BLUE}
                dateNumberStyle={{color: 'white'}}
                dateNameStyle={{color: 'white'}}
                highlightDateNumberStyle={{color: 'white'}}
                highlightDateNameStyle={{color: 'white'}}
                disabledDateNameStyle={{color: 'grey'}}
                disabledDateNumberStyle={{color: 'grey'}}
                onDateSelected={(onDateSelected) => {
                    var currentDateSelected = moment(onDateSelected).format('MMMM DD YYYY');
                    setDateSelected(currentDateSelected);
                    setDateMoment(moment(onDateSelected));
                    //console.log(moment('2019-11-30T13:51:45.046Z').format('MMMM DD YYYY')); // FOR DEV PURPOSES ONLY
                }}
            />
            
            <View>
                <View style={styles.padding}></View>

                <StatsContainer
                    valuesTotal = {userData}
                    valuesCurrent = {current}
                />
            </View>
            
            <IntakeFoodContainer
                food={current_breakfast}
                mealTitle='Breakfast'
                navigateToSearchFood={() => navigation.navigate('SearchFood', {
                    foodArray: breakfast,
                    setFoodArray: setBreakfast,
                    currentDate: dateMoment,
                    deleteID: 0,
                    mealTitle: 'Breakfast',
                    userID: token
                })}
                onDeletion={setCurrentBreakfast}
                onDeletion2={setIsDeleted}
                onDeletion3={setBreakfast}
                onDeletion4={dateSelected}
                onDeletion5={breakfast}
                foodArray1 = {breakfast}
                setFoodArray1 = {setBreakfast}
                token = {token}
            />

            <IntakeFoodContainer
                food={current_lunch}
                mealTitle='Lunch'
                navigateToSearchFood={() => navigation.navigate('SearchFood', {
                    foodArray: lunch,
                    setFoodArray: setLunch,
                    currentDate: dateMoment,
                    deleteID: 0,
                    mealTitle: 'Lunch',
                    userID: token
                })}
                onDeletion={setCurrentLunch}
                onDeletion2={setIsDeleted}
                onDeletion3={setLunch}
                onDeletion4={dateSelected}
                onDeletion5={lunch}
                foodArray1 = {lunch}
                setFoodArray1 = {setLunch}
                token = {token}
            />

            <IntakeFoodContainer
                food={current_dinner}
                mealTitle='Dinner'
                navigateToSearchFood={() => navigation.navigate('SearchFood', {
                    foodArray: dinner,
                    setFoodArray: setDinner,
                    currentDate: dateMoment,
                    deleteID: 0,
                    mealTitle: 'Dinner',
                    userID: token
                })}
                onDeletion={setCurrentDinner}
                onDeletion2={setIsDeleted}
                onDeletion3={setDinner}
                onDeletion4={dateSelected}
                onDeletion5={dinner}
                foodArray1 = {dinner}
                setFoodArray1 = {setDinner}
                token = {token}
            />

            <IntakeFoodContainer
                food={current_snacks}
                mealTitle='Snacks'
                navigateToSearchFood={() => navigation.navigate('SearchFood', {
                    foodArray: snacks,
                    setFoodArray: setSnacks,
                    currentDate: dateMoment,
                    deleteID: 0,
                    mealTitle: 'Snacks',
                    userID: token
                })}
                onDeletion={setCurrentSnacks}
                onDeletion2={setIsDeleted}
                onDeletion3={setSnacks}
                onDeletion4={dateSelected}
                onDeletion5={snacks}
                foodArray1 = {snacks}
                setFoodArray1 = {setSnacks}
                token = {token}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    calendar: {
        height:100,
        paddingTop: 5,
        paddingBottom: 5
    },
    main: {
        backgroundColor: ThemeConstants.MAIN_WHITE,
        flex: 1
    },
    padding: {
        backgroundColor: ThemeConstants.MAIN_BLUE,
        height: 100,
        position: 'absolute',
        left: 0,
        right: 0
    },
    stats: {
        position: 'relative',
    }
});

export default HomeScreen;