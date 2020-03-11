import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

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
        backgroundColor: ThemeConstants.MAIN_WHITE,
        borderColor: ThemeConstants.BORDER_GRAY,
        borderRadius: ThemeConstants.CONTAINER_RADIUS,
        borderWidth: 1,
        flexDirection: 'row',
        height: 50,
        marginBottom: ThemeConstants.CONTAINER_MARGIN/2,
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN,
        marginTop: ThemeConstants.CONTAINER_MARGIN
    },
    icon: {
        fontSize: 25,
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