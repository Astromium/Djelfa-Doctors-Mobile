import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppText from './AppText';
import colors from '../config/colors';

export default function AppButton({ title, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <AppText style={styles.text}>{title}</AppText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    text: {
        fontSize: 16,
        marginRight: 5
    }
})