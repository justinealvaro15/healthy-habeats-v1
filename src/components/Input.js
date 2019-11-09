import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import * as ThemeConstants from '../common/Themes';

const Input = ({ onTermChange, term, input }) => {
    
    return (
        <View style={styles.background}>
            <TextInput
                keyboardType={'numeric'}
                autoCapitalize='words'
                autoCorrect={false}
                onChangeText={onTermChange}
                placeholder={input}
                style={styles.input}
                value={term.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: ThemeConstants.BACKGROUND_WHITE,
        borderRadius: ThemeConstants.CONTAINER_RADIUS,
        flexDirection: 'row',
        height: 50,
        margin: ThemeConstants.CONTAINER_MARGIN
    },
    icon: {
        fontSize: 35,
        alignSelf: 'center',
        margin: 10,
        marginRight: 15
    },
    input: {
        flex: 1,
        fontSize: ThemeConstants.FONT_SIZE_REGULAR
    }
});

export default Input;
