import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Animated, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function ArtiList({ navigation }) {
  return (
    <LinearGradient
      colors={['#ff9800', '#ffd700', '#b71c1c']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.screen}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* <Text style={styles.title}>आरती संग्रह</Text> */}

        <ArtiItem
          label="श्री गणेश जी की आरती"
          sublabel="Shri Ganesh Aarti"
          image={{ uri: 'https://i.pinimg.com/1200x/a4/ae/21/a4ae211f0e2528381243bb2ee7aa17d7.jpg' }}
          onPress={() => navigation.navigate('Ganesh')}
        />

        <ArtiItem
          label="श्री राम जी की आरती"
          sublabel="Shri Ram Aarti"
          image={{ uri: 'https://i.pinimg.com/1200x/4c/30/27/4c3027cc66c77761b39a0ac8d0ee31cb.jpg' }}
          onPress={() => navigation.navigate('ShreeRam')}
        />

        <ArtiItem
          label="श्री हनुमान जी की आरती"
          sublabel="Shri Hanuman Aarti"
          image={{ uri: 'https://i.pinimg.com/1200x/82/b2/67/82b267a710868118be345c8c87cb7c28.jpg' }}
          onPress={() => navigation.navigate('Hanuman')}
        />

        <ArtiItem
          label="श्री कृष्ण जी की आरती"
          sublabel="Shri Krishna Aarti"
          image={{ uri: 'https://i.pinimg.com/736x/4b/2c/15/4b2c15a06568d3db0adeb1b05a58438e.jpg' }}
          onPress={() => navigation.navigate('Krishna')}
        />

        <ArtiItem
          label="श्री सीता माता जी की आरती"
          sublabel="Shri Sita Mata Aarti"
          image={{ uri: 'https://i.pinimg.com/1200x/e7/1f/2e/e71f2e5eced8d4893fe984ce33d6e87d.jpg' }}
          onPress={() => navigation.navigate('SitaMaa')}
        />
      </ScrollView>
    </LinearGradient>
  );
}

function ArtiItem({ onPress, label, sublabel, image }) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () =>
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
  const pressOut = () =>
    Animated.spring(scale, { toValue: 1, friction: 5, tension: 70, useNativeDriver: true }).start();

  return (
    <Pressable onPressIn={pressIn} onPressOut={pressOut} onPress={onPress} android_ripple={{ color: 'rgba(255,255,255,0.08)' }}>
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <Image source={image} style={styles.cardImage} resizeMode="cover" />
        <View style={styles.cardOverlay} />
        <View style={styles.row}>
          <View style={styles.thumbWrap}>
            <Image source={image} style={styles.thumb} resizeMode="cover" />
          </View>
          <View style={styles.textCol}>
            <Text style={styles.cardLabel}>{label}</Text>
            <Text style={styles.cardSublabel}>{sublabel}</Text>
          </View>
          <View style={styles.chevron}>
            <Text style={styles.chevronText}>›</Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const COLOR = {
  textPrimary: '#fff7e6',
  textMuted: '#ffe4b5',
  glass: 'rgba(255,255,255,0.08)',
  glassBorder: 'rgba(255,255,255,0.18)',
  shadow: '#000',
  accent: '#ffb300',
};

const SPACING = { xs: 6, sm: 10, md: 14, lg: 18, xl: 24, xxl: 32 };
const RADIUS = { sm: 10, md: 14, lg: 18, pill: 28 };

const ELEVATION = {
  z2: {
    shadowColor: COLOR.shadow,
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
};

const TYPO = {
  title: { fontSize: 28, fontWeight: '800', letterSpacing: 0.6 },
  label: { fontSize: 18, fontWeight: '800', letterSpacing: 0.3 },
  sub: { fontSize: 12, fontWeight: '600', opacity: 0.95, letterSpacing: 0.3 },
};

const styles = StyleSheet.create({
  screen: { flex: 1 },

  container: {
    padding: SPACING.xl,
    gap: SPACING.md,
  },

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
    height: 110,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    backgroundColor: COLOR.glass,
    borderWidth: 1,
    borderColor: COLOR.glassBorder,
    ...ELEVATION.z2,
  },

  cardImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },

  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: SPACING.lg,
  },

  thumbWrap: {
    width: 64,
    height: 64,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    marginRight: SPACING.md,
  },

  thumb: {
    width: '100%',
    height: '100%',
  },

  textCol: {
    flex: 1,
  },

  cardLabel: {
    ...TYPO.label,
    color: '#fffbe6',
  },

  cardSublabel: {
    ...TYPO.sub,
    color: COLOR.textMuted,
    marginTop: 4,
  },

  chevron: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    marginLeft: SPACING.md,
  },

  chevronText: {
    color: COLOR.accent,
    fontSize: 22,
    lineHeight: 22,
  },
});
