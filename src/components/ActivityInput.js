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
        borderBottomColor: ThemeConstants.BORDER_GRAY,
        borderBottomWidth: 1,
        borderTopColor: ThemeConstants.BORDER_GRAY,
        borderTopWidth: 1,
        paddingVertical: 12,
    },
    input: {
        fontSize: ThemeConstants.FONT_SIZE_REGULAR
    }
});

export default ActivityInput;
