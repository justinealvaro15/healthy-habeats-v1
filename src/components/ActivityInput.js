import React from 'react';
import { StyleSheet, TextInput, View  } from 'react-native';

import * as ThemeConstants from '../common/Themes';

const ActivityInput = ({ input, onTermChange, term  }) => {
    
    return (
        <View style={styles.background}>
            <TextInput
                autoCapitalize='words'
                autoCorrect={false}
                keyboardType={'default'}
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
        alignSelf: 'center',
        fontSize: 35,
        margin: 10,
        marginRight: 15
    },
    input: {
        flex: 1,
        fontSize: ThemeConstants.FONT_SIZE_REGULAR
    }
});

export default ActivityInput;
