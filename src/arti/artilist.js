import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Animated, Image, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const COLOR = {
  bgGradA: '#1a0500',
  bgGradB: '#3d0f00',
  bgGradC: '#6b1a00',
  bgGradD: '#8b2500',
  textPrimary: '#fff7e6',
  textMuted: '#ffe4b5',
  gold: '#FFD700',
  lightGold: '#FFF4A3',
  glass: 'rgba(255,255,255,0.08)',
  glassBorder: 'rgba(255,255,255,0.15)',
  shadow: '#000',
  accent: '#FF6B35',
  glow: 'rgba(255, 204, 102, 0.35)',
};

export default function ArtiList({ navigation }) {
  return (
    <LinearGradient
      colors={[COLOR.bgGradA, COLOR.bgGradB, COLOR.bgGradC, COLOR.bgGradD]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.screen}
    >
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <Text style={styles.headerOrnament}>✦</Text>
          <Text style={styles.title}>आरती संग्रह</Text>
          <Text style={styles.subtitle}>Sacred Hymns & Prayers</Text>
          <Text style={styles.headerOrnament}>✦</Text>
        </View>

        <ArtiItem
          label="श्री गणेश जी की आरती"
          sublabel="Shri Ganesh Aarti"
          iconName="flower"
          image={{ uri: 'https://i.pinimg.com/1200x/a4/ae/21/a4ae211f0e2528381243bb2ee7aa17d7.jpg' }}
          onPress={() => navigation.navigate('Ganesh')}
        />

        <ArtiItem
          label="श्री राम जी की आरती"
          sublabel="Shri Ram Aarti"
          iconName="bow-arrow"
          image={{ uri: 'https://i.pinimg.com/1200x/4c/30/27/4c3027cc66c77761b39a0ac8d0ee31cb.jpg' }}
          onPress={() => navigation.navigate('ShreeRam')}
        />

        <ArtiItem
          label="श्री हनुमान जी की आरती"
          sublabel="Shri Hanuman Aarti"
          iconName="fire"
          image={{ uri: 'https://i.pinimg.com/1200x/82/b2/67/82b267a710868118be345c8c87cb7c28.jpg' }}
          onPress={() => navigation.navigate('Hanuman')}
        />

        <ArtiItem
          label="श्री कृष्ण जी की आरती"
          sublabel="Shri Krishna Aarti"
          iconName="music"
          image={{ uri: 'https://i.pinimg.com/736x/4b/2c/15/4b2c15a06568d3db0adeb1b05a58438e.jpg' }}
          onPress={() => navigation.navigate('Krishna')}
        />

        <ArtiItem
          label="श्री सीता माता जी की आरती"
          sublabel="Shri Sita Mata Aarti"
          iconName="crown"
          image={{ uri: 'https://i.pinimg.com/1200x/e7/1f/2e/e71f2e5eced8d4893fe984ce33d6e87d.jpg' }}
          onPress={() => navigation.navigate('SitaMaa')}
        />

        <View style={styles.footerDecor}>
          <Text style={styles.footerText}>ॐ सर्वे भवन्तु सुखिनः ॐ</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

function ArtiItem({ onPress, label, sublabel, image, iconName }) {
  const scale = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  const pressIn = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }),
      Animated.timing(glowAnim, { toValue: 1, duration: 300, useNativeDriver: false })
    ]).start();
  };

  const pressOut = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, friction: 5, tension: 70, useNativeDriver: true }),
      Animated.timing(glowAnim, { toValue: 0, duration: 300, useNativeDriver: false })
    ]).start();
  };

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5]
  });

  return (
    <Pressable onPressIn={pressIn} onPressOut={pressOut} onPress={onPress}>
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <Image source={image} style={styles.cardImage} resizeMode="cover" />
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
          start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <Animated.View style={[styles.cardGlow, { opacity: glowOpacity }]} />
        <View style={styles.row}>
          <View style={styles.iconWrap}>
            <Icon name={iconName} size={28} color={COLOR.lightGold} />
          </View>
          <View style={styles.textCol}>
            <Text style={styles.cardLabel}>{label}</Text>
            <Text style={styles.cardSublabel}>{sublabel}</Text>
          </View>
          <View style={styles.chevron}>
            <Icon name="chevron-right" size={24} color={COLOR.gold} />
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const SPACING = { xs: 6, sm: 10, md: 14, lg: 18, xl: 24, xxl: 32 };
const RADIUS = { sm: 10, md: 14, lg: 18, pill: 28 };

const ELEVATION = {
  z2: {
    shadowColor: COLOR.shadow,
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
};

const TYPO = {
  title: { fontSize: 32, fontWeight: '900', letterSpacing: 0.8 },
  label: { fontSize: 18, fontWeight: '800', letterSpacing: 0.3 },
  sub: { fontSize: 12, fontWeight: '600', opacity: 0.95, letterSpacing: 0.3 },
};

const styles = StyleSheet.create({
  screen: { flex: 1 },

  container: {
    padding: SPACING.xl,
    gap: SPACING.lg,
    paddingBottom: 40,
  },

  headerSection: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    marginTop: SPACING.lg,
  },

  headerOrnament: {
    fontSize: 18,
    color: COLOR.gold,
    textShadowColor: COLOR.glow,
    textShadowRadius: 8,
    marginVertical: 6,
  },

  title: {
    ...TYPO.title,
    color: COLOR.lightGold,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowRadius: 12,
    marginVertical: 8,
  },

  subtitle: {
    fontSize: 13,
    color: COLOR.textPrimary,
    fontWeight: '600',
    letterSpacing: 0.5,
    opacity: 0.85,
    marginTop: 4,
  },

  card: {
    height: 120,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    backgroundColor: COLOR.glass,
    borderWidth: 1.5,
    borderColor: COLOR.glassBorder,
    ...ELEVATION.z2,
  },

  cardImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },

  cardGlow: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 153, 51, 0.3)',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: SPACING.lg,
    zIndex: 2,
  },

  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    marginRight: SPACING.md,
  },



  textCol: {
    flex: 1,
  },

  cardLabel: {
    ...TYPO.label,
    color: COLOR.lightGold,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowRadius: 8,
  },

  cardSublabel: {
    ...TYPO.sub,
    color: COLOR.textPrimary,
    marginTop: 4,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowRadius: 4,
  },

  chevron: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    marginLeft: SPACING.md,
  },



  footerDecor: {
    alignItems: 'center',
    marginTop: SPACING.xxl,
    paddingVertical: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLOR.glassBorder,
  },

  footerText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLOR.gold,
    letterSpacing: 0.6,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowRadius: 8,
  },
});
