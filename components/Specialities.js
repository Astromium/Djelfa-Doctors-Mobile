import React from 'react'
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'

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


const specialities = [
    {
        id: 0,
        title: 'الطب العام',
        subTitle: '12 طبيب',
        image: <Generals />,
        spec: 'general'
    },
    {
        id: 1,
        title: 'أمراض الأعصاب',
        subTitle: '12 طبيب',
        image: <SvgTest />,
        spec: 'neuro'
    },
    {
        id: 2,
        title: 'أمراض الأطفال',
        subTitle: '12 طبيب',
        image: <Babies />,
        spec: 'pediatre'
    },
    {
        id: 3,
        title: 'أمراض العين',
        subTitle: '12 طبيب',
        image: <Eyes />,
        spec: 'ophta'
    },
    {
        id: 4,
        title: 'أمراض النساء',
        subTitle: '12 طبيب',
        image: <Genecos />,
        spec: 'gyneco'
    },
    {
        id: 5,
        title: 'أمراض القلب',
        subTitle: '12 طبيب',
        image: <Hearts />,
        spec: 'cardio'
    },
    {
        id: 6,
        title: 'أمراض داخلية',
        subTitle: '12 طبيب',
        image: <Interiors />,
        spec: 'intern'
    },
    {
        id: 7,
        title: 'أمراض الكلى و المسالك البولية',
        subTitle: '12 طبيب',
        image: <Kidnies />,
        spec: 'nephro'
    },
    {
        id: 8,
        title: 'أمراض العظام و المفاصل',
        subTitle: '12 طبيب',
        image: <Legs />,
        spec: 'rhumato'
    },
    {
        id: 9,
        title: 'أمراض الجهاز التنفسي',
        subTitle: '12 طبيب',
        image: <Lungs />,
        spec: 'pneumo'
    },
    {
        id: 10,
        title: 'أمراض الأنف و الحنجرة',
        subTitle: '12 طبيب',
        image: <Orls />,
        spec: 'orl'
    },
    {
        id: 11,
        title: 'التصوير بالأشعة',
        subTitle: '12 طبيب',
        image: <Radios />,
        spec: 'radio'
    },
    {
        id: 12,
        title: 'أمراض الجلد',
        subTitle: '12 طبيب',
        image: <Skins />,
        spec: 'dermato'
    },
    {
        id: 13,
        title: 'أمراض السكري',
        subTitle: '12 طبيب',
        image: <Sugars />,
        spec: 'general'
    },
    {
        id: 14,
        title: 'جراحة',
        subTitle: '12 طبيب',
        image: <Surgs />,
        spec: 'sergeon'
    },
    {
        id: 15,
        title: 'طب الأسنان',
        subTitle: '12 طبيب',
        image: <Teeth />,
        spec: 'general'
    }
]

export default function Specialities({ navigation }) {

    return (
        <ScrollView>
            <DrawerLayout
                drawerWidth={200}
                drawerType="front"
                drawerBackgroundColor="#ddd"
                renderNavigationView={() => <View><Text>Hello from drawer</Text></View>}>
                <View>
                    <Text>Hello, it's me</Text>
                </View>
            </DrawerLayout>
            <Image source={require('../assets/images/wave-top-green.png')} style={{ position: 'absolute', top: 0, left: 0 }} />
            <AppText style={styles.text}> التخصصات </AppText>
            <View style={styles.cardsContainer}>
                {specialities.map(speciality => {
                    return (
                        <AppCard onPress={() => navigation.navigate('doctors', { title: speciality.title, spec: speciality.spec })} key={speciality.id} title={speciality.title} subtitle={speciality.subTitle}>{speciality.image}</AppCard>
                    )
                })}
            </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    cardsContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    text: {
        fontSize: 26,
        color: colors.primary,
        marginTop: 30,
        marginRight: 22,
        marginBottom: 30
    },
    waveTop: {
        width: '100%',
        height: 200,
        position: 'absolute',
        top: 0
    }
})
