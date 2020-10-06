import React, { useContext, memo } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import AppText from '../components/AppText';
import colors from '../config/colors';
import ThemeContext from '../themes/ThemeContext';
import { SharedElement } from 'react-navigation-shared-element';

function ListItem({ onPress, title, subTitle, children, id }) {
  const { theme } = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={onPress} style={{ width: '100%' }}>
      <View style={[styles.container, { backgroundColor: theme.secondary }]}>
        <View style={styles.detailsContainer}>
          <SharedElement id={`item.${id}.title`}>
            <AppText style={styles.itemTitle}>{title}</AppText>
          </SharedElement>
          <SharedElement id={`item.${id}.desc`}>
            <AppText style={styles.itemSubtitle}>{subTitle}</AppText>
          </SharedElement>
        </View>
        <View
          style={[
            styles.imageContainer,
            {
              backgroundColor:
                theme.type === 'green' ? theme.headerBg : theme.accent,
            },
          ]}
        >
          {children}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default memo(ListItem);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
    borderRadius: 10,
    elevation: 2,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  imageContainer: {
    height: 100,
    paddingVertical: 10,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderTopLeftRadius: 75,
    borderBottomLeftRadius: 75,
  },
  detailsContainer: {
    marginRight: 10,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  itemTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  itemSubtitle: {
    fontSize: 16,
    color: colors.primary,
    width: '95%',
  },
});
