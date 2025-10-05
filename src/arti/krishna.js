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

export default function Krishna() {
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
                    || ॐ देवकीनंदनाय विद्महे वसुदेवाय धीमहि तन्नो कृष्णः प्रचोदयात् ||{'\n'}{'\n'}

                    आरती कुंजबिहारी की,{'\n'}
                    श्री गिरिधर कृष्ण मुरारी की ॥{'\n'}
                    आरती कुंजबिहारी की,{'\n'}
                    श्री गिरिधर कृष्ण मुरारी की ॥{'\n'}
                    गले में बैजंती माला,{'\n'}
                    बजावै मुरली मधुर बाला ।{'\n'}
                    श्रवण में कुण्डल झलकाला,{'\n'}
                    नंद के आनंद नंदलाला ।{'\n'}
                    गगन सम अंग कांति काली,{'\n'}
                    राधिका चमक रही आली ।{'\n'}
                    लतन में ठाढ़े बनमाली{'\n'}
                    भ्रमर सी अलक,{'\n'}
                    कस्तूरी तिलक,{'\n'}
                    चंद्र सी झलक,{'\n'}
                    ललित छवि श्यामा प्यारी की,{'\n'}
                    श्री गिरिधर कृष्ण मुरारी की ॥{'\n'}
                    ॥ आरती कुंजबिहारी की…॥{'\n'}
                    कनकमय मोर मुकुट बिलसै,{'\n'}
                    देवता दरसन को तरसैं ।{'\n'}
                    गगन सों सुमन रासि बरसै ।{'\n'}
                    बजे मुरचंग,{'\n'}
                    मधुर मिरदंग,{'\n'}
                    ग्वालिन संग,{'\n'}
                    अतुल रति गोप कुमारी की,{'\n'}
                    श्री गिरिधर कृष्णमुरारी की ॥{'\n'}
                    ॥ आरती कुंजबिहारी की…॥{'\n'}
                    जहां ते प्रकट भई गंगा,{'\n'}
                    सकल मन हारिणि श्री गंगा ।{'\n'}
                    स्मरन ते होत मोह भंगा{'\n'}
                    बसी शिव सीस,{'\n'}
                    जटा के बीच,{'\n'}
                    हरै अघ कीच,{'\n'}
                    चरन छवि श्रीबनवारी की,{'\n'}
                    श्री गिरिधर कृष्णमुरारी की ॥{'\n'}
                    ॥ आरती कुंजबिहारी की…॥{'\n'}
                    चमकती उज्ज्वल तट रेनू,{'\n'}
                    बज रही वृंदावन बेनू ।{'\n'}
                    चहुं दिसि गोपि ग्वाल धेनू{'\n'}
                    हंसत मृदु मंद,{'\n'}
                    चांदनी चंद,{'\n'}
                    कटत भव फंद,{'\n'}
                    टेर सुन दीन दुखारी की,{'\n'}
                    श्री गिरिधर कृष्णमुरारी की ॥{'\n'}
                    ॥ आरती कुंजबिहारी की…॥{'\n'}
                    आरती कुंजबिहारी की,{'\n'}
                    श्री गिरिधर कृष्ण मुरारी की ॥{'\n'}
                    आरती कुंजबिहारी की,{'\n'}
                    श्री गिरिधर कृष्ण मुरारी की ॥{'\n'}
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
