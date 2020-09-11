import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native';
import ThemeContext from '../themes/ThemeContext';



import SvgTest from '../Svgs/SvgTest';
import Generals from '../Svgs/Generals'
import Babies from '../Svgs/Babies';
import Eyes from '../Svgs/Eyes';
import Genecos from '../Svgs/Genecos';
import Hearts from '../Svgs/Hearts';
import Interiors from '../Svgs/Interiors';
import Kidnies from '../Svgs/Kidnies';
import Legs from '../Svgs/Legs';
import Lungs from '../Svgs/Lungs';
import Orls from '../Svgs/Orls';
import Radios from '../Svgs/Radios';
import Skins from '../Svgs/Skins';
import Sugars from '../Svgs/Sugars';
import Surgs from '../Svgs/Surgs';
import Teeth from '../Svgs/Teeth';
import AppText from './AppText';
import AppCard from './AppCard';
import colors from '../config/colors'
import AsyncStorage from '@react-native-community/async-storage';
import cache from '../utility/cache';
import Digests from '../Svgs/Digests';
import Psycos from '../Svgs/Psycos';


const specialities = [
    {
        id: 0,
        title: 'الطب العام',
        image: <Generals />,
        spec: 'general'
    },
    {
        id: 1,
        title: 'أمراض الأعصاب',
        image: <SvgTest />,
        spec: 'neuro'
    },
    {
        id: 2,
        title: 'أمراض الأطفال',
        image: <Babies />,
        spec: 'pediatre'
    },
    {
        id: 3,
        title: 'أمراض العين',
        image: <Eyes />,
        spec: 'ophta'
    },
    {
        id: 4,
        title: 'أمراض النساء',
        image: <Genecos />,
        spec: 'gyneco'
    },
    {
        id: 5,
        title: 'أمراض القلب',
        image: <Hearts />,
        spec: 'cardio'
    },
    {
        id: 6,
        title: 'أمراض داخلية',
        image: <Interiors />,
        spec: 'intern'
    },
    {
        id: 7,
        title: 'أمراض الكلى و المسالك البولية',
        image: <Kidnies />,
        spec: 'nephro'
    },
    {
        id: 8,
        title: 'أمراض العظام و المفاصل',
        image: <Legs />,
        spec: 'rhumato'
    },
    {
        id: 9,
        title: 'أمراض الجهاز التنفسي',
        image: <Lungs />,
        spec: 'pneumo'
    },
    {
        id: 10,
        title: 'أمراض الأنف و الحنجرة',
        image: <Orls />,
        spec: 'orl'
    },
    {
        id: 11,
        title: 'التصوير بالأشعة',
        image: <Radios />,
        spec: 'radio'
    },
    {
        id: 12,
        title: 'أمراض الجلد',
        image: <Skins />,
        spec: 'dermato'
    },
    {
        id: 13,
        title: 'أمراض السكري',
        image: <Sugars />,
        spec: 'diabet'
    },
    {
        id: 14,
        title: 'جراحة',
        image: <Surgs />,
        spec: 'sergeon'
    },
    {
        id: 15,
        title: 'أمراض الجهاز الهضمي',
        image: <Digests />,
        spec: 'digest'
    },
    {
        id: 16,
        title: 'الأمراض النفسية و العصبية',
        image: <Psycos />,
        spec: 'psyco'
    },
    {
        id: 17,
        title: 'طب الأسنان',
        image: <Teeth />,
        spec: 'dentist'
    }
]

export default function Specialities({ navigation }) {

    const { theme } = useContext(ThemeContext);
    // const [docs, setDocs] = useState([]);
    // const [error, setError] = useState(false)

    // const getDoctors = async () => {
    //     try {
    //         const res = await cache.get('data');
    //         if (res === null) return setError(true)
    //         else return setDocs([...res.value])
    //     } catch (err) {

    //         setError(true)
    //     }
    // }

    // useEffect(() => {
    //     getDoctors()
    // }, [])

    return (
        <ScrollView style={{ backgroundColor: theme.accent, position: 'relative' }}>

            <View style={{ position: 'absolute', top: 0, backgroundColor: theme.headerBg, width: '100%', height: 200, borderBottomRightRadius: 75 }}>

            </View>
            <AppText style={styles.text}> التخصصات </AppText>
            <View style={styles.cardsContainer}>
                {specialities.map((speciality, index) => {
                    return (
                        <AppCard onPress={() => navigation.navigate('doctors', { title: speciality.title, spec: speciality.spec })}
                            right={index % 2 === 0}
                            key={speciality.id}
                            title={speciality.title}
                            btn='التفاصيل'>
                            {speciality.image}
                        </AppCard>
                    )
                })}
            </View>
            <View style={{ position: 'absolute', bottom: 0, backgroundColor: theme.secondary, width: '100%', height: 150, borderTopLeftRadius: 75 }}>

            </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    cardsContainer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 10,
        alignItems: 'center',

    },
    text: {
        fontSize: 26,
        color: colors.primary,
        marginTop: 30,
        marginRight: 22,
        marginBottom: 30,
    },
    waveTop: {
        width: '100%',
        height: 200,
        position: 'absolute',
        top: 0
    }
})
