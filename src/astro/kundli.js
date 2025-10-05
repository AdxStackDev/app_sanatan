import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, Pressable, ActivityIndicator, Alert, Animated } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import axios from 'axios';
import qs from 'qs';
import { encode as btoa } from 'base-64';

const AYANAMSA_OPTIONS = [
  { id: "1", label: "Lahiri (1)" },
  { id: "5", label: "Raman (5)" },
  { id: "3", label: "KP (3)" },
];

const LANG_OPTIONS = ["en", "hi", "gu"];
const YEAR_OPTIONS = ["1", "360"];

const Pill = ({ active, label, onPress, small }) => (
  <Pressable onPress={onPress} style={[styles.pill, small && styles.pillSm, active && styles.pillActive]}>
    <Text style={[styles.pillText, active && styles.pillTextActive]}>{label}</Text>
  </Pressable>
);

// Recursive renderer
const RenderResponse = ({ data, level = 0 }) => {
  if (!data) return null;
  if (Array.isArray(data)) {
    return (
      <View style={{ marginLeft: level * 10 }}>
        {data.map((item, idx) => (
          <View key={idx} style={styles.section}>
            <Text style={styles.heading}>• Item {idx + 1}</Text>
            <RenderResponse data={item} level={level + 1} />
          </View>
        ))}
      </View>
    );
  }
  if (typeof data === "object") {
    return (
      <View style={{ marginLeft: level * 10 }}>
        {Object.entries(data).map(([key, value], idx) => (
          <View key={idx} style={styles.section}>
            <Text style={styles.heading}>{key}</Text>
            <RenderResponse data={value} level={level + 1} />
          </View>
        ))}
      </View>
    );
  }
  return <Text style={styles.text}>👉 {String(data)}</Text>;
};

export default function Kundli() {
  const [ayanamsa, setAyanamsa] = useState("1");
  const [coordinates, setCoordinates] = useState("28.6139,77.2090");
  const [datetime, setDatetime] = useState("1993-04-21T09:30:00+05:30");
  const [language, setLanguage] = useState("en");
  const [yearLength, setYearLength] = useState("1");
  const [kundli, setKundli] = useState(null);
  const [loading, setLoading] = useState(false);

  const CLIENT_ID = '4d6a3b9d-0be7-4c6a-9204-73e757e29cf0';
  const CLIENT_SECRET = 'CL8xfz2tXrsrnTZk7Bk2F6OvZH2OGu4RPAPhrTVN';
  const TOKEN_URL = 'https://api.prokerala.com/token';
  const API_URL = 'https://api.prokerala.com/v2/astrology/kundli/advanced';

  const getAccessToken = async () => {
    try {
      const body = qs.stringify({ grant_type: 'client_credentials' });
      const auth = 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
      const response = await axios.post(TOKEN_URL, body, {
        headers: { 'Authorization': auth, 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      return response.data.access_token;
    } catch (error) {
      console.error("Error fetching token:", error.response?.data || error.message);
      Alert.alert('Auth Error', 'Could not obtain API token.');
      return null;
    }
  };

  const fetchKundli = async () => {
    if (!ayanamsa || !coordinates || !datetime || !language || !yearLength) {
      Alert.alert('Validation Error', 'Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      const token = await getAccessToken();
      if (!token) return;

      const params = { ayanamsa, coordinates, datetime, la: language, year_length: yearLength };
      const response = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` }, params });
      setKundli(response.data);
    } catch (err) {
      console.error("Error fetching kundli:", err.response?.data || err.message);
      Alert.alert('Error', JSON.stringify(err.response?.data?.errors || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Optional: auto-fetch on mount
    fetchKundli();
  }, []);

  const scale = useRef(new Animated.Value(1)).current;
  const pressIn = () => Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }).start();
  const pressOut = () => Animated.spring(scale, { toValue: 1, friction: 5, tension: 70, useNativeDriver: true }).start();

  return (
    <LinearGradient colors={['#180f00', '#2a1900', '#3a2200']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* <Text style={styles.title}>Kundli Generator</Text> */}

        <View style={styles.rowWrap}>
          {AYANAMSA_OPTIONS.map(o => (
            <Pill key={o.id} label={o.label} active={ayanamsa === o.id} onPress={() => setAyanamsa(o.id)} />
          ))}
        </View>

        <TextInput
          style={styles.input}
          value={coordinates}
          onChangeText={setCoordinates}
          placeholder="Lat,Lng (e.g., 28.6139,77.2090)"
          placeholderTextColor="rgba(255,255,255,0.6)"
        />
        <TextInput
          style={styles.input}
          value={datetime}
          onChangeText={setDatetime}
          placeholder="1993-04-21T09:30:00+05:30"
          placeholderTextColor="rgba(255,255,255,0.6)"
        />

        <View style={styles.rowWrap}>
          {LANG_OPTIONS.map(l => (
            <Pill key={l} label={l.toUpperCase()} active={language === l} onPress={() => setLanguage(l)} small />
          ))}
          {YEAR_OPTIONS.map(y => (
            <Pill key={y} label={`Year ${y}`} active={yearLength === y} onPress={() => setYearLength(y)} small />
          ))}
        </View>

        <Pressable onPressIn={pressIn} onPressOut={pressOut} onPress={fetchKundli}>
          <Animated.View style={[styles.cta, { transform: [{ scale }] }]}>
            <Text style={styles.ctaText}>Get Kundli</Text>
          </Animated.View>
        </Pressable>

        {loading && (
          <View style={styles.loaderWrap}>
            <ActivityIndicator size="large" color="#ffb300" />
            <Text style={styles.loaderText}>Calculating charts…</Text>
          </View>
        )}

        {kundli && (
          <View style={styles.responseBox}>
            <Text style={styles.responseTitle}>Kundli Response</Text>
            <RenderResponse data={kundli} />
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

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

  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  input: {
    height: 48,
    paddingHorizontal: 14,
    borderRadius: RADIUS.lg,
    color: COLOR.textPrimary,
    backgroundColor: COLOR.glass,
    borderWidth: 1,
    borderColor: COLOR.glassBorder,
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

  responseBox: {
    marginTop: SPACING.lg,
    borderRadius: RADIUS.lg,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    padding: SPACING.lg,
  },

  responseTitle: {
    color: COLOR.textPrimary,
    fontWeight: '800',
    marginBottom: 8,
    fontSize: 18,
    textAlign: 'center',
  },

  heading: {
    fontSize: 14,
    fontWeight: '800',
    color: COLOR.textPrimary,
    marginTop: 6,
  },

  text: {
    fontSize: 13,
    color: COLOR.textMuted,
    marginLeft: 8,
  },

  section: { marginVertical: 4 },
});
