import { Image, View, Text, Button, StyleSheet } from 'react-native';

export default function AstroList({navigation }) {
  return (
    <View style={styles.container}>
      <Button title="जन्म विवरण" onPress={() => navigation.navigate('BirthDetails')} />
      <Button title="दैनिक राशिफल" onPress={() => navigation.navigate('DailyHoro')} />
      <Button title="कुंडली" onPress={() => navigation.navigate('Kundli')} />
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
