import { Text, View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const DecorativeBorder = ({ children }) => (
  <View style={styles.borderContainer}>
    <View style={styles.borderInner}>{children}</View>
  </View>
);

export default function Sitamaa() {
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
              <Text style={styles.heading}>श्री सीता माता जी की आरती</Text>
              <Text style={styles.text}>
                    || ॐ श्री सीतायै नम: ||{'\n'}{'\n'}

                        आरती श्री जनक दुलारी की ।{'\n'}
                        सीता जी रघुवर प्यारी की ॥{'\n'}
                        जगत जननी जग की विस्तारिणी,{'\n'}
                        नित्य सत्य साकेत विहारिणी,{'\n'}
                        परम दयामयी दिनोधारिणी,{'\n'}
                        सीता मैया भक्तन हितकारी की ॥{'\n'}

                        आरती श्री जनक दुलारी की ।{'\n'}
                        सीता जी रघुवर प्यारी की ॥{'\n'}

                        सती श्रोमणि पति हित कारिणी,{'\n'}
                        पति सेवा वित्त वन वन चारिणी,{'\n'}
                        पति हित पति वियोग स्वीकारिणी,{'\n'}
                        त्याग धर्म मूर्ति धरी की ॥{'\n'}

                        आरती श्री जनक दुलारी की ।{'\n'}
                        सीता जी रघुवर प्यारी की ॥{'\n'}

                        विमल कीर्ति सब लोकन छाई,{'\n'}
                        नाम लेत पवन मति आई,{'\n'}
                        सुमीरात काटत कष्ट दुख दाई,{'\n'}
                        शरणागत जन भय हरी की ॥{'\n'}

                        आरती श्री जनक दुलारी की ।{'\n'}
                        सीता जी रघुवर प्यारी की ॥{'\n'}
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
    backgroundColor: '#fa0909ff',
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
