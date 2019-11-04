import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

import * as ThemeConstants from '../common/Themes';

const SearchBar = ({ onTermChange, onTermSubmit, term }) => {
    return (
        <View style={styles.background}>
            <Feather name='search' style={styles.icon}/>
            <TextInput
                autoCapitalize='words'
                autoCorrect={false}
                onChangeText={onTermChange}
                onEndEditing={onTermSubmit}
                placeholder='Search food'
                style={styles.input}
                value={term}
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

export default SearchBar;