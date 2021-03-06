import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import TutorialSearch from '../../components/Tutorial/TutorialSearch';
import { Feather } from '@expo/vector-icons';

import * as ThemeConstants from '../../common/Themes';
import Constants from 'expo-constants';

const TutorialScreen3 = ({ navigation }) => {
    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <View style={styles.status_bar}></View>
                <Image source={require('../../../assets/logo_name.png')} style={styles.logo}/>
            </View>

            <View>
                <Text style={styles.text_header}>SEARCH FOR</Text>
                <Text style={styles.text_header}>FOOD ITEMS</Text>
                <TutorialSearch/>
            </View>

            <View style={{ justifyContent: 'flex-end' }}>
                <View style={styles.button_container}>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => navigation.navigate('Tutorial2')}
                        underlayColor={ThemeConstants.HIGHLIGHT_GREEN}
                    >
                        <Feather name='corner-down-left' style={styles.text_button}/>
                    </TouchableHighlight>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.circle_inactive}></View>
                        <View style={styles.circle_inactive}></View>
                        <View style={styles.circle_active}></View>
                        <View style={styles.circle_inactive}></View>
                    </View>

                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => navigation.navigate('Tutorial4')}
                        underlayColor={ThemeConstants.HIGHLIGHT_GREEN}
                    >
                        <Feather name='corner-down-right' style={styles.text_button}/>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bottom_view: { 
        bottom: 0,
        position: 'absolute'
    },
    button: {
        backgroundColor: ThemeConstants.HIGHLIGHT_GREEN,
        borderRadius: ThemeConstants.CONTAINER_RADIUS,
    },
    button_container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: ThemeConstants.CONTAINER_MARGIN,
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN
    },
    circle_active: {
        borderRadius: 8,
        backgroundColor: ThemeConstants.MAIN_WHITE,
        height: 16,
        margin: 4,
        width: 16
    },
    circle_inactive: {
        borderRadius: 8,
        backgroundColor: ThemeConstants.MAIN_WHITE,
        height: 16,
        margin: 4,
        opacity: 0.5,
        width: 16
    },
    header: {
        alignItems: 'center',
        marginTop: ThemeConstants.CONTAINER_MARGIN,
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN*2
    },
    logo: {
        height: 25,
        marginBottom: ThemeConstants.CONTAINER_MARGIN/2,
        width: 200
    },
    main: {
        backgroundColor: ThemeConstants.MAIN_BLUE,
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1
    },
    status_bar: {
        backgroundColor: ThemeConstants.MAIN_BLUE,
        height: Constants.statusBarHeight
    },
    text_button: {
        alignContent: 'center',
        color: ThemeConstants.MAIN_WHITE,
        fontSize: ThemeConstants.FONT_SIZE_REGULAR,
        fontWeight: 'bold',
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN,
        marginVertical: ThemeConstants.CONTAINER_MARGIN/2,
        textAlign: 'center'
    },
    text_header: {
        color: ThemeConstants.MAIN_WHITE,
        fontSize: ThemeConstants.FONT_SIZE_HEADER,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase'
    }
});

export default withNavigation(TutorialScreen3);