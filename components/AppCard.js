import React, { useContext } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';

import colors from '../config/colors';
import AppText from './AppText';
import ThemeContext from '../themes/ThemeContext';
import { SharedElement } from 'react-navigation-shared-element';

export default function AppCard({
  onPress,
  title,
  subtitle,
  children,
  btn,
  right,
  center,
  id,
}) {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.secondary,
            alignSelf: center ? 'center' : right ? 'flex-start' : 'flex-end',
          },
        ]}
      >
        <View
          style={[styles.imageContainer, { backgroundColor: theme.accent }]}
        >
          {children}
        </View>
        <SharedElement id={`item.${id}.title`}>
          <AppText style={styles.title}>{title}</AppText>
        </SharedElement>
        {subtitle && (
          <SharedElement id={`item.${id}.desc`}>
            <AppText style={styles.subTitle}>{subtitle}</AppText>
          </SharedElement>
        )}
        {btn && <AppText style={styles.btn}>{btn}</AppText>}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '75%',
    marginVertical: 50,
    position: 'relative',
    alignItems: 'center',
    elevation: 2,
    borderRadius: 15,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    marginTop: -50,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    width: '90%',
    lineHeight: 30,
    textAlign: 'center',
  },
  subTitle: {
    color: colors.primary,
    marginBottom: 12,
    fontSize: 18,
  },
  btn: {
    paddingHorizontal: 15,
    paddingVertical: 4,
    marginBottom: 12,
    fontSize: 15,
    borderRadius: 15,
    color: colors.white,
    backgroundColor: colors.primary,
    elevation: 5,
  },
});
