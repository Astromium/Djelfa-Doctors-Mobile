import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';


import TabNavigator from './TabNavigator';
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={TabNavigator} />
        </Drawer.Navigator>
    )
} 