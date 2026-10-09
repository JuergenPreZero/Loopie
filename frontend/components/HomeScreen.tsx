import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const [number, setNumber] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.blackText}>Menge: {number}</Text>
      <TouchableOpacity style={styles.button} onPress={() => setNumber(number + 1)}>
        <Text style={styles.whiteText}>+1</Text>
      </TouchableOpacity>
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