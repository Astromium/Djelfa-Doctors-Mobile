import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import AllDoctors from '../components/AllDoctors';
import Doctor from '../components/Doctor';
import colors from '../config/colors';
import ThemeContext from '../themes/ThemeContext'

const Stack = createStackNavigator();

const AllDoctorsNavigator = ({ navigation }) => {

    const { theme, onChangeTheme } = useContext(ThemeContext)

    return (
        <Stack.Navigator>
            <Stack.Screen name='All Doctors' component={AllDoctors} options={
                ({ route }) => ({
                    title: 'جميع الأطباء',
                    headerStyle: { backgroundColor: theme.secondary },
                    headerTitleAlign: 'center',
                    headerLeft: () => <MaterialCommunityIcons name='menu' style={{ paddingHorizontal: 10 }} size={30} color={colors.primary} onPress={() => navigation.openDrawer()} />,
                    headerTintColor: colors.primary,
                    headerTitleStyle: { fontFamily: 'tajawal' }
                })
            } />
            <Stack.Screen name='Doctor' component={Doctor} options={
                ({ route }) => ({
                    title: route.params.title,
                    headerStyle: { backgroundColor: theme.secondary },
                    headerTitleAlign: 'center',
                    headerTintColor: colors.primary,
                    headerTitleStyle: { fontFamily: 'tajawal' }
                })
            } />
        </Stack.Navigator>
    )
}

export default AllDoctorsNavigator;