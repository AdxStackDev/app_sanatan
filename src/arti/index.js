import { Image, View, Text,Button, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Ganesh from './ganesh';
import ShreeRam from './shreeram';
import Hanuman from './hanuman';
import Krishna from './krishna';
import SitaMaa from './sitamaa';
import ArtiList from './artilist';

const Stack = createNativeStackNavigator();

export default function List() {
  return (
  <Stack.Navigator initialRouteName="ArtiList">
    <Stack.Screen name="ArtiList" component={ArtiList} options={{ title: 'आरती सूची', headerTitleAlign: 'center' }} />
    <Stack.Screen name="Ganesh" component={Ganesh} options={{ title: 'श्री गणेश जी की आरती', headerTitleAlign: 'center' }} />
    <Stack.Screen name="ShreeRam" component={ShreeRam} options={{ title: 'श्री राम जी की आरती', headerTitleAlign: 'center' }} />
    <Stack.Screen name="Hanuman" component={Hanuman} options={{ title: 'श्री हनुमान जी की आरती', headerTitleAlign: 'center' }} />
    <Stack.Screen name="Krishna" component={Krishna} options={{ title: 'श्री कृष्ण जी की आरती', headerTitleAlign: 'center' }} />
    <Stack.Screen name="SitaMaa" component={SitaMaa} options={{ title: 'श्री सीता माता जी की आरती', headerTitleAlign: 'center' }} />
  </Stack.Navigator>
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
