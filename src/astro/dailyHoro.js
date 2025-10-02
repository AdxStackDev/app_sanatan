import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import qs from 'qs';
import { encode as btoa } from 'base-64';

const Dailyhoro = () => {
  const [datetime, setDatetime] = useState('');
  const [sign, setSign] = useState('');
  const [type, setType] = useState('all');
  const [loading, setLoading] = useState(false);
  const [horoscopeData, setHoroscopeData] = useState(null);

  const CLIENT_ID = '02f1578f-b84d-4bc1-86d4-6820daf27e8f';
  const CLIENT_SECRET = 'ZWoDJR0WyzP0xFp9AfqHTtfT7hIapm0TU4BAuKCU';
  const TOKEN_URL = 'https://api.prokerala.com/token';
  const HOROSCOPE_URL = 'https://api.prokerala.com/v2/horoscope/daily/advanced';

  useEffect(() => {
    const now = new Date();
    setDatetime(now.toISOString()); // gives ISO 8601 e.g. "2025-09-30T17:32:12.345Z"
  }, []);


  // 🔑 Get access token
  const getAccessToken = async () => {
    try {
      const body = qs.stringify({ grant_type: 'client_credentials' });
      const auth = 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

      const response = await axios.post(TOKEN_URL, body, {
        headers: {
          'Authorization': auth,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      return response.data.access_token;
    } catch (error) {
      console.error("Error fetching token:", error.response?.data || error.message);
      return null;
    }
  };

  // 📌 Fetch horoscope predictions
  const fetchHoroscope = async () => {
    if (!datetime || !sign || !type) {
      Alert.alert('Validation Error', 'Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const token = await getAccessToken();
      if (!token) return;

      const params = {
        datetime: datetime,
        sign: sign.toLowerCase(),
        type: type.toLowerCase(),
      };

      console.log("Final Params:", params);

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

  // 🎨 Render horoscope details
  const renderHoroscope = () => {
    if (!horoscopeData) return null;

    return (
      <View style={styles.resultContainer}>
        <Text style={styles.sectionTitle}>{horoscopeData.sign.name} ♈ Horoscope</Text>
        <Text>Lord: {horoscopeData.sign.lord.name}</Text>
        <Text>Element: {horoscopeData.sign_info.triplicity}</Text>
        <Text>Modality: {horoscopeData.sign_info.quadruplicity}</Text>

        {horoscopeData.predictions.map((p, index) => (
          <View key={index} style={styles.predictionBox}>
            <Text style={styles.predictionType}>{p.type}</Text>
            <Text>{p.prediction}</Text>
            <Text style={styles.highlight}>Seek: {p.seek}</Text>
            <Text style={styles.highlight}>Challenge: {p.challenge}</Text>
            <Text style={styles.highlight}>Insight: {p.insight}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Daily Horoscope</Text>

      <TextInput
        style={styles.input}
        placeholder="DateTime (ISO 8601 e.g. 2024-10-10T00:00:00+05:30)"
        value={datetime}
        onChangeText={setDatetime}
      />

      <TextInput
        style={styles.input}
        placeholder="Zodiac Sign (e.g. aries, taurus, gemini)"
        value={sign}
        onChangeText={setSign}
      />

      <TextInput
        style={styles.input}
        placeholder="Type (general/health/career/love/all)"
        value={type}
        onChangeText={setType}
      />

      <Button title="Get Horoscope" onPress={fetchHoroscope} />

      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}

      {renderHoroscope()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  predictionBox: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f8ff',
    borderRadius: 5,
  },
  predictionType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  highlight: {
    fontStyle: 'italic',
    marginTop: 3,
  },
});

export default Dailyhoro;
