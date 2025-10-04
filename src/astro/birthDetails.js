import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert, ActivityIndicator, Pressable, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import qs from 'qs';
import { encode as btoa } from 'base-64';

const AYANAMSA_OPTIONS = [
  { id: '1', label: 'Lahiri (1)' },
  { id: '3', label: 'Raman (3)' },
  { id: '5', label: 'KP (5)' },
];

const LANG_OPTIONS = ['en','hi','gu','ta','ml'];

const BirthDetails = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [datetime, setDatetime] = useState('');
  const [ayanamsa, setAyanamsa] = useState('1');
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [birthData, setBirthData] = useState(null);

  const CLIENT_ID = '02f1578f-b84d-4bc1-86d4-6820daf27e8f';
  const CLIENT_SECRET = 'ZWoDJR0WyzP0xFp9AfqHTtfT7hIapm0TU4BAuKCU';
  const TOKEN_URL = 'https://api.prokerala.com/token';
  const BIRTH_DETAILS_URL = 'https://api.prokerala.com/v2/astrology/birth-details';

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
      Alert.alert('Auth Error', 'Could not obtain access token.');
      return null;
    }
  };

  const fetchBirthDetails = async () => {
    if (!latitude || !longitude || !datetime) {
      Alert.alert('Validation Error', 'Please fill latitude, longitude and datetime');
      return;
    }
    setLoading(true);
    try {
      const token = await getAccessToken();
      if (!token) return;

      const params = {
        coordinates: `${latitude},${longitude}`,
        datetime,
        ayanamsa,
        la: language,
      };

      const response = await axios.get(BIRTH_DETAILS_URL, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setBirthData(response.data.data);
    } catch (error) {
      console.error('Error fetching birth details:', error.response?.data || error.message);
      Alert.alert('Error', JSON.stringify(error.response?.data?.errors || error.message));
    } finally {
      setLoading(false);
    }
  };

  const scale = useRef(new Animated.Value(1)).current;
  const pressIn = () => Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }).start();
  const pressOut = () => Animated.spring(scale, { toValue: 1, friction: 5, tension: 70, useNativeDriver: true }).start();

  const Pill = ({ active, label, onPress }) => (
    <Pressable onPress={onPress} style={[styles.pill, active && styles.pillActive]}>
      <Text style={[styles.pillText, active && styles.pillTextActive]}>{label}</Text>
    </Pressable>
  );

  const renderBirthDetails = () => {
    if (!birthData) return null;
    const { nakshatra, chandra_rasi, soorya_rasi, zodiac, additional_info } = birthData;
    return (
      <View style={styles.resultContainer}>
        <Text style={styles.sectionTitle}>Birth Insights</Text>

        <View style={styles.tagsRow}>
          <Text style={styles.tag}>Zodiac: {zodiac?.name}</Text>
          <Text style={styles.tag}>Moon: {chandra_rasi?.name}</Text>
          <Text style={styles.tag}>Sun: {soorya_rasi?.name}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Nakshatra</Text>
          <Text style={styles.cardLine}>Name: {nakshatra?.name}</Text>
          <Text style={styles.cardLine}>Lord: {nakshatra?.lord?.name} ({nakshatra?.lord?.vedic_name})</Text>
          <Text style={styles.cardLine}>Pada: {nakshatra?.pada}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Rasis</Text>
          <Text style={styles.cardLine}>Chandra Rasi: {chandra_rasi?.name} • Lord: {chandra_rasi?.lord?.name} ({chandra_rasi?.lord?.vedic_name})</Text>
          <Text style={styles.cardLine}>Soorya Rasi: {soorya_rasi?.name} • Lord: {soorya_rasi?.lord?.name} ({soorya_rasi?.lord?.vedic_name})</Text>
        </View>

        {additional_info && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Additional Info</Text>
            {Object.entries(additional_info).map(([key, value]) => (
              <Text key={key} style={styles.cardLine}>
                {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}: {String(value)}
              </Text>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <LinearGradient colors={['#180f00', '#2a1900', '#3a2200']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Enter Birth Details</Text>

        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Latitude"
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={latitude}
            onChangeText={setLatitude}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Longitude"
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={longitude}
            onChangeText={setLongitude}
            keyboardType="numeric"
          />
        </View>

        <TextInput
          style={styles.inputFull}
          placeholder="DateTime e.g. 2004-02-12T15:19:21+05:30"
          placeholderTextColor="rgba(255,255,255,0.6)"
          value={datetime}
          onChangeText={setDatetime}
        />

        <View style={styles.pillRow}>
          {AYANAMSA_OPTIONS.map(o => (
            <Pill key={o.id} label={o.label} active={ayanamsa === o.id} onPress={() => setAyanamsa(o.id)} />
          ))}
        </View>

        <View style={styles.pillRow}>
          {LANG_OPTIONS.map(l => (
            <Pill key={l} label={l.toUpperCase()} active={language === l} onPress={() => setLanguage(l)} />
          ))}
        </View>

        <Pressable onPressIn={pressIn} onPressOut={pressOut} onPress={fetchBirthDetails}>
          <Animated.View style={[styles.cta, { transform: [{ scale }] }]}>
            <Text style={styles.ctaText}>Get Birth Details</Text>
          </Animated.View>
        </Pressable>

        {loading && (
          <View style={styles.loaderWrap}>
            <ActivityIndicator size="large" color="#ffb300" />
            <Text style={styles.loaderText}>Fetching details…</Text>
          </View>
        )}

        {renderBirthDetails()}
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
};

const RADIUS = { sm: 10, md: 14, lg: 18, pill: 28 };
const SPACING = { xs: 6, sm: 10, md: 14, lg: 18, xl: 24, xxl: 32 };

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
    marginBottom: 6,
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

  inputFull: {
    height: 48,
    paddingHorizontal: 14,
    borderRadius: RADIUS.lg,
    color: COLOR.textPrimary,
    backgroundColor: COLOR.glass,
    borderWidth: 1,
    borderColor: COLOR.glassBorder,
  },

  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },

  pill: {
    paddingHorizontal: 14,
    paddingVertical: 10,
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

  loaderWrap: { marginTop: 12, alignItems: 'center', gap: 8 },
  loaderText: { color: COLOR.textMuted },

  resultContainer: {
    marginTop: SPACING.lg,
    borderRadius: RADIUS.lg,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    padding: SPACING.lg,
    gap: 12,
  },

  sectionTitle: {
    color: COLOR.textPrimary,
    fontWeight: '800',
    fontSize: 18,
    textAlign: 'center',
  },

  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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

  card: {
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.22)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    padding: 12,
    gap: 6,
  },

  cardTitle: { color: COLOR.accent, fontWeight: '800', letterSpacing: 0.3 },
  cardLine: { color: COLOR.textPrimary },
});


export default BirthDetails;
