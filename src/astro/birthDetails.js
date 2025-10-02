import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import qs from 'qs';
import { encode as btoa } from 'base-64';

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
        headers: {
            'Authorization': auth,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        });
        console.log("Access Token:", response.data.access_token);
        return response.data.access_token;
    } catch (error) {
        console.error("Error fetching token:", error.response?.data || error.message);
        return null;
    }
    };

  const fetchBirthDetails = async () => {
    if (!latitude || !longitude || !datetime) {
      Alert.alert('Validation Error', 'Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const token = await getAccessToken();
      if (!token) return;

      const coords = `${latitude},${longitude}`;
      const params = {
        coordinates: coords,
        datetime: datetime,
        ayanamsa,
        la: language,
      };
      
      console.log("Final Params:", params);

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

  const renderBirthDetails = () => {
    if (!birthData) return null;

    const { nakshatra, chandra_rasi, soorya_rasi, zodiac, additional_info } = birthData;

    return (
      <View style={styles.resultContainer}>
        <Text style={styles.sectionTitle}>Nakshatra</Text>
        <Text>Name: {nakshatra.name}</Text>
        <Text>Lord: {nakshatra.lord.name} ({nakshatra.lord.vedic_name})</Text>
        <Text>Pada: {nakshatra.pada}</Text>

        <Text style={styles.sectionTitle}>Chandra Rasi</Text>
        <Text>Name: {chandra_rasi.name}</Text>
        <Text>Lord: {chandra_rasi.lord.name} ({chandra_rasi.lord.vedic_name})</Text>

        <Text style={styles.sectionTitle}>Soorya Rasi</Text>
        <Text>Name: {soorya_rasi.name}</Text>
        <Text>Lord: {soorya_rasi.lord.name} ({soorya_rasi.lord.vedic_name})</Text>

        <Text style={styles.sectionTitle}>Zodiac</Text>
        <Text>Name: {zodiac.name}</Text>

        <Text style={styles.sectionTitle}>Additional Info</Text>
        {Object.entries(additional_info).map(([key, value]) => (
          <Text key={key}>
            {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}: {value}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Enter Birth Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Latitude"
        value={latitude}
        onChangeText={setLatitude}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Longitude"
        value={longitude}
        onChangeText={setLongitude}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="DateTime (ISO 8601 e.g. 2004-02-12T15:19:21+05:30)"
        value={datetime}
        onChangeText={setDatetime}
      />

      <TextInput
        style={styles.input}
        placeholder="Ayanamsa (1-Lahiri, 3-Raman, 5-KP)"
        value={ayanamsa}
        onChangeText={setAyanamsa}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Language (en/ta/ml/hi)"
        value={language}
        onChangeText={setLanguage}
      />

      <Button title="Get Birth Details" onPress={fetchBirthDetails} />

      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}

      {renderBirthDetails()}
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
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
});

export default BirthDetails;
