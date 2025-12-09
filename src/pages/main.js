import React, { useRef, useEffect } from 'react';
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

const { width, height } = Dimensions.get('window');

const COLOR = {
  saffron: '#FF9933',
  maroon: '#5b0a0a',
  gold: '#FFD700',
  cream: '#fff8e7',
  bgGradA: '#1a0500',
  bgGradB: '#3d0f00',
  bgGradC: '#6b1a00',
  bgGradD: '#8b2500',
  glow: 'rgba(255, 204, 102, 0.35)',
  glowStrong: 'rgba(255, 153, 51, 0.4)',
  border: 'rgba(255,255,255,0.15)',
  accent: '#FF6B35',
  lightGold: '#FFF4A3',
  deepMaroon: '#3d0a0a',
};

const TYPO = {
  title: { fontSize: 32, fontWeight: '900', letterSpacing: 1.2 },
  label: { fontSize: 22, fontWeight: '800', letterSpacing: 0.5 },
  sub: { fontSize: 13, fontWeight: '600', opacity: 0.95, letterSpacing: 0.4 },
  subtitle: { fontSize: 11, fontWeight: '500', opacity: 0.85, letterSpacing: 0.2 },
};

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function AnimatedCard({ onPress, imageSource, label, sublabel, iconName }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  const onPressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.93, useNativeDriver: true
      }),
      Animated.timing(glowAnim, {
        toValue: 1, duration: 300, useNativeDriver: false
      })
    ]).start();
  };

  const onPressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1, friction: 4, tension: 60, useNativeDriver: true
      }),
      Animated.timing(glowAnim, {
        toValue: 0, duration: 300, useNativeDriver: false
      })
    ]).start();
  };

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.6]
  });

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress}>
      <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
        <Image source={imageSource} style={styles.cardImage} resizeMode="cover" />
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
          start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <Animated.View style={[styles.cardGlow, { opacity: glowOpacity }]} />
        <View style={styles.cardTextWrap}>
          {iconName && <Icon name={iconName} size={32} color={COLOR.lightGold} style={styles.cardIcon} />}
          <Text style={styles.cardLabel}>{label}</Text>
          {sublabel ? <Text style={styles.cardSublabel}>{sublabel}</Text> : null}
        </View>
        <View style={styles.cardDecor}>
          <View style={styles.decorLine} />
        </View>
      </Animated.View>
    </Pressable>
  );
}

function MainScreen({ navigation }) {
  return (
    <LinearGradient
      colors={[COLOR.bgGradA, COLOR.bgGradB, COLOR.bgGradC, COLOR.bgGradD]}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      style={styles.screen}
    >
      <StatusBar barStyle="light-content" backgroundColor={COLOR.bgGradA} />
      <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.headerDecor}>
          <View style={styles.headerOrnament}>
            <Text style={styles.headerOrnamentText}>✦</Text>
          </View>
          <Text style={styles.title}>🌺 सनातन ज्ञान 🌺</Text>
          <Text style={styles.headerSubtitle}>Eternal Spiritual Knowledge</Text>
          <View style={styles.headerOrnament}>
            <Text style={styles.headerOrnamentText}>✦</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <AnimatedCard
          onPress={() => navigation.navigate('Artis')}
          imageSource={{ uri: 'https://i.pinimg.com/736x/cf/cb/4b/cfcb4ba9bf803e34aae76396e7e5ea39.jpg' }}
          label="आरती संग्रह"
          sublabel="Sacred Hymns & Prayers"
          iconName="book-open-variant"
        />

        <AnimatedCard
          onPress={() => navigation.navigate('Astro')}
          imageSource={{ uri: 'https://i.pinimg.com/736x/35/ec/3f/35ec3fd20c534795d28654db71a87d7e.jpg' }}
          label="ज्योतिष"
          sublabel="Astrology & Cosmic Wisdom"
          iconName="star"
        />

        <AnimatedCard
          onPress={() => navigation.navigate('Wallpaper')}
          imageSource={{ uri: 'https://i.pinimg.com/736x/82/95/50/829550fc764bceec23accbcdf6aeebf8.jpg' }}
          label="वॉलपेपर"
          sublabel="Divine Sacred Backgrounds"
          iconName="image"
        />

        <View style={styles.footerDecor}>
          <Text style={styles.footerText}>ॐ सर्वे भवन्तु सुखिनः ॐ</Text>
          <Text style={styles.footerSubtext}>May all be happy and peaceful</Text>
        </View>
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
    <LinearGradient colors={[COLOR.bgGradA, COLOR.bgGradB, COLOR.deepMaroon]} style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
        <View style={drawerStyles.header}>
          <View style={drawerStyles.headerOrnament}>
            <Text style={drawerStyles.ornamentText}>✦</Text>
          </View>
          <Image
            source={{ uri: 'https://i.pinimg.com/1200x/c6/83/9c/c6839c43fe06b8ef6d12ab6ec7be73d1.jpg' }}
            style={drawerStyles.avatar}
          />
          <Text style={drawerStyles.title}>🕉 सनातन ज्ञान 🕉</Text>
          <Text style={drawerStyles.subtitle}>Dharma • Astrology • Prayers • Wisdom</Text>
          <View style={drawerStyles.headerDivider} />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <LinearGradient colors={['rgba(0,0,0,0)', COLOR.deepMaroon]} style={drawerStyles.footer}>
        <View style={drawerStyles.footerDivider} />
        <Text style={drawerStyles.footerText}>ॐ सर्वे भवन्तु सुखिनः ॐ</Text>
        <Text style={drawerStyles.footerSubtext}>May all be happy and peaceful</Text>
      </LinearGradient>
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
              colors={[COLOR.deepMaroon, COLOR.maroon, COLOR.saffron]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={{ flex: 1 }}
            />
          ),
          headerTintColor: COLOR.cream,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: '800',
            fontSize: 18,
            letterSpacing: 0.5,
          },
          drawerActiveTintColor: COLOR.cream,
          drawerActiveBackgroundColor: 'rgba(255, 153, 51, 0.3)',
          drawerInactiveTintColor: 'rgba(255, 248, 231, 0.6)',
          drawerLabelStyle: { fontWeight: '700', fontSize: 15, letterSpacing: 0.3 },
          drawerStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Drawer.Screen name="Home" component={MainStack} options={{ title: 'मुखपृष्ठ', headerShown: false }} />
        <Drawer.Screen name="Artis" component={Arti} options={{ title: 'आरती संग्रह' }} />
        <Drawer.Screen name="Astro" component={Astro} options={{ title: 'ज्योतिष' }} />
        <Drawer.Screen name="Wallpaper" component={Wallpaper} options={{ title: 'वॉलपेपर' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  listContainer: { paddingVertical: 24, paddingHorizontal: 16, gap: 24, alignItems: 'center', paddingBottom: 40 },
  headerDecor: { alignItems: 'center', marginBottom: 24, marginTop: 12 },
  headerOrnament: { marginVertical: 8 },
  headerOrnamentText: {
    fontSize: 20,
    color: COLOR.gold,
    textShadowColor: COLOR.glow,
    textShadowRadius: 8,
    textShadowOffset: { width: 0, height: 0 },
  },
  title: {
    ...TYPO.title,
    color: COLOR.lightGold,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowRadius: 12,
    marginVertical: 8,
  },
  headerSubtitle: {
    fontSize: 13,
    color: COLOR.cream,
    fontWeight: '600',
    letterSpacing: 0.5,
    opacity: 0.85,
    marginTop: 4,
  },
  divider: {
    width: width * 0.6,
    height: 1,
    backgroundColor: COLOR.border,
    marginVertical: 16,
  },
  card: {
    width: width * 0.88,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: COLOR.border,
    backgroundColor: 'rgba(255,255,255,0.06)',
    shadowColor: COLOR.glowStrong,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  cardImage: { width: '100%', height: '100%' },
  cardGlow: {
    ...StyleSheet.absoluteFill,
    backgroundColor: COLOR.glowStrong,
  },
  cardTextWrap: { position: 'absolute', left: 24, bottom: 24, zIndex: 2 },
  cardIcon: {
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowRadius: 6,
  },
  cardLabel: {
    ...TYPO.label,
    color: COLOR.lightGold,
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowRadius: 10,
  },
  cardSublabel: {
    ...TYPO.sub,
    color: COLOR.cream,
    marginTop: 6,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowRadius: 6,
  },
  cardDecor: {
    position: 'absolute',
    top: 12,
    right: 16,
    zIndex: 2,
  },
  decorLine: {
    width: 40,
    height: 2,
    backgroundColor: COLOR.gold,
    borderRadius: 1,
    opacity: 0.6,
  },
  footerDecor: {
    alignItems: 'center',
    marginTop: 32,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: COLOR.border,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLOR.gold,
    letterSpacing: 0.6,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowRadius: 8,
  },
  footerSubtext: {
    fontSize: 12,
    color: COLOR.cream,
    marginTop: 6,
    fontWeight: '500',
    opacity: 0.8,
  },
});

const drawerStyles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 28,
    borderBottomWidth: 1,
    borderColor: COLOR.border,
  },
  headerOrnament: {
    marginBottom: 12,
  },
  ornamentText: {
    fontSize: 18,
    color: COLOR.gold,
    textShadowColor: COLOR.glow,
    textShadowRadius: 8,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLOR.gold,
    marginVertical: 12,
    shadowColor: COLOR.glowStrong,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    color: COLOR.lightGold,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowRadius: 8,
  },
  subtitle: {
    color: COLOR.cream,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
    letterSpacing: 0.3,
    opacity: 0.85,
  },
  headerDivider: {
    width: 60,
    height: 1,
    backgroundColor: COLOR.border,
    marginTop: 12,
  },
  footer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  footerDivider: {
    width: 50,
    height: 1,
    backgroundColor: COLOR.border,
    marginBottom: 12,
  },
  footerText: {
    color: COLOR.gold,
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 0.4,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowRadius: 6,
  },
  footerSubtext: {
    color: COLOR.cream,
    fontSize: 11,
    marginTop: 6,
    fontWeight: '500',
    opacity: 0.8,
  },
});
