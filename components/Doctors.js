import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import doctors from '../api/doctors';
import AppCard from './AppCard';
import DoctorSvg from '../Svgs/DoctorSvg'
import FemaleDoctor from '../Svgs/FemaleDoctor'
import ActivityIndicator from './ActivityIndicator';
import colors from '../config/colors';

export default function Doctors({ navigation, route }) {

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
            <View style={styles.loaderContainer}>
                <ActivityIndicator visible={loaderVisible} />
            </View>
        )
    }

    else {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.cardsContainer}>
                        {docs.map(doc => {
                            return (
                                <AppCard onPress={() => navigation.navigate('Doctor', {
                                    id: doc._id,
                                    title: doc.name
                                })} title={doc.name} btn='التفاصيل' key={doc._id}>
                                    {doc.gender === 'male' ? <DoctorSvg /> : <FemaleDoctor />}
                                </AppCard>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        width: '100%'
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
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
