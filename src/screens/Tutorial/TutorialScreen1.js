import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import { Feather } from '@expo/vector-icons';

import * as ThemeConstants from '../../common/Themes';

const TutorialScreen1 = ({ navigation }) => {
    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <Text style={styles.text_header}>WELCOME TO</Text>
                <Image source={require('../../../assets/logo_name.png')} style={styles.logo}/>
            </View>

            <View style={{ justifyContent: 'flex-end' }}>
                <View style={styles.button_container}>
                    <View style={[styles.button, {opacity: 0}]}>
                        <Feather name='corner-down-left' style={styles.text_button}/>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.circle_active}></View>
                        <View style={styles.circle_inactive}></View>
                        <View style={styles.circle_inactive}></View>
                        <View style={styles.circle_inactive}></View>
                    </View>

                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => navigation.navigate('Tutorial2')}
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
        margin: ThemeConstants.CONTAINER_MARGIN
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
        flex: 1,
        justifyContent: 'center'
    },
    logo: {
        height: 40,
        width: 320
    },
    main: {
        backgroundColor: ThemeConstants.MAIN_BLUE,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        flex: 1
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
        fontSize: ThemeConstants.FONT_SIZE_HEADER*1.5,
        fontStyle: 'italic',
        fontWeight: 'bold',
        marginBottom: ThemeConstants.CONTAINER_MARGIN/2,
        textAlign: 'center',
    }
});

export default withNavigation(TutorialScreen1);