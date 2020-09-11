import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Modal, StatusBar, Share } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer'
import * as WebBrowser from 'expo-web-browser';
import * as MailComposer from 'expo-mail-composer';

import RequestDoctor from '../components/RequestDoctor';
import Report from '../components/Report';

import { MaterialCommunityIcons } from '@expo/vector-icons'
import Logo from '../Svgs/Logo';
import AppText from '../components/AppText';
import colors from '../config/colors';
import ThemeContext from '../themes/ThemeContext';

export default function DrawerContent(props) {

    const [requestVisible, setRequestVisible] = React.useState(false);
    const [reportVisible, setReportVisible] = React.useState(false);
    const { theme, onChangeTheme } = useContext(ThemeContext)

    const handleShare = async () => {
        try {
            await Share.share({
                title: 'App link',
                message: 'https://play.google.com/store/apps/details?id=com.astromium.djelfadoctors',
                url: 'https://play.google.com/store/apps/details?id=com.astromium.djelfadoctors'
            });

        } catch (error) {
            alert(error.message);
        }
    }

    const handleRating = async () => {
        try {
            await WebBrowser.openBrowserAsync('https://play.google.com/store/apps/details?id=com.astromium.djelfadoctors')
        } catch (err) {
            alert(err);
        }
    }

    const handleContact = async () => {
        try {
            await MailComposer.composeAsync({
                recipients: ['djelfadoctors17@gmail.com']
            })
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: theme.headerBg }}>
            <StatusBar backgroundColor={theme.secondary} />
            <DrawerContentScrollView {...props}>
                <View style={styles.header}>
                    <Logo width='80%' height='80%' />
                    <AppText style={[styles.headerTitle, { color: theme.primary }]}>أطباء الجلفة</AppText>
                </View>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.seperator}></View>
                </View>
                <View style={{ marginTop: 20, elevation: 2 }}>
                    <TouchableOpacity onPress={() => setRequestVisible(true)}>
                        <View style={styles.menuItem}>
                            <AppText style={[styles.itemText, { color: theme.drawerItemText }]}>طلب إضافة طبيب</AppText>
                            <MaterialCommunityIcons name='doctor' color={theme.primary} size={28} />
                        </View>
                    </TouchableOpacity>



                    <TouchableOpacity onPress={handleShare} style={{ marginTop: 20 }}>
                        <View style={styles.menuItem}>
                            <AppText style={[styles.itemText, { color: theme.drawerItemText }]}>مشاركة التطبيق</AppText>
                            <MaterialCommunityIcons name='share' color={theme.primary} size={28} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleRating} style={{ marginTop: 20 }}>
                        <View style={styles.menuItem}>
                            <AppText style={[styles.itemText, { color: theme.drawerItemText }]}>تقييم التطبيق</AppText>
                            <MaterialCommunityIcons name='star' color={theme.primary} size={28} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginTop: 20 }} onPress={handleContact}>
                        <View style={styles.menuItem}>
                            <AppText style={[styles.itemText, { color: theme.drawerItemText }]}>تواصل معنا</AppText>
                            <MaterialCommunityIcons name="email-plus-outline" size={28} color={colors.primary} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginTop: 20 }} onPress={() => setReportVisible(true)}>
                        <View style={styles.menuItem}>
                            <AppText style={[styles.itemText, { color: theme.drawerItemText }]}>الإبلاغ عن خطأ</AppText>
                            <MaterialCommunityIcons name='alert-circle' color={theme.primary} size={28} />
                        </View>
                    </TouchableOpacity>

                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={onChangeTheme} style={{
                            marginTop: 20, width: '60%', paddingVertical: 10, paddingHorizontal: 20, backgroundColor: theme.primary, justifyContent: 'center',
                            alignItems: 'center', borderRadius: 20, elevation: 2
                        }}>
                            <AppText style={{ fontSize: 16, color: theme.white }}>تغيير الألوان</AppText>
                        </TouchableOpacity>
                    </View>
                </View>
            </DrawerContentScrollView>
            <View style={styles.footer}>
                <AppText style={[styles.itemText, { color: theme.drawerItemText }]}>أطباء الجلفة</AppText>
                <Text style={[styles.itemTextFooter, { color: theme.drawerItemText }]}>v1.0.0</Text>
            </View>
            <Modal visible={requestVisible}>
                <RequestDoctor onPress={() => setRequestVisible(false)} onAnimationFinish={() => setRequestVisible(false)} />
            </Modal>
            <Modal visible={reportVisible}>
                <Report onPress={() => setReportVisible(false)} onAnimationFinish={() => setReportVisible(false)} />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        padding: 20,
        justifyContent: 'center',
        height: 150,
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 22,
        marginTop: 10
    },
    footer: {
        marginTop: 15,
        width: '100%',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row-reverse'
    },
    menuItem: {
        width: '100%',
        paddingHorizontal: 20,
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    itemText: {
        opacity: 0.6,
        marginLeft: 20,
        fontSize: 16
    },
    seperator: {
        height: 2,
        backgroundColor: colors.primary,
        width: '80%',
        opacity: 0.5
    },
    itemTextFooter: {
        opacity: 0.4,
        textAlign: 'center',
        fontSize: 14
    }
})