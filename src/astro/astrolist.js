import React, { useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Animated, Dimensions } from 'react-native';
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
  glow: 'rgba(255, 204, 102, 0.35)',
};

export default function AstroList({ navigation }) {
  return (
    <LinearGradient
      colors={[COLOR.bgGradA, COLOR.bgGradB, COLOR.bgGradC, COLOR.bgGradD]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.screen}
    >
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <Text style={styles.headerOrnament}>✦</Text>
          <Text style={styles.title}>ज्योतिष</Text>
          <Text style={styles.subtitle}>Astrology & Cosmic Wisdom</Text>
          <Text style={styles.headerOrnament}>✦</Text>
        </View>

        <View style={styles.buttonGroup}>
          <AstroButton
            iconName="calendar"
            label="जन्म विवरण"
            sublabel="Birth Details"
            onPress={() => navigation.navigate('BirthDetails')}
            colors={['#FF9933', '#FFD700']}
          />

          <AstroButton
            iconName="star"
            label="दैनिक राशिफल"
            sublabel="Daily Horoscope"
            onPress={() => navigation.navigate('DailyHoro')}
            colors={['#FF6B9D', '#C2185B']}
          />

          <AstroButton
            iconName="chart-line"
            label="कुंडली"
            sublabel="Birth Chart"
            onPress={() => navigation.navigate('Kundli')}
            colors={['#667EEA', '#764BA2']}
          />
        </View>

        <View style={styles.footerDecor}>
          <Text style={styles.footerText}>ॐ सर्वे भवन्तु सुखिनः ॐ</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

function AstroButton({ iconName, label, sublabel, onPress, colors }) {
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
    outputRange: [0, 0.4]
  });

  return (
    <Pressable onPressIn={pressIn} onPressOut={pressOut} onPress={onPress}>
      <Animated.View style={[styles.btn, { transform: [{ scale }] }]}>
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.btnBg}
        >
          <Animated.View style={[styles.btnGlow, { opacity: glowOpacity }]} />
          <View style={styles.btnContent}>
            <Icon name={iconName} size={32} color="#fffbe6" />
            <View style={styles.btnTextCol}>
              <Text style={styles.btnText}>{label}</Text>
              <Text style={styles.btnSubtext}>{sublabel}</Text>
            </View>
            <Icon name="chevron-right" size={28} color="#fffbe6" style={{ opacity: 0.7 }} />
          </View>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

const SPACING = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  xxl: 32,
};

const RADIUS = {
  sm: 10,
  md: 14,
  lg: 18,
  pill: 28,
};

const ELEVATION = {
  z1: {
    shadowColor: COLOR.shadow,
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  z2: {
    shadowColor: COLOR.shadow,
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
};

const TYPO = {
  title: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  btn: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  sub: {
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.95,
    letterSpacing: 0.2,
  },
  footnote: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
    gap: SPACING.xl,
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

  buttonGroup: {
    gap: SPACING.lg,
    flex: 1,
    justifyContent: 'center',
  },

  btn: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.15)',
    ...ELEVATION.z2,
  },

  btnBg: {
    paddingVertical: SPACING.xl + 4,
    paddingHorizontal: SPACING.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.lg,
  },

  btnGlow: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },

  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.lg,
    flex: 1,
    zIndex: 2,
  },



  btnTextCol: {
    flex: 1,
  },

  btnText: {
    ...TYPO.btn,
    color: '#fffbe6',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowRadius: 6,
  },

  btnSubtext: {
    ...TYPO.sub,
    color: 'rgba(255,255,255,0.85)',
    marginTop: SPACING.xs,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowRadius: 4,
  },



  footerDecor: {
    alignItems: 'center',
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
