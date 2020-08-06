import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, StatusBar, ActivityIndicator, Modal, FlatList, Text, TouchableOpacity } from 'react-native';

import doctors from '../api/doctors';
import AppActivityIndicator from './ActivityIndicator';
import ListItem from './ListItem';
import AppInput from './AppInput';
import RequestDoctor from './RequestDoctor';
import DoctorSvg from '../Svgs/DoctorSvg';
import FemaleDoctor from '../Svgs/FemaleDoctor';
import NotFound from './NotFound';
import colors from '../config/colors';
import cache from '../utility/cache';



export default function AllDoctors({ navigation }) {

    const [loaderVisible, setLoaderVisible] = useState(true)
    const [searchLoaderVisible, setSearchLoaderVisible] = useState(false)
    const [notFoundVisible, setNotFoundVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [docs, setDocs] = useState([])
    const [backup, setBackup] = useState([])
    const [reachedEnd, setReachedEnd] = useState(false)

    const loadDoctors = async () => {
        try {
            setLoaderVisible(true)
            // look for data in the cache
            const cacheData = await cache.get('data')
            if (cacheData) {
                //console.log('got data from cache')
                setDocs(cacheData.value)
                setBackup(cacheData.value)
                setLoaderVisible(false)
            } else {
                // else call the server
                const res = await doctors.getAllDoctors();
                if (res.status === 'success') {
                    setDocs(res.doctors);
                    setBackup(res.doctors);
                    setLoaderVisible(false)
                    await cache.store('data', res.doctors);
                } else {
                    setDocs([])
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    const renderFooter = () => {

        if (!reachedEnd) {
            return (
                <View style={{ width: '100%', height: 150, alignItems: 'center' }}>
                    <ActivityIndicator color={colors.primary} animating={!reachedEnd} size='large' />
                </View>
            )
        }
        return (
            <View style={{ width: '100%', height: 100 }}></View>
        )

    }

    useEffect(() => {
        loadDoctors()
    }, [])

    const handleSearch = async (text) => {

        if (!text) {
            setNotFoundVisible(false)
            setDocs(backup)
        } else {
            setSearchLoaderVisible(true)
            let temp = docs.filter(doc => doc.name.includes(text));
            if (temp.length === 0) {
                setSearchLoaderVisible(false);
                setNotFoundVisible(true);
                setDocs([])
                return
            } else {
                setNotFoundVisible(false)
                setSearchLoaderVisible(false)
                setDocs(temp)
            }

        }

    }

    if (loaderVisible) {
        return (
            <View style={styles.loaderContainer}>
                <AppActivityIndicator visible={loaderVisible} />
            </View>
        )
    }


    return (
        <View>
            <View style={{ width: '100%' }}>
                <AppInput icon='magnify' iconColor={colors.white} placeholder='أدخل اسم الطبيب' onChangeText={text => handleSearch(text)} />
            </View>
            {searchLoaderVisible && <View style={{ height: '100%', width: '100%' }}><ActivityIndicator animating={searchLoaderVisible} size='large' /></View>}
            {notFoundVisible && <NotFound width='80%' height={250} onPress={() => setModalVisible(true)} />}
            {/* <ScrollView style={styles.listContainer}>
                <View style={styles.list}>
                    {docs.map(doc => {
                        return (
                            <ListItem onPress={() => navigation.navigate('Doctor', {
                                id: doc._id,
                                title: doc.name
                            })} key={doc._id} title={doc.name} subTitle={doc.description}>
                                {doc.gender === 'male' ? <DoctorSvg /> : <FemaleDoctor />}
                            </ListItem>
                        )
                    })}
                </View>
            </ScrollView> */}
            <FlatList
                style={styles.listContainer}
                data={docs}
                keyExtractor={item => item._id}
                ListFooterComponent={renderFooter}
                onEndReached={() => setReachedEnd(true)}
                renderItem={({ item }) => <TouchableOpacity>
                    <ListItem onPress={() => navigation.navigate('Doctor', {
                        id: item._id,
                        title: item.name
                    })}
                        title={item.name} subTitle={item.description}>
                        {item.gender === 'male' ? <DoctorSvg /> : <FemaleDoctor />}
                    </ListItem>
                </TouchableOpacity>} />

            <Modal animated animationType='slide' visible={modalVisible}>
                <RequestDoctor onPress={() => setModalVisible(false)} onAnimationFinish={() => {
                    setModalVisible(false)
                    setNotFoundVisible(false)
                    setDocs(backup);
                }} />
            </Modal>
        </View>
    )

}

const styles = StyleSheet.create({
    loaderContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white
    },
    notFoundContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        width: '100%',
        marginTop: 20,
        padding: 10
    },
    list: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20
    }
})