import React from 'react';
import { Text, StyleSheet } from 'react-native';

import colors from '../config/colors';

export default function AppText({ style, children }) {
    return (
        <Text numberOfLines={2} style={[styles.text, style]}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        color: colors.white,
        fontFamily: 'tajawal'
    }
})