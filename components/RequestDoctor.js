import React, { useState, useContext } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert, ToastAndroid } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

import requests from '../api/requests';
import AppInput from './AppInput';
import AppText from './AppText';
import AppButton from './AppButton';
import colors from '../config/colors';
import ThemeContext from '../themes/ThemeContext';

export default function RequestDoctor({ onPress, onAnimationFinish }) {

    const [name, setName] = useState();
    const [adress, setAdress] = useState();
    const [nameError, setNameError] = useState(false);
    const [adrError, setAdrError] = useState(false);
    const [loaderVisible, setLoaderVisible] = useState(false);
    const [animationVisible, setAnimationVisible] = useState(false);
    const { theme } = useContext(ThemeContext)

    const showToast = () => {
        ToastAndroid.show("تم إرسال الطلب بنجاح", ToastAndroid.SHORT);
    }

    const handleSubmit = async () => {
        if (!name && !adress) {
            setNameError(true);
            setAdrError(true);
            return
        }
        if (!name && adress) {
            setNameError(true);
            setAdrError(false);
            return
        }
        if (!adress && name) {
            setAdrError(true);
            setNameError(false);
            return
        }
        if (name && adress) {
            setNameError(false);
            setAdrError(false);
            setLoaderVisible(true)
            try {
                const res = await requests.createRequest({ name, adress });
                if (res.status === 'success') {
                    //console.log('request posted')
                    setLoaderVisible(false);
                    setName('');
                    setAdress('');
                    setAnimationVisible(true)
                    showToast()
                }
            } catch (err) {
                console.log(err);
                Alert.alert('تنبيه', ' لم يتم إرسال الطلب يرجى التحقق من إتصالك بالأنترنت أو المحاولة لاحقا', [
                    {
                        text: 'حسنا',
                        onPress: () => {
                            setLoaderVisible(false)
                        },
                        style: 'destructive'
                    }
                ])

            }
        }
    }

    if (animationVisible) {
        return (
            <View style={[styles.container, { backgroundColor: theme.accent }]}>
                <LottieView source={require('../animations/done.json')} autoPlay loop={false} onAnimationFinish={onAnimationFinish} />
            </View>

        )
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.accent }]}>
            <View style={[styles.header, { backgroundColor: theme.headerBg }]}>
                <MaterialCommunityIcons onPress={onPress} name='arrow-left' color={theme.primary} size={25} />
                <AppText style={styles.headerTitle}>طلب إضافة طبيب</AppText>
            </View>
            <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <View style={[styles.inputContainer, { backgroundColor: theme.secondary }]}>
                    <AppText style={styles.inputContainerTitle}>إدخال معلومات الطبيب</AppText>
                    <AppInput onChangeText={(text) => setName(text)} style={styles.input} placeholder='إسم الطبيب' icon='account' iconColor={colors.primary} />
                    {nameError && <AppText style={styles.errorText}>يرجى إدخال إسم الطبيب</AppText>}
                    <AppInput onChangeText={(text) => setAdress(text)} style={styles.input} placeholder='عنوان الطبيب' icon='account-box-multiple' iconColor={colors.primary} />
                    {adrError && <AppText style={styles.errorText}>يرجى إدخال عنوان الطبيب</AppText>}
                    <AppButton onPress={handleSubmit} width='30%' title='إرسال' color={colors.primary} icon='circle-edit-outline' />
                    {loaderVisible && <ActivityIndicator animating size='large' />}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.accent,
        alignItems: 'center'
    },
    inputContainer: {
        width: '90%',
        padding: 20,
        marginTop: 10,
        backgroundColor: colors.secondary,
        borderRadius: 15
    },
    inputContainerTitle: {
        color: colors.primary,
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 18
    },
    input: {
        width: '100%',
        height: 40,
        borderBottomWidth: 2,
        borderBottomColor: colors.primary,
        marginVertical: 5
    },
    header: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: colors.white
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        color: colors.primary,
        fontSize: 18
    },
    errorText: {
        color: '#f32013',
        textAlign: 'right',
        marginRight: 20
    }
})