import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from 'axios';
import qs from 'qs';
import { encode as btoa } from 'base-64';

// (Recursive renderer unchanged)
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

  // CLIENT_ID/SECRET same as code2 - replace with actual values in production
  const CLIENT_ID = '4d6a3b9d-0be7-4c6a-9204-73e757e29cf0';
  const CLIENT_SECRET = 'CL8xfz2tXrsrnTZk7Bk2F6OvZH2OGu4RPAPhrTVN';
  const TOKEN_URL = 'https://api.prokerala.com/token';
  const API_URL = 'https://api.prokerala.com/v2/astrology/kundli/advanced';

  const getAccessToken = async () => {
    try {
      const body = qs.stringify({ grant_type: 'client_credentials' });
      const auth = 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
      const response = await axios.post(TOKEN_URL, body, {
        headers: {
          'Authorization': auth,
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
      return response.data.access_token;
    } catch (error) {
      console.error("Error fetching token:", error.response?.data || error.message);
      Alert.alert('Error fetching API token');
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

      const params = {
        ayanamsa,
        coordinates,
        datetime: datetime,
        la: language,
        year_length: yearLength,
      };

      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setKundli(response.data);
    } catch (err) {
      console.error("Error fetching kundli:", err.response?.data || err.message);
      Alert.alert('Error', JSON.stringify(err.response?.data?.errors || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKundli();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🔮 Kundli Generator</Text>

      <TextInput
        style={styles.input}
        value={ayanamsa}
        onChangeText={setAyanamsa}
        placeholder="Ayanamsa"
      />
      <TextInput
        style={styles.input}
        value={coordinates}
        onChangeText={setCoordinates}
        placeholder="Coordinates"
      />
      <TextInput
        style={styles.input}
        value={datetime}
        onChangeText={setDatetime}
        placeholder="Datetime (ISO format)"
      />
      <TextInput
        style={styles.input}
        value={language}
        onChangeText={setLanguage}
        placeholder="Language"
      />
      <TextInput
        style={styles.input}
        value={yearLength}
        onChangeText={setYearLength}
        placeholder="Year Length"
      />

      <TouchableOpacity style={styles.button} onPress={fetchKundli}>
        <Text style={styles.buttonText}>Get Kundli</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#4B0082" style={{ marginTop: 20 }} />}

      {kundli && (
        <View style={styles.responseBox}>
          <Text style={styles.heading}>Kundli Response</Text>
          <RenderResponse data={kundli} />
        </View>
      )}
    </ScrollView>
  );
}

// styles remain unchanged (reuse your current StyleSheet)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#4B0082",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#4B0082",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  responseBox: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#eee",
  },
  heading: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginTop: 6,
  },
  text: {
    fontSize: 14,
    color: "#555",
    marginLeft: 8,
  },
  section: {
    marginVertical: 4,
  },
});