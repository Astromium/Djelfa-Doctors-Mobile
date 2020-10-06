import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';

import { BarChart } from 'react-native-chart-kit';
import Swiper from 'react-native-swiper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import doctors from '../api/doctors';
import AppActivityIndicator from './AppActivityIndicator';
import ListItem from './ListItem';
import AppInput from './AppInput';
import AppText from './AppText';
import RequestDoctor from './RequestDoctor';
import DoctorSvg from '../Svgs/DoctorSvg';
import FemaleDoctor from '../Svgs/FemaleDoctor';
import NotFound from './NotFound';
import colors from '../config/colors';
import cache from '../utility/cache';
import ThemeContext from '../themes/ThemeContext';

export default function AllDoctors({ navigation }) {
  const { theme } = useContext(ThemeContext);

  const [loaderVisible, setLoaderVisible] = useState(true);
  const [filterVisible, setFilterVisible] = useState(false);
  const [notFoundVisible, setNotFoundVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [docs, setDocs] = useState([]);
  const [backup, setBackup] = useState([]);

  const opacityAnimation = useRef(new Animated.Value(0)).current;
  const cardsAnimation = () => {
    Animated.timing(opacityAnimation, {
      toValue: 1,
      delay: 500,
      useNativeDriver: true,
      duration: 500,
    }).start();
  };

  const transition = opacityAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  const loadDoctors = async () => {
    try {
      setLoaderVisible(true);
      // look for data in the cache
      const cacheData = await cache.get('data');
      if (cacheData) {
        //console.log('got data from cache')
        setBackup([]);
        setDocs(cacheData.value);
        setLoaderVisible(false);
        cardsAnimation();
      } else {
        // else call the server
        const res = await doctors.getAllDoctors();
        if (res.status === 'success') {
          setDocs(res.doctors);
          setLoaderVisible(false);
          await cache.store('data', res.doctors);
        } else {
          setDocs([]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadDoctors();
    //cardsAnimation();
  }, []);

  const handleSearch = async (text) => {
    setFilterVisible(true);
    if (!text) {
      setFilterVisible(false);
      setNotFoundVisible(false);
      setBackup([]);
    } else {
      setFilterVisible(false);
      setNotFoundVisible(false);
      let temp = docs.filter((doc) => doc.name.includes(text));

      if (temp.length === 0) {
        setFilterVisible(false);
        setNotFoundVisible(true);
        setBackup([]);
        return;
      } else {
        setNotFoundVisible(false);
        setFilterVisible(false);
        setBackup([...temp]);
      }
    }
  };

  if (loaderVisible) {
    return (
      <View
        style={[styles.loaderContainer, { backgroundColor: theme.headerBg }]}
      >
        <AppActivityIndicator visible={loaderVisible} />
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: theme.accent, flex: 1 }}>
      <View style={{ width: '100%' }}>
        <AppInput
          icon='magnify'
          iconColor={colors.white}
          placeholder='أدخل اسم الطبيب'
          onChangeText={(text) => handleSearch(text)}
        />
      </View>
      {filterVisible && (
        <View
          style={{
            height: 50,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AppText>Loading</AppText>
        </View>
      )}
      {notFoundVisible && (
        <NotFound
          width='80%'
          height={250}
          onPress={() => setModalVisible(true)}
        />
      )}
      {backup.length > 0 && (
        <ScrollView style={styles.listContainer}>
          <View style={styles.list}>
            {backup.map((doc) => {
              return (
                <ListItem
                  onPress={() =>
                    navigation.navigate('Doctor', {
                      data: doc,
                    })
                  }
                  id={doc._id}
                  key={doc._id}
                  title={doc.name}
                  subTitle={doc.description}
                >
                  {doc.gender === 'male' ? <DoctorSvg /> : <FemaleDoctor />}
                </ListItem>
              );
            })}
          </View>
        </ScrollView>
      )}
      <Animated.View
        style={[
          styles.recent,
          {
            opacity: opacityAnimation,
            transform: [
              {
                translateX: transition,
              },
            ],
          },
        ]}
      >
        <View
          style={{
            alignSelf: 'flex-end',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <MaterialCommunityIcons name='apps' size={26} color={theme.primary} />
          <AppText style={styles.recentTitle}>أحدث الإضافات</AppText>
        </View>
        <ListItem
          onPress={() => {
            navigation.navigate('Doctor', {
              data: docs[docs.length - 1],
            });
          }}
          id={docs[docs.length - 1]._id}
          key={docs[docs.length - 1]._id}
          title={docs[docs.length - 1].name}
          subTitle={docs[docs.length - 1].description}
        >
          {docs[docs.length - 1].gender === 'male' ? (
            <DoctorSvg />
          ) : (
            <FemaleDoctor />
          )}
        </ListItem>
        <ListItem
          onPress={() => {
            navigation.navigate('Doctor', {
              data: docs[docs.length - 2],
            });
          }}
          id={docs[docs.length - 2]._id}
          key={docs[docs.length - 2]._id}
          title={docs[docs.length - 2].name}
          subTitle={docs[docs.length - 2].description}
        >
          {docs[docs.length - 2].gender === 'male' ? (
            <DoctorSvg />
          ) : (
            <FemaleDoctor />
          )}
        </ListItem>
        <ListItem
          onPress={() => {
            navigation.navigate('Doctor', {
              data: docs[docs.length - 3],
            });
          }}
          id={docs[docs.length - 3]._id}
          key={docs[docs.length - 3]._id}
          title={docs[docs.length - 3].name}
          subTitle={docs[docs.length - 3].description}
        >
          {docs[docs.length - 3].gender === 'male' ? (
            <DoctorSvg />
          ) : (
            <FemaleDoctor />
          )}
        </ListItem>
      </Animated.View>
      {/* <FlatList
                style={styles.listContainer}
                data={docs}
                keyExtractor={item => item._id}
                ListFooterComponent={renderFooter}
                onEndReached={() => setReachedEnd(true)}
                renderItem={({ item }) =>
                    <ListItem onPress={() => navigation.navigate('Doctor', {
                        id: item._id,
                        title: item.name
                    })}
                        title={item.name} subTitle={item.description}>
                        {item.gender === 'male' ? <DoctorSvg /> : <FemaleDoctor />}
                    </ListItem>
                } /> */}

      <View
        style={{
          width: '100%',
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* <ScrollView horizontal showsHorizontalScrollIndicator> */}
        <Swiper
          activeDotColor={colors.primary}
          bounces
          autoplayTimeout={4}
          height={300}
          showsHorizontalScrollIndicator={false}
        >
          <BarChart
            data={{
              labels: [
                'general',
                'neuro',
                'pediatre',
                'ophta',
                'gyneco',
                'cardio',
              ],
              datasets: [
                {
                  data: [
                    docs.filter((doc) => doc.speciality === 'general').length,
                    docs.filter((doc) => doc.speciality === 'neuro').length,
                    docs.filter((doc) => doc.speciality === 'pediatre').length,
                    docs.filter((doc) => doc.speciality === 'ophta').length,
                    docs.filter((doc) => doc.speciality === 'gyneco').length,
                    docs.filter((doc) => doc.speciality === 'cardio').length,
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width} // from react-native
            height={250}
            yAxisInterval={1} // optional, defaults to 1
            showValuesOnTopOfBars
            chartConfig={{
              backgroundColor: theme.accent,
              backgroundGradientFrom: theme.accent,
              backgroundGradientTo: theme.secondary,
              //decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(28, 205, 187, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(28, 205, 187, ${opacity})`,
              style: {},
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            fromZero
            style={{
              marginVertical: 8,
              marginRight: 10,
            }}
          />

          <BarChart
            data={{
              labels: ['intern', 'nephro', 'rhumato', 'pneumo', 'orl'],
              datasets: [
                {
                  data: [
                    docs.filter((doc) => doc.speciality === 'intern').length,
                    docs.filter((doc) => doc.speciality === 'nephro').length,
                    docs.filter((doc) => doc.speciality === 'rhumato').length,
                    docs.filter((doc) => doc.speciality === 'pneumo').length,
                    docs.filter((doc) => doc.speciality === 'orl').length,
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width} // from react-native
            height={250}
            yAxisInterval={1} // optional, defaults to 1
            showValuesOnTopOfBars
            chartConfig={{
              backgroundColor: theme.accent,
              backgroundGradientFrom: theme.accent,
              backgroundGradientTo: theme.secondary,
              //decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(28, 205, 187, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(28, 205, 187, ${opacity})`,
              style: {},
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            fromZero
            style={{
              marginVertical: 8,
              marginRight: 10,
            }}
          />

          <BarChart
            data={{
              labels: ['radio', 'dermato', 'diabet', 'chirugie', 'digest'],
              datasets: [
                {
                  data: [
                    docs.filter((doc) => doc.speciality === 'radio').length,
                    docs.filter((doc) => doc.speciality === 'dermato').length,
                    docs.filter((doc) => doc.speciality === 'diabet').length,
                    docs.filter((doc) => doc.speciality === 'sergeon').length,
                    docs.filter((doc) => doc.speciality === 'digest').length,
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width} // from react-native
            height={250}
            yAxisInterval={1} // optional, defaults to 1
            showValuesOnTopOfBars
            chartConfig={{
              backgroundColor: theme.accent,
              backgroundGradientFrom: theme.accent,
              backgroundGradientTo: theme.secondary,
              //decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(28, 205, 187, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(28, 205, 187, ${opacity})`,
              style: {},
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            fromZero
            style={{
              marginVertical: 8,
              marginRight: 10,
            }}
          />

          <BarChart
            data={{
              labels: ['psyco', 'dentist'],
              datasets: [
                {
                  data: [
                    docs.filter((doc) => doc.speciality === 'psyco').length,
                    docs.filter((doc) => doc.speciality === 'dentist').length,
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width} // from react-native
            height={250}
            yAxisInterval={1} // optional, defaults to 1
            showValuesOnTopOfBars
            chartConfig={{
              backgroundColor: theme.accent,
              backgroundGradientFrom: theme.accent,
              backgroundGradientTo: theme.secondary,
              //decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(28, 205, 187, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(28, 205, 187, ${opacity})`,
              style: {},
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            fromZero
            style={{
              marginVertical: 8,
            }}
          />
          {/* </ScrollView> */}
        </Swiper>
      </View>

      <Modal animated animationType='slide' visible={modalVisible}>
        <RequestDoctor
          onPress={() => setModalVisible(false)}
          onAnimationFinish={() => {
            setModalVisible(false);
            setNotFoundVisible(false);
            setDocs(backup);
          }}
        />
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    padding: 10,
  },
  list: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  recent: {
    width: '100%',
    marginTop: 20,
    padding: 10,
  },
  recentTitle: {
    fontSize: 22,
    marginLeft: 5,
  },
});
