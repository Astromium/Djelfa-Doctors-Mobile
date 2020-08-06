import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';

import colors from '../config/colors'
import AppText from './AppText';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AppCard({ onPress, title, subtitle, children, btn }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.card}>
                <View style={styles.imageContainer}>
                    {children}
                </View>
                <AppText style={styles.title}>{title}</AppText>
                {subtitle && <AppText style={styles.subTitle}>{subtitle}</AppText>}
                {btn && <AppText style={styles.btn}>{btn}</AppText>}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '80%',
        marginVertical: 50,
        position: 'relative',
        backgroundColor: colors.secondary,
        alignItems: 'center',
        elevation: 2,
        borderRadius: 15
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.accent,
        elevation: 4,
        marginTop: -50,
        marginBottom: 10

    },
    title: {
        fontSize: 22,
        marginBottom: 10,
        width: '90%',
        lineHeight: 30,
        textAlign: 'center'
    },
    subTitle: {
        color: colors.primary,
        marginBottom: 12,
        elevation: 5,
        fontSize: 18,
    },
    btn: {
        paddingHorizontal: 15,
        paddingVertical: 4,
        marginBottom: 12,
        fontSize: 15,
        borderRadius: 15,
        color: colors.white,
        backgroundColor: colors.primary,
        elevation: 5
    }
})