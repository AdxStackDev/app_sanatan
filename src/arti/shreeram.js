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

export default function ShreeRam() {
  return (
    <LinearGradient
      colors={['#ff9800', '#ffd700', '#b71c1c']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.screen}
    >
      <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
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
                || ॐ श्री रामाय नमः ||{'\n'}{'\n'}
                श्री राम चंद्र कृपालु भजमन{'\n'} हरण भाव भय दारुणम्।{'\n'}
                नवकंज लोचन कंज मुखकर,{'\n'} कंज पद कन्जारुणम्।।{'\n'}

                कंदर्प अगणित अमित छवी{'\n'} नव नील नीरज सुन्दरम्।{'\n'}
                पट्पीत मानहु तडित रूचि{'\n'} शुचि नौमी जनक सुतावरम्।।{'\n'}

                भजु दीन बंधु दिनेश{'\n'} दानव दैत्य वंश निकंदनम्।{'\n'}
                रघुनंद आनंद कंद कौशल{'\n'} चंद दशरथ नन्दनम्।।{'\n'}

                सिर मुकुट कुण्डल तिलक{'\n'} चारु उदारू अंग विभूषणं।{'\n'}
                आजानु भुज शर चाप धर{'\n'} संग्राम जित खर-धूषणं।।{'\n'}

                इति वदति तुलसीदास शंकर{'\n'} शेष मुनि मन रंजनम्।{'\n'}
                मम ह्रदय कुंज निवास कुरु{'\n'} कामादी खल दल गंजनम्।।{'\n'}

                मनु जाहिं राचेऊ मिलिहि{'\n'} सो बरु सहज सुंदर सावरों।{'\n'}
                करुना निधान सुजान सिलू{'\n'} सनेहू जानत रावरो।।{'\n'}

                एही भांती गौरी असीस सुनी{'\n'} सिय सहित हिय हरषी अली।{'\n'}
                तुलसी भवानी पूजि पूनी पूनी{'\n'} मुदित मन मंदिर चली।।{'\n'}

                जानी गौरी योग्य सिय हय{'\n'} हरशु न जाइ कहि।{'\n'}
                मंजुल मंगल मूल वाम{'\n'} अंग फरकन लगे।।{'\n'}
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
    opacity: 0.35, // subtle image behind content
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
    filter: 'blur(8px)', // ignored on native, kept for web parity
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
