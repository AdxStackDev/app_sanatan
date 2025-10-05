import { Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const wallpapers = [
  { id: 1, url: 'https://i.pinimg.com/1200x/08/08/27/0808277bc78844c792b190fce01cf0c6.jpg' },
  { id: 2, url: 'https://i.pinimg.com/736x/22/a6/1c/22a61cd5c1b6abcc5a45340937fa86e2.jpg' },
  { id: 3, url: 'https://i.pinimg.com/1200x/f0/56/5e/f0565ec58fbb3f3cec69a46fd133b6ba.jpg' },
  { id: 4, url: 'https://i.pinimg.com/1200x/a4/ae/21/a4ae211f0e2528381243bb2ee7aa17d7.jpg' },
  { id: 5, url: 'https://i.pinimg.com/1200x/4c/30/27/4c3027cc66c77761b39a0ac8d0ee31cb.jpg' },
];

export default function WallpaperList({ navigation }) {
  return (
    <LinearGradient colors={['#ff9800', '#ffd700', '#b71c1c']} style={{flex:1}}>
      <ScrollView contentContainerStyle={styles.wallList}>
        <Text style={styles.title}>My Wallpapers</Text>
        {wallpapers.map((wall, idx) => (
          <Pressable
            key={wall.id}
            style={styles.thumbWrap}
            onPress={() => navigation.navigate('WallpaperViewer', { images: wallpapers, index: idx })}
          >
            <Image source={{ uri: wall.url }} style={styles.thumbImg} resizeMode="cover" />
          </Pressable>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wallList: { padding: 18, gap: 18, alignItems: 'center' },
  title: { color: '#fff7e6', fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  thumbWrap: { borderWidth: 2, borderColor: '#ffd700', borderRadius: 16, overflow: 'hidden', width: 120, height: 180 },
  thumbImg: { width: '100%', height: '100%' },
});
