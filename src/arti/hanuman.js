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

export default function Hanuman() {
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
                    || ऊँ हं हनुमते नमः ||{'\n'}{'\n'}

                    आरती कीजै हनुमान लला की।{'\n'} दुष्ट दलन रघुनाथ कला की।।{'\n'}
                    जाके बल से गिरिवर कांपे।{'\n'} रोग दोष जाके निकट न झांके।।{'\n'}
                    अंजनि पुत्र महाबलदायी।{'\n'} संतन के प्रभु सदा सहाई।{'\n'}
                    दे बीरा रघुनाथ पठाए।{'\n'} लंका जारी सिया सुध लाए।{'\n'}
                    लंका सो कोट समुद्र सी खाई।{'\n'} जात पवनसुत बार न लाई।{'\n'}
                    लंका जारी असुर संहारे।{'\n'} सियारामजी के काज संवारे।{'\n'}
                    लक्ष्मण मूर्छित पड़े सकारे।{'\n'} आणि संजीवन प्राण उबारे।{'\n'}
                    पैठी पताल तोरि जमकारे।{'\n'} अहिरावण की भुजा उखाड़े।{'\n'}
                    बाएं भुजा असुर दल मारे।{'\n'} दाहिने भुजा संतजन तारे।{'\n'}
                    सुर-नर-मुनि जन आरती उतारे।{'\n'} जै जै जै हनुमान उचारे।{'\n'}
                    कंचन थार कपूर लौ छाई।{'\n'} आरती करत अंजना माई।{'\n'}
                    लंकविध्वंस कीन्ह रघुराई।{'\n'} तुलसीदास प्रभु कीरति गाई।{'\n'}
                    जो हनुमानजी की आरती गावै।{'\n'} बसी बैकुंठ परमपद पावै।{'\n'}
                    आरती कीजै हनुमान लला की।{'\n'} दुष्ट दलन रघुनाथ कला की।{'\n'}
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
