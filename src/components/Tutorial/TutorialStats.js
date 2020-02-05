import React from 'react';
import { StyleSheet, View } from 'react-native';

import PhoneCase from './PhoneCase';
import StatsDetail from '../StatsDetail';
import * as ThemeConstants from '../../common/Themes';

const StatsContainer = () => {
    const render_inside = () => {
        return(
            <View style={styles.container}>
                <View style={styles.details}>
                    <View style={styles.bar}>
                        <StatsDetail style={styles.details} title='Energy' unit='kcal' valueTotal={2375} valueCurrent={500}/>
                        <StatsDetail style={styles.details} title='Carbs' unit='g' valueTotal={380} valueCurrent={375}/>
                    </View>
        
                    <View style={styles.bar}>
                        <StatsDetail style={styles.details} title='Protein' unit='g' valueTotal={90} valueCurrent={69}/>
                        <StatsDetail style={styles.details} title='Fat' unit='g' valueTotal={55} valueCurrent={125}/>
                    </View>
                </View>
            </View>
        );
    };

    return(
        <PhoneCase render_content={render_inside()}/>
    );
};

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    container: {
        backgroundColor: ThemeConstants.MAIN_WHITE,
        justifyContent: 'center',
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN*0.5,
        marginTop: ThemeConstants.CONTAINER_MARGIN*1.75,
        paddingTop: ThemeConstants.CONTAINER_MARGIN*0.2
    },
    details: {
        margin: ThemeConstants.CONTAINER_MARGIN*0.8,
    },
});

export default StatsContainer;