import React from 'react';
import { Text, View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

const DecorativeBorder = ({ children }) => (
  <View style={styles.borderOuter}>
    <View style={styles.borderGlow} />
    <View style={styles.borderContainer}>
      <View style={styles.borderInner}>{children}</View>
    </View>
  </View>
);

export default function Ganesh() {
  return (
      <LinearGradient
        colors={['#ff9800', '#ffd700', '#b71c1c']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.screen}
      >

      <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
        <ImageBackground
          source={{ uri: 'https://i.pinimg.com/1200x/3e/78/6d/3e786dea0fcfbc87f99ecea0134e7dbc.jpg' }}
          style={styles.bg}
          imageStyle={styles.bgImage}
        >
          <View style={styles.vignette} />
          <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
            {/* <Text accessibilityRole="header" style={styles.heading}>श्री गणेश जी आरती</Text> */}

            <DecorativeBorder>
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
                =====
              </Text>
            </DecorativeBorder>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    </LinearGradient>
  );
}

const COLOR = {
  textPrimary: '#fff7e6',
  // textMuted: '#ffe4b5',
  // saffron: '#ffb300',
  // saffronDeep: '#ff9100',
  // borderGold: '#FFD54F',
};

const styles = StyleSheet.create({
  screen: { flex: 1 },

  safeArea: {
    flex: 1,
  },

  bg: {
    flex: 1,
  },

  bgImage: {
    opacity: 0.35,
  },

  vignette: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },

  scroll: {
    padding: 20,
    paddingBottom: 36,
  },

  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: COLOR.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    letterSpacing: 0.5,
  },

  borderOuter: {
    marginBottom: 20,
  },

  borderGlow: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    bottom: 8,
    borderRadius: 18,
    backgroundColor: 'rgba(255,179,0,0.18)',
  },

  borderContainer: {
    borderWidth: 2,
    borderColor: 'rgba(255,213,79,0.7)',
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.25)',
    overflow: 'hidden',
  },

  borderInner: {
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },

  text: {
    fontSize: 18,
    lineHeight: 30,
    color: COLOR.textPrimary,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
});
