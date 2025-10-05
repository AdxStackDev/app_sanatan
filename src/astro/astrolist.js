import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function AstroList({ navigation }) {
  return (
    <LinearGradient
      colors={['#180f00', '#2a1900', '#3a2200']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.screen}
    >
      <View style={styles.container}>
        {/* <Text accessibilityRole="header" style={styles.title}>
          ज्योतिष सेवाएँ
        </Text> */}

        <View style={styles.buttonGroup}>
          <Pressable
            accessible
            accessibilityLabel="जन्म विवरण स्क्रीन खोलें"
            onPress={() => navigation.navigate('BirthDetails')}
            style={({ pressed }) => [
              styles.btn,
              styles.btnPrimary,
              pressed && styles.btnPressed,
            ]}
          >
            <LinearGradient
              colors={['#ffb300', '#ff8f00']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.btnBg}
            >
              <Text style={styles.btnText}>जन्म विवरण</Text>
              <Text style={styles.btnSubtext}>Birth Details</Text>
            </LinearGradient>
          </Pressable>

          <Pressable
            accessible
            accessibilityLabel="दैनिक राशिफल स्क्रीन खोलें"
            onPress={() => navigation.navigate('DailyHoro')}
            style={({ pressed }) => [
              styles.btn,
              styles.btnSecondary,
              pressed && styles.btnPressed,
            ]}
          >
            <LinearGradient
              colors={['#c2185b', '#8e024a']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.btnBg}
            >
              <Text style={styles.btnText}>दैनिक राशिफल</Text>
              <Text style={styles.btnSubtext}>Daily Horoscope</Text>
            </LinearGradient>
          </Pressable>

          <Pressable
            accessible
            accessibilityLabel="कुंडली स्क्रीन खोलें"
            onPress={() => navigation.navigate('Kundli')}
            style={({ pressed }) => [
              styles.btn,
              styles.btnTertiary,
              pressed && styles.btnPressed,
            ]}
          >
            <LinearGradient
              colors={['#1565c0', '#0d47a1']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.btnBg}
            >
              <Text style={styles.btnText}>कुंडली</Text>
              <Text style={styles.btnSubtext}>Kundli</Text>
            </LinearGradient>
          </Pressable>
        </View>

        {/* <Text style={styles.footerNote}>
          शुभ रंग: भगवा • शुभ दिन: रविवार
        </Text> */}
      </View>
    </LinearGradient>
  );
}

const COLOR = {
  textPrimary: '#fff7e6',
  textMuted: '#ffe4b5',
  surface: 'rgba(255,255,255,0.06)',
  outline: 'rgba(255,255,255,0.12)',
  shadow: '#000',
};

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
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
};

const TYPO = {
  title: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  btn: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  sub: {
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.9,
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
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xxl + 8,
    paddingBottom: SPACING.xl,
    gap: SPACING.xxl,
  },

  title: {
    ...TYPO.title,
    color: COLOR.textPrimary,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowRadius: 10,
    textShadowOffset: { width: 0, height: 2 },
  },

  buttonGroup: {
    gap: SPACING.lg,
  },

  btn: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLOR.outline,
    // transform: [{ translateZ: 0 }],
    ...ELEVATION.z2,
  },

  btnBg: {
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.xl,
  },

  btnPrimary: {},
  btnSecondary: {},
  btnTertiary: {},

  btnText: {
    ...TYPO.btn,
    color: '#fffbe6',
    textAlign: 'left',
  },

  btnSubtext: {
    ...TYPO.sub,
    color: COLOR.textMuted,
    marginTop: SPACING.xs,
  },

  btnPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.995 }],
  },

  footerNote: {
    ...TYPO.footnote,
    color: '#ffd54f',
    textAlign: 'center',
    opacity: 0.9,
  },
});
