import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { MAIN_WHITE, FONT_SIZE_MEDIUM } from '../common/Themes';

export default function Header({ navigation, title }) {
    const openMenu = () => {
        navigation.openDrawer()
    }

    return (
        <View style={styles.header}>
            <Feather 
                name='menu'
                size={28}
                onPress={openMenu}
                style={styles.icon}
            />

            <View>{title}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    icon: {
        color: MAIN_WHITE,
        position: 'absolute',
        left: 16
    },
    text_header: {
        color: MAIN_WHITE,
        fontSize: FONT_SIZE_MEDIUM,
        fontWeight: 'bold',
    }
});