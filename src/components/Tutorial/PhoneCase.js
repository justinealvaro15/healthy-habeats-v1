import React from 'react';
import { StyleSheet, View } from 'react-native';

import * as ThemeConstants from '../../common/Themes';


const PhoneCase = ({ render_content }) => {
    return(
        <View style={styles.main}>
            <View style={styles.top}>
                <View style={styles.camera}/>
                <View style={styles.speaker}/>
                <View style={styles.camera}/>
            </View>
            { render_content }
        </View>
    );
};

const styles = StyleSheet.create({
    camera: {
        backgroundColor: ThemeConstants.BORDER_GRAY,
        borderRadius: 6,
        height: 12,
        width: 12
    },
    main: {
        alignContent: 'center',
        backgroundColor: 'black',
        borderTopRightRadius: ThemeConstants.CONTAINER_RADIUS*2,
        borderTopLeftRadius: ThemeConstants.CONTAINER_RADIUS*2,
        margin: ThemeConstants.CONTAINER_MARGIN,
    },
    speaker: {
        backgroundColor: ThemeConstants.FONT_GRAY,
        height: 6,
        marginHorizontal: 40,
        width: 40,
    },
    top: { 
        alignSelf: 'center',
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        top: 20
    }
});

export default PhoneCase;