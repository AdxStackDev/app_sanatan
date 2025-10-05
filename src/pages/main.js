import React, { useRef } from 'react';
import { StatusBar, Image, Text, StyleSheet, ScrollView, Animated, Pressable, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import List from '../arti';
import Astro from '../astro';

/* TOKENS */
const COLOR = {
  textPrimary: '#fff7e6',
  textMuted: '#ffe4b5',
  surface: 'rgba(255,255,255,0.06)',
  outline: 'rgba(255,255,255,0.12)',
  shadow: '#000',
  glass: 'rgba(255,255,255,0.08)',
  glassBorder: 'rgba(255,255,255,0.18)',
  accent: '#ffb300',
  headerGradA: '#3a2200',
  headerGradB: '#2a1900',
  bgGradA: '#180f00',
  bgGradB: '#2a1900',
  bgGradC: '#3a2200',
};
const SPACING = { xs: 6, sm: 10, md: 14, lg: 18, xl: 24, xxl: 32 };
const RADIUS = { sm: 10, md: 14, lg: 18, pill: 28 };
const ELEVATION = {
  z1: { shadowColor: COLOR.shadow, shadowOpacity: 0.14, shadowRadius: 6, shadowOffset: { width: 0, height: 4 }, elevation: 4 },
  z2: { shadowColor: COLOR.shadow, shadowOpacity: 0.22, shadowRadius: 12, shadowOffset: { width: 0, height: 8 }, elevation: 8 },
};
const TYPO = {
  title: { fontSize: 28, fontWeight: '800', letterSpacing: 0.6 },
  label: { fontSize: 20, fontWeight: '800', letterSpacing: 0.3 },
  sub: { fontSize: 12, fontWeight: '600', opacity: 0.95, letterSpacing: 0.3 },
};

/* COMPONENTS */
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function AnimatedCard({ onPress, imageSource, label, sublabel }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const onPressIn = () => Animated.spring(scaleAnim, { toValue: 0.96, useNativeDriver: true }).start();
  const onPressOut = () => Animated.spring(scaleAnim, { toValue: 1, friction: 4, tension: 60, useNativeDriver: true }).start();

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress} android_ripple={{ color: 'rgba(255,255,255,0.08)' }}>
      <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
        <Image source={imageSource} style={styles.cardImage} resizeMode="cover" />
        <View style={styles.cardOverlay} />
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
    <LinearGradient colors={[COLOR.bgGradA, COLOR.bgGradB, COLOR.bgGradC]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.listContainer}>
        <Text accessibilityRole="header" style={styles.title}>सनातन ज्ञान</Text>
        {/* Example quick test cards (replace navigation for testing) */}
        <AnimatedCard
          onPress={() => {}}
          imageSource={{ uri: 'https://i.pinimg.com/1200x/ee/cc/f0/eeccf07882de663d5ff5bd658750bbc1.jpg' }}
          label="आरती संग्रह"
          sublabel="Aarti Collection"
        />
        <AnimatedCard
          onPress={() => {}}
          imageSource={{ uri: 'https://i.pinimg.com/736x/93/e1/4c/93e14c7ea4b7a453eeab0f20e4117009.jpg' }}
          label="ज्योतिष"
          sublabel="Astrology"
        />
      </ScrollView>
    </LinearGradient>
  );
}

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainScreen} />
      {/* <Stack.Screen name="ListStack" component={List} />
      <Stack.Screen name="Astro" component={Astro} /> */}
    </Stack.Navigator>
  );
}
function CustomDrawerContent(props) {
  return (
    <LinearGradient colors={['#1a1002', COLOR.bgGradB, COLOR.bgGradC]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={drawerStyles.scroll}>
        <View style={drawerStyles.header}>
          <View style={drawerStyles.avatarRing}>
            <Image
              source={{ uri: 'https://i.pinimg.com/736x/4a/0c/8d/4a0c8d9b8e2d4f9a9f5d3a2e3c4b5a6d.jpg' }}
              style={drawerStyles.avatar}
            />
          </View>
          <Text style={drawerStyles.title}>सनातन ज्ञान</Text>
          <Text style={drawerStyles.subtitle}>Sanatan Gyan</Text>
        </View>
        <View style={drawerStyles.listWrap}>
          <DrawerItemList {...props} />
        </View>
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
      <StatusBar barStyle="light-content" />
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerBackground: () => (
            <LinearGradient colors={[COLOR.headerGradA, COLOR.headerGradB]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }} />
          ),
          headerTintColor: COLOR.textPrimary,
          headerTitleAlign: 'center',
          drawerActiveTintColor: '#2a1900',
          drawerActiveBackgroundColor: 'rgba(255,179,0,0.85)',
          drawerInactiveTintColor: COLOR.textMuted,
          drawerLabelStyle: { fontWeight: '700' },
          sceneContainerStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Drawer.Screen name="Home" component={MainStack} options={{ title: 'मुखपृष्ठ' }} />
        <Drawer.Screen name="Artis" component={List} options={{ title: 'आरती संग्रह' }} />
        <Drawer.Screen name="Astro" component={Astro} options={{ title: 'ज्योतिष' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  listContainer: { padding: SPACING.xl, gap: SPACING.lg },
  title: {
    ...TYPO.title,
    color: COLOR.textPrimary,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowRadius: 10,
    textShadowOffset: { width: 0, height: 2 },
    marginBottom: SPACING.lg,
  },
  card: {
    height: 160,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    backgroundColor: COLOR.glass,
    borderWidth: 1,
    borderColor: COLOR.glassBorder,
    ...ELEVATION.z2,
  },
  cardImage: { width: '100%', height: '100%' },
  cardOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.28)' },
  cardTextWrap: { position: 'absolute', left: SPACING.lg, right: SPACING.lg, bottom: SPACING.lg },
  cardLabel: { ...TYPO.label, color: '#fffbe6' },
  cardSublabel: { ...TYPO.sub, color: COLOR.textMuted, marginTop: 4 },
});
const drawerStyles = StyleSheet.create({
  scroll: { paddingTop: 0 },
  header: {
    paddingTop: 48,
    paddingBottom: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: COLOR.surface,
  },
  avatarRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255,179,0,0.6)',
    marginBottom: 10,
  },
  avatar: { width: '100%', height: '100%' },
  title: { color: COLOR.textPrimary, fontSize: 18, fontWeight: '800' },
  subtitle: { color: COLOR.textMuted, fontSize: 12, marginTop: 2 },
  listWrap: { paddingTop: 8, paddingBottom: 12 },
  footer: {
    padding: 12,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  footerText: { color: COLOR.textMuted, textAlign: 'center', fontWeight: '700' },
});
