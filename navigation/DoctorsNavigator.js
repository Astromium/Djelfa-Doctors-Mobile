import React, { useContext } from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import Specialities from '../components/Specialities';
import Doctor from '../components/Doctor';
import Doctors from '../components/Doctors';
import colors from '../config/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ThemeContext from '../themes/ThemeContext';

const Stack = createSharedElementStackNavigator();

const DoctorsNavigator = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='specialities'
        component={Specialities}
        options={({ route }) => ({
          title: 'أطباء الجلفة',
          headerStyle: { backgroundColor: theme.headerBg },
          headerTitleAlign: 'center',
          headerLeft: () => (
            <MaterialCommunityIcons
              name='menu'
              style={{ paddingHorizontal: 10 }}
              size={30}
              color={colors.primary}
              onPress={() => navigation.openDrawer()}
            />
          ),
          headerTintColor: colors.primary,
          headerTitleStyle: { fontFamily: 'tajawal' },
        })}
      />
      <Stack.Screen
        name='doctors'
        component={Doctors}
        options={({ route }) => ({
          title: route.params.title,
          headerStyle: { backgroundColor: theme.headerBg },
          headerTitleAlign: 'center',
          headerTintColor: colors.primary,
          headerTitleStyle: { fontFamily: 'tajawal' },
        })}
      />
      <Stack.Screen
        name='Doctor'
        component={Doctor}
        options={({ route }) => ({
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
          gestureEnabled: false,
          transitionSpec: {
            open: { animation: 'timing', config: { delay: 300 } },
            close: { animation: 'timing', config: { delay: 300 } },
          },
          title: route.params.data.name,
          headerStyle: { backgroundColor: theme.headerBg },
          headerTitleAlign: 'center',
          headerTintColor: colors.primary,
          headerTitleStyle: { fontFamily: 'tajawal' },
        })}
        sharedElementsConfig={(route) => {
          const { data } = route.params;
          return [
            {
              id: `item.${data._id}.photo`,
              animation: 'move',
              resize: 'clip',
              align: 'center-top',
            },
            {
              id: `item.${data._id}.title`,
              animation: 'fade',
              resize: 'clip',
              align: 'center-top',
            },
            {
              id: `item.${data._id}.desc`,
              animation: 'fade',
              resize: 'clip',
              align: 'center-top',
            },
          ];
        }}
      />
    </Stack.Navigator>
  );
};

export default DoctorsNavigator;
