import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';

import AppText from '../components/AppText';
import colors from '../config/colors';

class ListItem extends React.PureComponent {
    render() {
        return (
            <TouchableNativeFeedback onPress={this.props.onPress}>
                <View style={styles.container}>
                    <View style={styles.detailsContainer}>
                        <AppText style={styles.itemTitle}>{this.props.title}</AppText>
                        <AppText style={styles.itemSubtitle}>{this.props.subTitle}</AppText>
                    </View>
                    <View style={styles.imageContainer}>
                        {this.props.children}
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }

}

export default ListItem

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 10,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: colors.secondary,
        elevation: 2,
        flexDirection: 'row'
    },
    imageContainer: {
        height: 100,
        width: '30%',
        borderRadius: 50,
        backgroundColor: colors.accent,
        padding: 10,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    detailsContainer: {
        marginRight: 2,
        height: 100,
        width: '60%',
        justifyContent: 'center'
    },
    itemTitle: {
        fontSize: 18,
        marginBottom: 10
    },
    itemSubtitle: {
        fontSize: 16,
        color: colors.primary
    }
})