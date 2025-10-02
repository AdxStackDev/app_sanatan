import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BirthDetails from './birthDetails';
import DailyHoro from './dailyHoro';
import Kundli from './kundli';
import AstroList from './astrolist';

const Stack = createNativeStackNavigator();

function AstroNavigator() {
  return (
    <Stack.Navigator initialRouteName="AstroList">
      <Stack.Screen
        name="AstroList"
        component={AstroList}
        options={{
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <Image
                source={{ uri: 'https://i.pinimg.com/736x/93/e1/4c/93e14c7ea4b7a453eeab0f20e4117009.jpg' }}
                style={styles.headerImage}
              />
              <Text style={styles.headerTitleText}>ज्योतिष</Text>
            </View>
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="BirthDetails"
        component={BirthDetails}
        options={{ title: 'जन्म विवरण', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="DailyHoro"
        component={DailyHoro}
        options={{ title: 'दैनिक राशिफल', headerTitleAlign: 'center' }}
      />      
      <Stack.Screen
        name="Kundli"
        component={Kundli}
        options={{ title: 'कुंडली', headerTitleAlign: 'center' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerContainer: { flexDirection: 'row', alignItems: 'center' },
  headerImage: { width: 40, height: 40, marginRight: 10 },
  headerTitleText: { fontSize: 20, fontWeight: 'bold' },
});

export default AstroNavigator;
