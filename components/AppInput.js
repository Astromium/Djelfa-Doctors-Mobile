import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';

export default function AppInput({ icon, placeholder, onChangeText, iconColor, style, ...otherProps }) {
    return (
        <View style={styles.inputContainer}>
            <TextInput placeholder={placeholder}
                placeholderTextColor='#ccc'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={onChangeText}
                style={[styles.input, style]}
                {...otherProps}

            />
            {icon && <MaterialCommunityIcons name={icon} size={25} color={iconColor} />}
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: colors.secondary,
        borderBottomColor: colors.primary,
    },
    input: {
        fontFamily: 'tajawal',
        fontSize: 16,
        flex: 1,
        color: colors.white,
        marginRight: 5
    }
})