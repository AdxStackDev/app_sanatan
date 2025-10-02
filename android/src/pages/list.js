import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export default function Lists(){
    return(
        <SafeAreaProvider>
            <Listdata />
        </SafeAreaProvider>
    )
}

function Listdata(){
    return(
        <View style={styles.container}>
            <Text>list</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});