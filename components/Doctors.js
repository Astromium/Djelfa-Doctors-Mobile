import React, { useEffect, useState, useContext } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native';

import AppText from './AppText';
import doctors from '../api/doctors';
import AppCard from './AppCard';
import DoctorSvg from '../Svgs/DoctorSvg'
import FemaleDoctor from '../Svgs/FemaleDoctor'
import AppActivityIndicator from './AppActivityIndicator';
import colors from '../config/colors';

import ThemeContext from '../themes/ThemeContext';

export default function Doctors({ navigation, route }) {

    const { theme } = useContext(ThemeContext)

    const [loaderVisible, setLoaderVisible] = useState(true)
    const [docs, setDocs] = useState([]);

    const loadDoctors = async () => {
        try {
            setLoaderVisible(true)
            const res = await doctors.getDoctors(route.params.spec);
            setDocs(res);
            setLoaderVisible(false)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        loadDoctors();
    }, [])

    if (loaderVisible) {
        return (
            <View style={[styles.loaderContainer, { backgroundColor: theme.headerBg }]}>
                <AppActivityIndicator visible={loaderVisible} />
            </View>
        )
    }

    else {
        return (
            <View style={[styles.container, { backgroundColor: theme.accent }]}>

                <ScrollView>
                    <View style={{ position: 'absolute', top: 0, backgroundColor: theme.headerBg, width: '100%', height: 200, borderBottomRightRadius: 75 }} />
                    <AppText style={styles.text}>   الأطباء : {docs.length}</AppText>

                    <View style={styles.cardsContainer}>
                        {docs.map(doc => {
                            return (
                                <AppCard onPress={() => navigation.navigate('Doctor', {
                                    id: doc._id,
                                    title: doc.name
                                })} center title={doc.name} btn='التفاصيل' key={doc._id}>
                                    {doc.gender === 'male' ? <DoctorSvg /> : <FemaleDoctor />}
                                </AppCard>
                            )
                        })}
                    </View>
                    <View style={{ position: 'absolute', bottom: 0, backgroundColor: theme.secondary, width: '100%', height: 150, borderTopLeftRadius: 75 }}></View>
                </ScrollView>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        position: 'relative'
    },
    cardsContainer: {
        marginVertical: 20,
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    loaderContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 26,
        color: colors.primary,
        marginTop: 30,
        marginRight: 22,
        marginBottom: 30,
    }
})
