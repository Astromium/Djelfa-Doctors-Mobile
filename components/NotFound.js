import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import DoctorNotFound from '../Svgs/DoctorNotFound';
import AppText from './AppText';
import colors from '../config/colors';

export default function NotFound({ width, height, onPress }) {
    return (
        <View style={styles.container}>
            <DoctorNotFound width={width} height={height} />
            <AppText style={styles.text}>لم يتم العثور على هذا الإسم</AppText>
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <AppText style={styles.btnText}>طلب إضافة طبيب</AppText>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20,
        alignItems: 'center'
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginVertical: 20,
        fontSize: 18,
        color: colors.white
    },
    btnText: {
        fontFamily: 'tajawal',
        fontSize: 16
    }
})