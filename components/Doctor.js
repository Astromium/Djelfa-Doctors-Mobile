import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, StatusBar, ScrollView, Modal, TouchableOpacity, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as WebBrowser from 'expo-web-browser';



import AppText from './AppText';
import AppButton from './AppButton';
import doctors from '../api/doctors';
import colors from '../config/colors';
import ActivityIndicator from './ActivityIndicator';
import DoctorSvg from '../Svgs/DoctorSvg';
import FemaleDoctor from '../Svgs/FemaleDoctor';
import Report from './Report';
import ThemeContext from '../themes/ThemeContext';




export default function Doctor({ route }) {

    const [location, setLocation] = useState(false);
    const [loaderVisible, setLoaderVisible] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [doc, setDoc] = useState({});
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const { theme, onChangeTheme } = useContext(ThemeContext)

    const loadDoctor = async () => {
        try {
            setLoaderVisible(true)
            const res = await doctors.getDoctor(route.params.id)
            setDoc(res)
            const str = `${res.coordinates[0]},${res.coordinates[1]}`
            setDestination(str);
            setLoaderVisible(false)
        } catch (err) {
            console.log(err)
        }
    }

    const requestLocation = async () => {
        try {
            const { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission Denied')
            }
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            setLocation({ latitude, longitude })
            const str = `${latitude},${longitude}`
            setOrigin(str)
        } catch (err) {
            console.log(err)
        }
    }

    const handleBrowserOpen = async () => {
        if (location) {
            await WebBrowser.openBrowserAsync(`https://www.google.dz/maps/dir/${origin}/${destination}/@34.6740164,3.2496563,16z/data=!3m1!4b1!4m15!4m14!1m8!2m2!1d3.267995!2d34.682571!3m4!1m2!1d3.2681698!2d34.6798804!3s0x1289c57a067b4c11:0x18d6bbf0f7ad70b7!1m3!2m2!1d3.250802!2d34.677537!3e0?hl=en&authuser=0`)
        } else {
            alert('You need to enable the location permission')
        }
    }



    useEffect(() => {
        loadDoctor();
        requestLocation();
    }, [])

    if (loaderVisible) return (
        <View style={[styles.loadingContainer, { backgroundColor: theme.secondary, }]}>
            <ActivityIndicator visible={loaderVisible} />
        </View>
    )

    return (
        <View style={[styles.container, { backgroundColor: theme.secondary, }]}>
            <ScrollView style={{ width: '100%' }}>
                <View style={[styles.header, { backgroundColor: theme.type === 'green' ? theme.white : theme.accent }]}>
                    <View style={[styles.imageContainer, { backgroundColor: theme.type === 'green' ? theme.white : theme.accent }]}>
                        {doc.gender === 'male' ? <DoctorSvg /> : <FemaleDoctor />}
                    </View>
                    <AppText style={styles.name}>{doc.name}</AppText>
                    <AppText style={[styles.spec, { color: theme.drawerItemText }]}>{doc.description}</AppText>
                </View>
                <AppText style={styles.detailsTitle}>معلومات عن الطبيب</AppText>

                <View style={[styles.details, { backgroundColor: theme.accent }]}>
                    <View style={styles.detailItem}>
                        <AppText style={styles.detailText}> العنوان : {doc.adress}</AppText>
                        <SimpleLineIcons name='location-pin' color={theme.primary} size={20} />
                    </View>
                    <View style={styles.detailItem}>
                        {/* <TouchableOpacity onPress={() => Linking.openURL('tel:${0' + doc.phone[0] + '}')}>
                            {doc.phone.length > 0 ? <AppText style={styles.detailText}> الهاتف : 0{doc.phone[0]}</AppText> : <AppText style={styles.detailText}>غير متوفر حاليا</AppText>}
                        </TouchableOpacity> */}
                        <AppText style={styles.detailText}>الهاتف :</AppText>
                        <SimpleLineIcons name='phone' color={theme.primary} size={20} />
                    </View>
                    <View style={styles.phones}>
                        {doc.phone.length === 0 ? (<AppText>غير متوفر حاليا</AppText>) :
                            (doc.phone.map(num => (
                                <View style={styles.phoneContainer} key={num}>
                                    <AppText style={[styles.detailText, { marginLeft: 20 }]}>0{num}</AppText>
                                    <TouchableOpacity onPress={() => Linking.openURL('tel:${0' + num + '}')} style={styles.callBtn}>
                                        <SimpleLineIcons style={{ marginLeft: 8 }} name='phone' color={theme.white} size={16} />
                                        <AppText>إتصل</AppText>
                                    </TouchableOpacity>
                                </View>
                            )))}

                    </View>
                </View>

                <View style={styles.midContainer}>
                    <AppText style={styles.detailsTitle}>الموقع على الخريطة</AppText>
                    <SimpleLineIcons name='map' color={theme.primary} size={25} />
                </View>

                <View style={styles.mapContainer}>
                    <MapView
                        mapType='standard'
                        style={styles.map}
                        initialRegion={{
                            latitude: doc.coordinates[0],
                            longitude: doc.coordinates[1],
                            latitudeDelta: 0.002,
                            longitudeDelta: 0.002,
                        }}>

                        <Marker
                            coordinate={{ latitude: doc.coordinates[0], longitude: doc.coordinates[1] }}
                            title={doc.name}
                            pinColor={theme.primary}
                            style={styles.marker} />

                    </MapView>
                </View>

                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <View style={{
                        width: '50%',
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 20,
                        backgroundColor: theme.primary,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={handleBrowserOpen} style={{
                            flexDirection: 'row'
                        }}>
                            <MaterialCommunityIcons name='map-marker-path' size={25} color={theme.white} />
                            <AppText style={{ fontSize: 16, marginLeft: 10 }}>رؤية الطريق</AppText>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.btnContainer}>
                    <AppButton onPress={() => setModalVisible(true)} title='الأبلاغ عن خطأ في معلومات الطبيب' />
                </View>



                <Modal animationType='slide' visible={modalVisible}>
                    <Report onAnimationFinish={() => setModalVisible(false)} onPress={() => setModalVisible(false)} />
                </Modal>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    loadingContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        width: '100%',
        height: 250,
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight + 10,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25
    },
    imageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontFamily: 'tajawal',
        color: colors.primary,
        fontSize: 22
    },
    spec: {
        fontFamily: 'tajawal',
        fontSize: 16,
        color: '#000',
        opacity: 0.9,
        marginTop: 10
    },
    map: {
        marginTop: 10,
        width: '100%',
        height: '100%'
    },
    marker: {
        width: 50,
        height: 50
    },
    details: {
        width: '90%',
        alignSelf: 'flex-end',
        //backgroundColor: colors.accent,
        padding: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        marginBottom: 20
    },
    detailsTitle: {
        marginVertical: 20,
        marginHorizontal: 20,
        fontSize: 22,
    },
    detailItem: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginVertical: 10,
        paddingLeft: 5
    },
    detailText: {
        marginRight: 5,
        fontSize: 16,
        lineHeight: 25,
        textAlign: "right"
    },
    midContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginBottom: 20
    },
    mapContainer: {
        width: '100%',
        marginBottom: 20,
        height: 250,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden'
    },
    btnContainer: {
        paddingHorizontal: 20
    },
    webViewHeader: {
        height: 60,
        width: '100%',
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primary
    },
    phones: {
        width: '100%'
    },
    phoneContainer: {
        marginVertical: 10,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    callBtn: {
        marginRight: 30,
        backgroundColor: colors.primary,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        flexDirection: 'row-reverse'
    }
})
