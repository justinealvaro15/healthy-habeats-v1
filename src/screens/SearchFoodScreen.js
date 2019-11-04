import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import * as ThemeConstants from '../common/Themes';
import SearchBar from '../components/SearchBar';

const SearchFoodScreen = () => {
    const [term, setTerm] = useState('')

    return (
        <View style={styles.main}>
            <SearchBar
                onTermChange={newTerm => setTerm(newTerm)}
                onTermSubmit={() => console.log('term submitted')}
                term={term}
            />
            <Text>{term}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        backgroundColor: ThemeConstants.BACKGROUND_LIGHT_GRAY,
        flex: 1
    }
});

export default SearchFoodScreen; 