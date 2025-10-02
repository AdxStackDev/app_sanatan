import * as React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './src/pages/main';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Main />
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
