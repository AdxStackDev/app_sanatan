import React, { useRef } from 'react';
import { Image, View, Text, StyleSheet, ScrollView, Animated, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import List from '../arti';
import Astro from '../astro';

const Stack = createNativeStackNavigator();

function AnimatedCard({ onPress, imageSource, label }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
  };
  const onPressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true }).start();
  };

  return (
    <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress}>
      <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
        <Image source={imageSource} style={styles.cardImage} />
        <Text style={styles.cardLabel}>{label}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

function MainScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.listContainer}>
      <AnimatedCard
        onPress={() => navigation.navigate('ListStack', { screen: 'Artis' })}
        imageSource={{ uri: 'https://i.pinimg.com/1200x/ee/cc/f0/eeccf07882de663d5ff5bd658750bbc1.jpg' }}
        label="आरती संग्रह"
      />
      <AnimatedCard
        onPress={() => navigation.navigate('Astro')}
        imageSource={{ uri: 'https://i.pinimg.com/736x/93/e1/4c/93e14c7ea4b7a453eeab0f20e4117009.jpg' }}
        label="ज्योतिष"
      />
    </ScrollView>
  );
}

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{ title: 'सनातन ज्ञान', headerTitleAlign: 'center' }} />
        <Stack.Screen 
          name="ListStack" 
          component={List} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Astro" 
          component={Astro} 
          options={{ headerShown: false }}
        />   


      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  cardImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  cardLabel: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
