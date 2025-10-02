import React from 'react';
import { Text, View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DecorativeBorder = ({ children }) => (
  <View style={styles.borderContainer}>
    <View style={styles.borderInner}>{children}</View>
  </View>
);

export default function Ganesh() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://i.pinimg.com/1200x/3e/78/6d/3e786dea0fcfbc87f99ecea0134e7dbc.jpg',
        }}
        style={styles.background}
        // imageStyle={{ opacity: 0.1 }} // Subtle background
      >
        <ScrollView contentContainerStyle={styles.scroll}>

          <DecorativeBorder>
            <View>
          <Text style={styles.heading}>श्री गणेश जी आरती</Text>
              <Text style={styles.text}>
                || ॐ गं गणपतये नमः ||{'\n'}{'\n'}
                जय गणेश जय गणेश, जय गणेश देवा ।{'\n'}
                माता जाकी पार्वती, पिता महादेवा ॥{'\n'}{'\n'}
                
                एक दंत दयावंत, चार भुजा धारी ।{'\n'}
                माथे सिंदूर सोहे, मूसे की सवारी ॥{'\n'}{'\n'}
                
                जय गणेश जय गणेश, जय गणेश देवा ।{'\n'}
                माता जाकी पार्वती, पिता महादेवा ॥{'\n'}{'\n'}
                
                पान चढ़े फल चढ़े, और चढ़े मेवा ।{'\n'}
                लड्डुअन का भोग लगे, संत करें सेवा ॥{'\n'}{'\n'}
                
                जय गणेश जय गणेश, जय गणेश देवा ।{'\n'}
                माता जाकी पार्वती, पिता महादेवा ॥{'\n'}{'\n'}
                
                अंधन को आंख देत, कोढ़िन को काया ।{'\n'}
                बांझन को पुत्र देत, निर्धन को माया ॥{'\n'}{'\n'}
                
                जय गणेश जय गणेश, जय गणेश देवा ।{'\n'}
                माता जाकी पार्वती, पिता महादेवा ॥{'\n'}{'\n'}
                
                ‘सूर’ श्याम शरण आए, सफल कीजे सेवा ।{'\n'}
                माता जाकी पार्वती, पिता महादेवा ॥{'\n'}{'\n'}
                
                जय गणेश जय गणेश, जय गणेश देवा ।{'\n'}
                माता जाकी पार्वती, पिता महादेवा ॥{'\n'}{'\n'}
                
                दीनन की लाज रखो, शंभु सुतकारी ।{'\n'}
                कामना को पूर्ण करो, जाऊं बलिहारी ॥{'\n'}{'\n'}
                
                जय गणेश जय गणेश, जय गणेश देवा ।{'\n'}
                माता जाकी पार्वती, पिता महादेवा ॥{'\n'}
                ====={'\n'}
              </Text>
            </View>
          </DecorativeBorder>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  scroll: {
    // flex: 1,
    padding: 24,
    // alignItems: 'center',
    width: '100%',
    opacity: 1,
  },

  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: '#FFD700', 
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  borderContainer: {
    borderWidth: 5,
    borderColor: '#FFD54F',
    borderRadius: 20,
    padding: 8,
    // backgroundColor: 'rgba(255, 235, 179, 0.85)',
    marginBottom: 16,
    // elevation: 6,
  },

  box: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 248, 225, 0.93)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.14,
    shadowRadius: 6,
    elevation: 3,
    // opacity: .1,
  },
  
  text: {
    fontSize: 22,
    lineHeight: 32,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
});
