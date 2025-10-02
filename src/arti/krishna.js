import { Text, View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const DecorativeBorder = ({ children }) => (
  <View style={styles.borderContainer}>
    <View style={styles.borderInner}>{children}</View>
  </View>
);

export default function Krishna() {
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
              <Text style={styles.heading}>श्री कृष्ण जी की आरती</Text>
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
