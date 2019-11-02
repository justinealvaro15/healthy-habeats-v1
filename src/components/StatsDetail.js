import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const StatsDetail = ({ title }) => {
    return(
        <View style={styles.details}>
            <View style={styles.chart}/>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    chart: {
        alignSelf: 'center',
        backgroundColor: 'black',
        borderRadius: 60/2,
        height: 60,
        width: 60
    },
    details: {
        flex: 1,
        marginVertical: 20
    },
    text: {
        alignSelf: 'center',
        fontWeight: 'bold'
    }
});

export default StatsDetail;