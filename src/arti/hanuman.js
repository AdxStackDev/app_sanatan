import { Text, View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const DecorativeBorder = ({ children }) => (
  <View style={styles.borderContainer}>
    <View style={styles.borderInner}>{children}</View>
  </View>
);

export default function Hanuman() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
        uri : 'https://i.pinimg.com/1200x/3e/78/6d/3e786dea0fcfbc87f99ecea0134e7dbc.jpg',
        }}
        style={styles.background}
        // imageStyle={{ opacity: 0.1 }} // Subtle background
      >
        <ScrollView contentContainerStyle={styles.scroll}>

          <DecorativeBorder >
            <View>
              <Text style={styles.heading}>श्री हनुमान जी की आरती</Text>
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
    // backgroundColor: '#fa0909ff',
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
    textShadowColor: '#a1eb0eff', 
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  borderContainer: {
    borderWidth: 5,
    borderColor: '#B22222',
    borderRadius: 20,
    padding: 8,
    // backgroundColor: 'rgba(255, 235, 179, 0.85)',
    marginBottom: 16,
    // elevation: 6,
  },

  box: {
    padding: 20,
    borderRadius: 12,
    // backgroundColor: 'rgba(255, 248, 225, 0.93)',
    // shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.14,
    shadowRadius: 6,
    elevation: 3,
    // opacity: .1,
  },
  
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 32,
    color: '#e3710dff',
    textAlign: 'center',
  },
});
