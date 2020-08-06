import React from 'react';
import { View, Text } from 'react-native';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

export default class Drawer extends React.Component {
    renderDrawer = () => {
        return (
            <View>
                <Text>I am in the drawer!</Text>
            </View>
        );
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <DrawerLayout
                    drawerWidth={200}
                    drawerPosition={DrawerLayout.positions.Right}
                    drawerType="front"
                    drawerBackgroundColor="#ddd"
                    renderNavigationView={this.renderDrawer}>
                    <View>
                        <Text>Hello, it's me</Text>
                    </View>
                </DrawerLayout>
            </View>
        );
    }
}