import React, { useState, useContext } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert, ToastAndroid } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

import reports from '../api/reports';
import AppInput from './AppInput';
import AppText from './AppText';
import AppButton from './AppButton';
import colors from '../config/colors';
import ThemeContext from '../themes/ThemeContext';

export default function Report({ onAnimationFinish, onPress }) {

    const { theme } = useContext(ThemeContext);

    const [animationVisible, setAnimationVisible] = useState(false);
    const [loaderVisible, setLoaderVisible] = useState(false);
    const [message, setMessage] = useState(false);
    const [messageError, setMessageError] = useState(false);

    const showToast = () => {
        ToastAndroid.show("تم الإرسال بنجاح", ToastAndroid.SHORT);
    }

    const handleSubmit = async () => {
        if (!message) {
            return setMessageError(true);
        } else {
            try {
                setLoaderVisible(true)
                const res = await reports.createReport({ message })
                if (res.status === 'success') {
                    //console.log('report posted')
                    setLoaderVisible(false)
                    setAnimationVisible(true)
                    showToast();
                }
            } catch (err) {
                console.log(err)
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
                <MaterialCommunityIcons onPress={onPress} name='arrow-left' color={colors.primary} size={25} />
                <AppText style={styles.headerTitle}>الإبلاغ عن خطأ</AppText>
            </View>
            <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <View style={[styles.inputContainer, { backgroundColor: theme.secondary }]}>
                    <AppText style={styles.inputContainerTitle}>إدخال معلومات الطبيب</AppText>
                    <AppInput multiline={true} numberOfLines={4} onChangeText={(text) => setMessage(text)} style={[styles.input, { backgroundColor: theme.accent }]} placeholder='اشرح باختصار الخطأ الذي لاحظته' />
                    {messageError && <AppText style={styles.errorText}>يرجى إدخال المحتوى</AppText>}
                    <AppButton onPress={handleSubmit} width='30%' title='إرسال' color={colors.primary} icon='circle-edit-outline' />
                    {loaderVisible && <ActivityIndicator animating size='large' />}
                </View>
            </View>
        </View>)

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
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
        height: 200,
        textAlignVertical: 'top',
        padding: 20,
        marginVertical: 5
    },
    header: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
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