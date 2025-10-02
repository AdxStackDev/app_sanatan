import { Text, View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const DecorativeBorder = ({ children }) => (
  <View style={styles.borderContainer}>
    <View style={styles.borderInner}>{children}</View>
  </View>
);

export default function ShreeRam() {
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

          <DecorativeBorder>
            <View>
          <Text style={styles.heading}>श्री राम जी की आरती</Text>
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
    // backgroundColor: 'rgba(255, 248, 225, 0.93)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.14,
    shadowRadius: 6,
    // elevation: 3,
    // opacity: .1,
  },
  
  text: {
    fontSize: 22,
    lineHeight: 35,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
  },
});
