import React, { useRef } from 'react';
import {
  StatusBar,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Pressable,
  View,
  Dimensions
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Arti from '../arti';
import Astro from '../astro';
import Wallpaper from '../wallpapers';

const { width } = Dimensions.get('window');

const COLOR = {
  saffron: '#FF9933',
  maroon: '#5b0a0a',
  gold: '#FFD700',
  cream: '#fff8e7',
  bgGradA: '#2b0800',
  bgGradB: '#5b0a0a',
  bgGradC: '#7a1c00',
  glow: 'rgba(255, 204, 102, 0.25)',
  border: 'rgba(255,255,255,0.15)',
};

const TYPO = {
  title: { fontSize: 30, fontWeight: '800', letterSpacing: 0.8 },
  label: { fontSize: 20, fontWeight: '700', letterSpacing: 0.4 },
  sub: { fontSize: 12, fontWeight: '600', opacity: 0.95, letterSpacing: 0.3 },
};

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function AnimatedCard({ onPress, imageSource, label, sublabel }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => Animated.spring(scaleAnim, {
    toValue: 0.95, useNativeDriver: true
  }).start();
  const onPressOut = () => Animated.spring(scaleAnim, {
    toValue: 1, friction: 4, tension: 60, useNativeDriver: true
  }).start();

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress}>
      <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
        <Image source={imageSource} style={styles.cardImage} resizeMode="cover" />
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.75)']}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.cardTextWrap}>
          <Text style={styles.cardLabel}>{label}</Text>
          {sublabel ? <Text style={styles.cardSublabel}>{sublabel}</Text> : null}
        </View>
      </Animated.View>
    </Pressable>
  );
}

function MainScreen({ navigation }) {
  return (
    <LinearGradient
      colors={[COLOR.bgGradA, COLOR.bgGradB, COLOR.bgGradC]}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      style={styles.screen}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.listContainer}>
        <View style={styles.headerDecor}>
          {/* <Icon name="om" size={48} color={COLOR.gold} style={styles.glowIcon} /> */}
          <Text style={styles.title}>🌺 सनातन ज्ञान 🌺</Text>
        </View>

        <AnimatedCard
          onPress={() => navigation.navigate('Artis')}
          imageSource={{ uri: 'https://i.pinimg.com/736x/cf/cb/4b/cfcb4ba9bf803e34aae76396e7e5ea39.jpg' }}
          label="आरती संग्रह"
          sublabel="Aarti Collection"
        />

        <AnimatedCard
          onPress={() => navigation.navigate('Astro')}
          imageSource={{ uri: 'https://i.pinimg.com/736x/35/ec/3f/35ec3fd20c534795d28654db71a87d7e.jpg' }}
          label="ज्योतिष"
          sublabel="Astrology & Panchang"
        />

        <AnimatedCard
          onPress={() => navigation.navigate('Wallpaper')}
          imageSource={{ uri: 'https://i.pinimg.com/736x/82/95/50/829550fc764bceec23accbcdf6aeebf8.jpg' }}
          label="वॉलपेपर"
          sublabel="Divine Backgrounds"
        />
      </ScrollView>
    </LinearGradient>
  );
}

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainScreen} />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <LinearGradient colors={[COLOR.bgGradA, COLOR.bgGradB]} style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={drawerStyles.header}>
          <Image
            source={{ uri: 'https://i.pinimg.com/1200x/c6/83/9c/c6839c43fe06b8ef6d12ab6ec7be73d1.jpg' }}
            style={drawerStyles.avatar}
          />
          <Text style={drawerStyles.title}>🕉 सनातन ज्ञान 🕉</Text>
          <Text style={drawerStyles.subtitle}>धर्म, ज्योतिष, आरती, साधना</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={drawerStyles.footer}>
        <Text style={drawerStyles.footerText}>ॐ सर्वे भवन्तु सुखिनः</Text>
      </View>
    </LinearGradient>
  );
}

export default function Main() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerBackground: () => (
            <LinearGradient
              colors={[COLOR.maroon, COLOR.saffron]}
              style={{ flex: 1 }}
            />
          ),
          headerTintColor: COLOR.cream,
          headerTitleAlign: 'center',
          drawerActiveTintColor: COLOR.maroon,
          drawerActiveBackgroundColor: COLOR.gold,
          drawerInactiveTintColor: COLOR.cream,
          drawerLabelStyle: { fontWeight: '700', fontSize: 15 },
        }}
      >
        <Drawer.Screen name="Home" component={MainStack} options={{ title: 'मुखपृष्ठ' }} />
        <Drawer.Screen name="Artis" component={Arti} options={{ title: 'आरती संग्रह' }} />
        <Drawer.Screen name="Astro" component={Astro} options={{ title: 'ज्योतिष' }} />
        <Drawer.Screen name="Wallpaper" component={Wallpaper} options={{ title: 'वॉलपेपर' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  listContainer: { padding: 20, gap: 20, alignItems: 'center' },
  headerDecor: { alignItems: 'center', marginBottom: 16 },
  glowIcon: {
    textShadowColor: COLOR.glow,
    textShadowRadius: 10,
    textShadowOffset: { width: 0, height: 0 },
  },
  title: {
    ...TYPO.title,
    color: COLOR.gold,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowRadius: 10,
    marginTop: 6,
  },
  card: {
    width: width * 0.9,
    height: 180,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLOR.border,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  cardImage: { width: '100%', height: '100%' },
  cardTextWrap: { position: 'absolute', left: 20, bottom: 20 },
  cardLabel: {
    ...TYPO.label,
    color: COLOR.cream,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowRadius: 8,
  },
  cardSublabel: {
    ...TYPO.sub,
    color: COLOR.gold,
    marginTop: 4,
  },
});

const drawerStyles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderColor: COLOR.border,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: COLOR.gold,
    marginBottom: 10,
  },
  title: { color: COLOR.gold, fontSize: 18, fontWeight: '800' },
  subtitle: { color: COLOR.cream, fontSize: 12 },
  footer: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: COLOR.border,
    alignItems: 'center',
  },
  footerText: {
    color: COLOR.gold,
    fontWeight: '700',
    fontSize: 14,
  },
});
