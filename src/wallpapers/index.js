import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WallpaperList from './WallpaperList';
import WallpaperViewer from './WallpaperViewer';
const Stack = createNativeStackNavigator();

export default function WallpaperStack() {
  return (
    <Stack.Navigator initialRouteName="WallpaperList">
      <Stack.Screen name="WallpaperList" component={WallpaperList} options={{ title: 'God Wallpapers', headerShown: false }} />
      <Stack.Screen name="WallpaperViewer" component={WallpaperViewer} options={{ title: '', headerShown: false }} />
    </Stack.Navigator>
  );
}
