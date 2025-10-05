import { useRef, useState } from 'react';
import { View, Image, StyleSheet, FlatList, Dimensions, TouchableOpacity, Text, Modal, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function WallpaperViewer({ route }) {
  const { images, index } = route.params;
  const flatRef = useRef();
  const [previewModal, setPreviewModal] = useState(false);
  const [currentImg, setCurrentImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(index);

  const openPreview = (img) => {
    setCurrentImg(img);
    setPreviewModal(true);
    StatusBar.setHidden(true, 'fade');
  };
  const closePreview = () => {
    setPreviewModal(false);
    StatusBar.setHidden(false, 'fade');
  };

  // Track current image when scrolling
  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  return (
    <View style={styles.container}>
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
        style={{ flex: 1, backgroundColor: '#000' }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={{ uri: item.url }} style={styles.wallImg} resizeMode="cover" />
          </View>
        )}
      />
      
      {/* FIXED BUTTONS AT BOTTOM - ALWAYS VISIBLE */}
      <View style={styles.fixedFooter}>
        <TouchableOpacity 
          style={styles.actionBtn} 
          onPress={() => openPreview(images[currentIndex]?.url)}
        >
          <Text style={styles.btnText}>Preview</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionBtn} 
          onPress={() => alert('Download: ' + images[currentIndex]?.url)}
        >
          <Text style={styles.btnText}>Download</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={previewModal}
        animationType="fade"
        transparent={false}
        statusBarTranslucent
        onRequestClose={closePreview}
      >
        <View style={styles.fullscreenWrap}>
          <Image source={{ uri: currentImg }} style={styles.fullscreenImg} resizeMode="contain" />
          <TouchableOpacity style={styles.closeBtn} onPress={closePreview}>
            <Text style={styles.btnText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  slide: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  wallImg: {
    width,
    height,
    resizeMode: 'cover',
  },
  fixedFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 28,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  actionBtn: {
    backgroundColor: '#ffd700',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 25,
    marginHorizontal: 15,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  btnText: { 
    color: '#b71c1c', 
    fontWeight: '700', 
    fontSize: 16,
    textAlign: 'center',
  },
  fullscreenWrap: { 
    flex: 1, 
    backgroundColor: '#000', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  fullscreenImg: { 
    width, 
    height, 
    resizeMode: 'contain', 
    backgroundColor: '#000' 
  },
  closeBtn: { 
    position: 'absolute', 
    top: 50, 
    right: 20, 
    backgroundColor: '#ffd700', 
    paddingHorizontal: 28, 
    paddingVertical: 12, 
    borderRadius: 30,
    elevation: 8,
  },
});
