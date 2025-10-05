import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert, ActivityIndicator, Pressable, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import qs from 'qs';
import { encode as btoa } from 'base-64';

const SIGNS = ['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'];
const TYPES = ['all','general','health','career','love'];

const Dailyhoro = () => {
  const [datetime, setDatetime] = useState('');
  const [sign, setSign] = useState('aries');
  const [type, setType] = useState('all');
  const [loading, setLoading] = useState(false);
  const [horoscopeData, setHoroscopeData] = useState(null);

  const CLIENT_ID = '02f1578f-b84d-4bc1-86d4-6820daf27e8f';
  const CLIENT_SECRET = 'ZWoDJR0WyzP0xFp9AfqHTtfT7hIapm0TU4BAuKCU';
  const TOKEN_URL = 'https://api.prokerala.com/token';
  const HOROSCOPE_URL = 'https://api.prokerala.com/v2/horoscope/daily/advanced';

  useEffect(() => {
    const now = new Date();
    // Example: 2025-10-04T00:00:00+05:30 for local offset
    const offsetMin = now.getTimezoneOffset();
    const abs = Math.abs(offsetMin);
    const signOff = offsetMin <= 0 ? '+' : '-';
    const hh = String(Math.floor(abs / 60)).padStart(2, '0');
    const mm = String(abs % 60).padStart(2, '0');
    const local = new Date(now.getTime() - offsetMin * 60000).toISOString().slice(0,19);
    setDatetime(`${local}${signOff}${hh}:${mm}`);
  }, []);

  const getAccessToken = async () => {
    try {
      const body = qs.stringify({ grant_type: 'client_credentials' });
      const auth = 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
      const response = await axios.post(TOKEN_URL, body, {
        headers: { Authorization: auth, 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      return response.data.access_token;
    } catch (error) {
      console.error('Error fetching token:', error.response?.data || error.message);
      Alert.alert('Auth Error', 'Could not obtain access token. Check credentials or network.');
      return null;
    }
  };

  const fetchHoroscope = async () => {
    if (!datetime || !sign || !type) {
      Alert.alert('Validation Error', 'Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      const token = await getAccessToken();
      if (!token) return;

      const params = { datetime, sign: sign.toLowerCase(), type: type.toLowerCase() };
      const response = await axios.get(HOROSCOPE_URL, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setHoroscopeData(response.data.data.daily_predictions[0]);
    } catch (error) {
      console.error('Error fetching horoscope:', error.response?.data || error.message);
      Alert.alert('Error', JSON.stringify(error.response?.data?.errors || error.message));
    } finally {
      setLoading(false);
    }
  };

  const scale = useRef(new Animated.Value(1)).current;
  const onPressIn = () => Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }).start();
  const onPressOut = () => Animated.spring(scale, { toValue: 1, friction: 5, tension: 70, useNativeDriver: true }).start();

  const renderHoroscope = () => {
    if (!horoscopeData) return null;
    return (
      <View style={styles.resultContainer}>
        <Text style={styles.sectionTitle}>{horoscopeData.sign.name} • {type.toUpperCase()}</Text>
        <View style={styles.tagsRow}>
          <Text style={styles.tag}>Lord: {horoscopeData.sign.lord.name}</Text>
          <Text style={styles.tag}>Element: {horoscopeData.sign_info.triplicity}</Text>
          <Text style={styles.tag}>Modality: {horoscopeData.sign_info.quadruplicity}</Text>
        </View>

        {horoscopeData.predictions.map((p, idx) => (
          <View key={idx} style={styles.predictionBox}>
            <Text style={styles.predictionType}>{p.type}</Text>
            <Text style={styles.predictionText}>{p.prediction}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.meta}><Text style={styles.metaKey}>Seek:</Text> {p.seek}</Text>
              <Text style={styles.meta}><Text style={styles.metaKey}>Challenge:</Text> {p.challenge}</Text>
              <Text style={styles.meta}><Text style={styles.metaKey}>Insight:</Text> {p.insight}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <LinearGradient colors={['#180f00', '#2a1900', '#3a2200']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* <Text style={styles.title}>Daily Horoscope</Text> */}

        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="2025-10-04T00:00:00+05:30"
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={datetime}
            onChangeText={setDatetime}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillRow}>
          {SIGNS.map(s => (
            <Pressable key={s} onPress={() => setSign(s)} style={[styles.pill, sign === s && styles.pillActive]}>
              <Text style={[styles.pillText, sign === s && styles.pillTextActive]}>{s}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.pillRow}>
          {TYPES.map(t => (
            <Pressable key={t} onPress={() => setType(t)} style={[styles.pillSm, type === t && styles.pillActive]}>
              <Text style={[styles.pillText, type === t && styles.pillTextActive]}>{t}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={fetchHoroscope}>
          <Animated.View style={[styles.cta, { transform: [{ scale }] }]}>
            <Text style={styles.ctaText}>Get Horoscope</Text>
          </Animated.View>
        </Pressable>

        {loading && (
          <View style={styles.loaderWrap}>
            <ActivityIndicator size="large" color="#ffb300" />
            <Text style={styles.loaderText}>Fetching predictions…</Text>
          </View>
        )}

        {renderHoroscope()}
      </ScrollView>
    </LinearGradient>
  );
};

const COLOR = {
  textPrimary: '#fff7e6',
  textMuted: '#ffe4b5',
  glass: 'rgba(255,255,255,0.08)',
  glassBorder: 'rgba(255,255,255,0.18)',
  accent: '#ffb300',
  accentDeep: '#ff8f00',
};

const SPACING = { xs: 6, sm: 10, md: 14, lg: 18, xl: 24, xxl: 32 };
const RADIUS = { sm: 10, md: 14, lg: 18, pill: 28 };

const styles = StyleSheet.create({
  screen: { flex: 1 },

  container: {
    padding: SPACING.xl,
    gap: SPACING.md,
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLOR.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },

  row: { flexDirection: 'row', gap: SPACING.sm },

  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 14,
    borderRadius: RADIUS.lg,
    color: COLOR.textPrimary,
    backgroundColor: COLOR.glass,
    borderWidth: 1,
    borderColor: COLOR.glassBorder,
  },

  pillRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 8,
    marginVertical: 6,
  },

  pill: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: RADIUS.pill,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: COLOR.glassBorder,
  },

  pillSm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: RADIUS.pill,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: COLOR.glassBorder,
  },

  pillActive: {
    backgroundColor: 'rgba(255,179,0,0.18)',
    borderColor: 'rgba(255,179,0,0.55)',
  },

  pillText: { color: COLOR.textMuted, fontWeight: '700', letterSpacing: 0.3 },
  pillTextActive: { color: COLOR.textPrimary },

  cta: {
    height: 52,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.accent,
  },

  ctaText: {
    color: '#2a1900',
    fontWeight: '800',
    fontSize: 18,
    letterSpacing: 0.5,
  },

  loaderWrap: {
    marginTop: 12,
    alignItems: 'center',
    gap: 8,
  },

  loaderText: { color: COLOR.textMuted },

  resultContainer: {
    marginTop: SPACING.lg,
    borderRadius: RADIUS.lg,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    padding: SPACING.lg,
  },

  sectionTitle: {
    color: COLOR.textPrimary,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
    textAlign: 'center',
  },

  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
    justifyContent: 'center',
  },

  tag: {
    color: COLOR.textMuted,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },

  predictionBox: {
    marginTop: 10,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.22)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },

  predictionType: {
    color: COLOR.accent,
    fontWeight: '800',
    marginBottom: 6,
    letterSpacing: 0.3,
  },

  predictionText: {
    color: COLOR.textPrimary,
    lineHeight: 22,
  },

  metaRow: { marginTop: 8, gap: 4 },
  meta: { color: COLOR.textMuted },
  metaKey: { color: COLOR.textPrimary, fontWeight: '700' },
});


export default Dailyhoro;
