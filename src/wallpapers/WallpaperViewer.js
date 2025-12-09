import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Text,
  Modal,
  StatusBar,
  Linking,
  Share,
  Animated,
  Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const COLOR = {
  accent: '#FFD700',
  accentGlow: 'rgba(255, 215, 0, 0.4)',
  darkBg: '#000000',
  glass: 'rgba(20, 20, 20, 0.75)',
  glassBorder: 'rgba(255, 255, 255, 0.15)',
  text: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.7)'
};

// Mock Icons for Home Screen Preview
const MockAppIcon = ({ color, name }) => (
  <View style={[styles.mockIcon, { backgroundColor: color }]}>
    {name && <Icon name={name} size={24} color="#FFF" />}
  </View>
);

const HomeScreenOverlay = () => {
  return (
    <View style={styles.homeOverlay} pointerEvents="none">
      <View style={styles.statusBarMock} />

      {/* Top Widget Area */}
      <View style={styles.widgetArea}>
        <View style={styles.weatherWidget}>
          <Icon name="weather-partly-cloudy" size={32} color="#FFF" />
          <Text style={styles.widgetText}>28°C</Text>
          <Text style={styles.widgetSubText}>New Delhi</Text>
        </View>
      </View>

      {/* App Grid */}
      <View style={styles.appGrid}>
        <MockAppIcon color="#DB4437" name="gmail" />
        <MockAppIcon color="#4285F4" name="google-maps" />
        <MockAppIcon color="#0F9D58" name="whatsapp" />
        <MockAppIcon color="#F4B400" name="folder" />
        <MockAppIcon color="#1DA1F2" name="twitter" />
        <MockAppIcon color="#C13584" name="instagram" />
        <MockAppIcon color="#FF0000" name="youtube" />
        <MockAppIcon color="#24292e" name="github" />
      </View>

      {/* Dock */}
      <View style={styles.dockContainer}>
        <View style={styles.dock}>
          <MockAppIcon color="#34C759" name="phone" />
          <MockAppIcon color="#5856D6" name="message" />
          <MockAppIcon color="#FF9500" name="firefox" />
          <MockAppIcon color="#AF52DE" name="music" />
        </View>
      </View>
    </View>
  );
};

const LockScreenOverlay = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <View style={styles.lockOverlay} pointerEvents="none">
      <View style={styles.timeContainer}>
        <Text style={styles.lockTime}>{timeString}</Text>
        <Text style={styles.lockDate}>{dateString}</Text>
      </View>

      <View style={styles.lockFooter}>
        <View style={styles.lockIconBtn}>
          <Icon name="flashlight" size={24} color="#FFF" />
        </View>
        <View style={styles.lockIconBtn}>
          <Icon name="camera" size={24} color="#FFF" />
        </View>
      </View>
    </View>
  );
};

export default function WallpaperViewer({ route, navigation }) {
  const { images, index } = route.params;
  const flatRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(index);

  // Preview Mode State: 'none', 'home', 'lock'
  const [previewMode, setPreviewMode] = useState('none');
  const [controlsVisible, setControlsVisible] = useState(true);

  const toggleControls = () => {
    setControlsVisible(prev => !prev);
  };

  const handleDownload = async () => {
    const url = images[currentIndex]?.url;
    if (!url) return;

    // Use built-in Share for best native experience without extra deps
    try {
      if (Platform.OS === 'ios') {
        await Share.share({ url: url });
      } else {
        // On Android, open in browser is the most reliable "Save" method without RNFetchBlob
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* Wallpaper Carousel */}
      <FlatList
        ref={flatRef}
        data={images}
        initialScrollIndex={index}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={1} onPress={toggleControls}>
            <Image source={{ uri: item.url }} style={styles.wallImg} resizeMode="cover" />
          </TouchableOpacity>
        )}
      />

      {/* Advanced Preview Overlays */}
      {previewMode === 'home' && <HomeScreenOverlay />}
      {previewMode === 'lock' && <LockScreenOverlay />}

      {/* UI Controls (Floating) */}
      {controlsVisible && (
        <View style={styles.controlsLayer} pointerEvents="box-none">

          {/* Top Bar */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
              <Icon name="arrow-left" size={28} color="#FFF" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleDownload} style={styles.downloadBadge}>
              <Text style={styles.downloadText}>SAVE</Text>
              <Icon name="download" size={20} color={COLOR.darkBg} />
            </TouchableOpacity>
          </View>

          {/* Bottom Control Dock */}
          <View style={styles.bottomDock}>
            <LinearGradient
              colors={[COLOR.glass, 'rgba(0,0,0,0.95)']}
              style={styles.dockGradient}
            >
              <View style={styles.previewToggles}>

                <TouchableOpacity
                  style={[styles.modeBtn, previewMode === 'none' && styles.modeBtnActive]}
                  onPress={() => setPreviewMode('none')}
                >
                  <Icon name="image-outline" size={24} color={previewMode === 'none' ? COLOR.accent : '#FFF'} />
                  <Text style={[styles.modeText, previewMode === 'none' && styles.textActive]}>Clean</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modeBtn, previewMode === 'lock' && styles.modeBtnActive]}
                  onPress={() => setPreviewMode('lock')}
                >
                  <Icon name="lock-outline" size={24} color={previewMode === 'lock' ? COLOR.accent : '#FFF'} />
                  <Text style={[styles.modeText, previewMode === 'lock' && styles.textActive]}>Lock</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modeBtn, previewMode === 'home' && styles.modeBtnActive]}
                  onPress={() => setPreviewMode('home')}
                >
                  <Icon name="home-outline" size={24} color={previewMode === 'home' ? COLOR.accent : '#FFF'} />
                  <Text style={[styles.modeText, previewMode === 'home' && styles.textActive]}>Home</Text>
                </TouchableOpacity>

              </View>
            </LinearGradient>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  wallImg: {
    width,
    height,
  },

  // Controls
  controlsLayer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  downloadBadge: {
    flexDirection: 'row',
    backgroundColor: COLOR.accent,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    alignItems: 'center',
    gap: 6,
    shadowColor: COLOR.accent,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  downloadText: {
    color: COLOR.darkBg,
    fontWeight: '800',
    fontSize: 14,
  },

  // Bottom Dock
  bottomDock: {
    width: '100%',
  },
  dockGradient: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderTopColor: COLOR.glassBorder,
  },
  previewToggles: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  modeBtn: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    minWidth: 70,
  },
  modeBtnActive: {
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  modeText: {
    color: '#AAA',
    fontSize: 12,
    marginTop: 6,
    fontWeight: '600',
  },
  textActive: {
    color: COLOR.accent,
    fontWeight: '700',
  },

  // Home Screen Preview
  homeOverlay: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: 100,
  },
  widgetArea: {
    alignItems: 'center',
    marginBottom: 40,
  },
  weatherWidget: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
  },
  widgetText: { color: '#FFF', fontSize: 22, fontWeight: '700', marginTop: 4 },
  widgetSubText: { color: '#DDD', fontSize: 13 },

  appGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    gap: 25,
  },
  mockIcon: {
    width: 60,
    height: 60,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  dockContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  dock: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.25)',
    padding: 15,
    borderRadius: 35,
    gap: 20,
  },

  // Lock Screen Preview
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: 80,
    alignItems: 'center',
  },
  timeContainer: {
    alignItems: 'center',
  },
  lockTime: {
    fontSize: 82,
    fontWeight: '200',
    color: '#FFF',
    includeFontPadding: false,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowRadius: 10,
  },
  lockDate: {
    fontSize: 22,
    fontWeight: '500',
    color: '#FFF',
    marginTop: -5,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowRadius: 10,
  },
  lockFooter: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  lockIconBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
