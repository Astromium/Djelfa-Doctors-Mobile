import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DoctorsNavigator from './DoctorsNavigator';
import AllDoctorsNavigator from './AllDoctorsNavigator';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../config/colors';
import ThemeContext from '../themes/ThemeContext';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {

    const { theme, onChangeTheme } = useContext(ThemeContext);

    return (
        <Tab.Navigator tabBarOptions={{
            activeBackgroundColor: colors.white,
            activeTintColor: colors.primary,
            inactiveBackgroundColor: theme.inactiveBackgroundColor,
            inactiveTintColor: theme.inactiveBackgroundColor,
            style: { borderTopWidth: 0 },
            tabStyle: { backgroundColor: theme.headerBg },
            labelStyle: {
                fontFamily: 'tajawal',
            }
        }}>
            <Tab.Screen name='التخصصات' component={DoctorsNavigator} options={{
                tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name='apps' size={size} color={color} />,


            }} />

            <Tab.Screen name='الأطباء' component={AllDoctorsNavigator} options={{
                tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name='doctor' size={size} color={color} />,

            }} />
        </Tab.Navigator>

    )
}

export default TabNavigator;