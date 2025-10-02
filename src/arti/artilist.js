import { Image, View, Text, Button, StyleSheet } from 'react-native';

export default function ArtiList({navigation }) {
  return (
    <View style={styles.container}>
      <Button title="श्री गणेश जी की आरती" onPress={() => navigation.navigate('Ganesh')} />
      <Button title="श्री राम जी की आरती" onPress={() => navigation.navigate('ShreeRam')} />
      <Button title="श्री हनुमान जी की आरती" onPress={() => navigation.navigate('Hanuman')} />
      <Button title="श्री कृष्ण जी की आरती" onPress={() => navigation.navigate('Krishna')} />
      <Button title="श्री सीता माता जी की आरती" onPress={() => navigation.navigate('SitaMaa')} />
    </View>
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
