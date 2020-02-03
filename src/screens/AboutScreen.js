import React from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import * as ThemeConstants from '../common/Themes';
import * as AboutText from '../common/AboutText';

const AboutScreen = () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Text style={styles.text_header}>Healthy Habeats</Text>
                <Text style={styles.text_regular}>{AboutText.about}</Text>
            </View>

            <View style={styles.container}>
                <Text style={styles.text_header}>Contact Us</Text>

                <View style={{ marginBottom: ThemeConstants.CONTAINER_MARGIN*0.5 }}>
                    <Text style={styles.text_subheader}>Email</Text>
                    <Text style={styles.text_regular}>{AboutText.email}</Text>
                </View>

                <View>
                    <Text style={styles.text_subheader}>Address</Text>
                    <Text style={styles.text_regular}>{AboutText.address}</Text>
                </View>
            </View>

            <View style={styles.container}>
                <Text style={styles.text_header}>Acknowledgements</Text>
                <Text style={styles.text_regular}>{AboutText.ack}</Text>
            </View>

            <View style={styles.container}></View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: ThemeConstants.CONTAINER_MARGIN*1.5,
        marginTop: ThemeConstants.CONTAINER_MARGIN*1.5
    },
    text_header: {
        borderBottomColor: ThemeConstants.BORDER_GRAY,
        borderBottomWidth: 1,
        fontSize: ThemeConstants.FONT_SIZE_HEADER,
        fontWeight: 'bold',
        marginBottom: ThemeConstants.CONTAINER_MARGIN*0.5,
        paddingBottom: ThemeConstants.CONTAINER_MARGIN*0.25,
        textTransform: 'uppercase'
    },
    text_regular: {
        fontSize: ThemeConstants.FONT_SIZE_REGULAR,
        lineHeight: 25
    },
    text_subheader: {
        fontSize: ThemeConstants.FONT_SIZE_MEDIUM,
        fontWeight: 'bold'
    }
});

export default withNavigation(AboutScreen);