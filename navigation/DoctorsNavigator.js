import React, { useContext } from 'react';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';

import Specialities from '../components/Specialities';
import Doctor from '../components/Doctor';
import Doctors from '../components/Doctors';
import AppText from '../components/AppText';
import colors from '../config/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ThemeContext from '../themes/ThemeContext';

const Tweet = () => {
    return (
        <AppText>Hello</AppText>
    )
}

const Stack = createStackNavigator();

const DoctorsNavigator = ({ navigation }) => {
    const { theme, onChangeTheme } = useContext(ThemeContext)
    return (
        <Stack.Navigator mode='modal'>
            <Stack.Screen name='specialities' component={Specialities} options={

                ({ route }) => ({
                    title: 'أطباء الجلفة',
                    headerStyle: { backgroundColor: theme.headerBg },
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <MaterialCommunityIcons name='menu' style={{ paddingHorizontal: 10 }} size={30} color={colors.primary} onPress={() => navigation.openDrawer()} />
                    ),
                    headerTintColor: colors.primary,
                    headerTitleStyle: { fontFamily: 'tajawal' }
                })
            } />
            <Stack.Screen name='doctors' component={Doctors} options={({ route }) => ({
                title: route.params.title,
                headerStyle: { backgroundColor: theme.headerBg },
                headerTitleAlign: 'center',
                headerTintColor: colors.primary,
                headerTitleStyle: { fontFamily: 'tajawal' }
            })} />
            <Stack.Screen name='Doctor' component={Doctor} options={
                ({ route }) => ({
                    title: route.params.title,
                    headerStyle: { backgroundColor: theme.headerBg },
                    headerTitleAlign: 'center',
                    headerTintColor: colors.primary,
                    headerTitleStyle: { fontFamily: 'tajawal' }
                })
            } />
        </Stack.Navigator>
    )
}

export default DoctorsNavigator;