import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';


const AboutScreen = () => {
    return (
        <View>
            <Text> About Page </Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default withNavigation(AboutScreen);