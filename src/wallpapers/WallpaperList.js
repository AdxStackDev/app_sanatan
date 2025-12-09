import React, { useRef } from 'react';
import { Text, StyleSheet, ScrollView, Image, Pressable, View, Animated, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const COLOR = {
  bgGradA: '#1a0500',
  bgGradB: '#3d0f00',
  bgGradC: '#6b1a00',
  bgGradD: '#8b2500',
  gold: '#FFD700',
  lightGold: '#FFF4A3',
  textPrimary: '#fff7e6',
  glow: 'rgba(255, 204, 102, 0.35)',
  glassBorder: 'rgba(255,255,255,0.15)',
};

const wallpapers = [
  { id: 1, url: 'https://i.pinimg.com/1200x/08/08/27/0808277bc78844c792b190fce01cf0c6.jpg' },
  { id: 2, url: 'https://i.pinimg.com/736x/22/a6/1c/22a61cd5c1b6abcc5a45340937fa86e2.jpg' },
  { id: 3, url: 'https://i.pinimg.com/1200x/f0/56/5e/f0565ec58fbb3f3cec69a46fd133b6ba.jpg' },
  { id: 4, url: 'https://i.pinimg.com/1200x/a4/ae/21/a4ae211f0e2528381243bb2ee7aa17d7.jpg' },
  { id: 5, url: 'https://i.pinimg.com/1200x/4c/30/27/4c3027cc66c77761b39a0ac8d0ee31cb.jpg' },
];

function WallpaperThumb({ wall, idx, navigation }) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => Animated.spring(scale, { toValue: 0.92, useNativeDriver: true }).start();
  const pressOut = () => Animated.spring(scale, { toValue: 1, friction: 5, tension: 70, useNativeDriver: true }).start();

  return (
    <Pressable
      onPressIn={pressIn}
      onPressOut={pressOut}
      onPress={() => navigation.navigate('WallpaperViewer', { images: wallpapers, index: idx })}
    >
      <Animated.View style={[styles.thumbWrap, { transform: [{ scale }] }]}>
        <Image source={{ uri: wall.url }} style={styles.thumbImg} resizeMode="cover" />
        <View style={styles.thumbOverlay} />
        <View style={styles.thumbBadge}>
          <Icon name="star" size={16} color={COLOR.gold} />
        </View>
      </Animated.View>
    </Pressable>
  );
}

export default function WallpaperList({ navigation }) {
  return (
    <LinearGradient
      colors={[COLOR.bgGradA, COLOR.bgGradB, COLOR.bgGradC, COLOR.bgGradD]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.wallList} showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <Text style={styles.headerOrnament}>✦</Text>
          <Text style={styles.title}>वॉलपेपर</Text>
          {/* <Text style={styles.subtitle}>Divine Sacred Backgrounds</Text> */}
          <Text style={styles.headerOrnament}>✦</Text>
        </View>

        <View style={styles.gridContainer}>
          {wallpapers.map((wall, idx) => (
            <WallpaperThumb key={wall.id} wall={wall} idx={idx} navigation={navigation} />
          ))}
        </View>

        <View style={styles.footerDecor}>
          <Text style={styles.footerText}>ॐ सर्वे भवन्तु सुखिनः ॐ</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wallList: { paddingVertical: 24, paddingHorizontal: 16, paddingBottom: 40 },

  headerSection: {
    alignItems: 'center',
    marginBottom: 28,
    marginTop: 12,
  },

  headerOrnament: {
    fontSize: 18,
    color: COLOR.gold,
    textShadowColor: COLOR.glow,
    textShadowRadius: 8,
    marginVertical: 6,
  },

  title: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 0.8,
    color: COLOR.lightGold,
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

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },

  thumbWrap: {
    borderWidth: 2,
    borderColor: COLOR.gold,
    borderRadius: 18,
    overflow: 'hidden',
    width: (width - 64) / 2,
    height: 200,
    shadowColor: 'rgba(255, 153, 51, 0.4)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },

  thumbImg: { width: '100%', height: '100%' },

  thumbOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },

  thumbBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLOR.gold,
  },

  footerDecor: {
    alignItems: 'center',
    paddingVertical: 16,
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
