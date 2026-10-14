import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchTotalQuantity } from '../api';

interface HomeScreenProps {
  userId: string
}

export default function HomeScreen({userId}:HomeScreenProps) {
  const [number, setNumber] = useState<number>(0);

  useEffect(() => {
    const loadQuantity = async () => {
      try {
        const data = await fetchTotalQuantity(userId);
        setNumber(data);
      } catch (error) {
        console.error("Polling-Fehler:", error);
      }
    };

    loadQuantity();
    const intervalId = setInterval(loadQuantity, 3000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.blackText}>Menge: {number}</Text> 
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  blackText: {
    color: 'black',
    fontSize: 24,
    marginBottom: 20,
  },
  whiteText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#10B981',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    alignItems: 'center',
  },
});