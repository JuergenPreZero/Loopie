import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface LandingScreenProps {
  onNavigateLogin: () => void;
  onNavigateRegister: () => void;
}

export default function LandingScreen({ onNavigateLogin, onNavigateRegister }: LandingScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Willkommen bei Loopy</Text>
      
      <View style={styles.buttonContainer}>
        <Button title="Konto erstellen" onPress={onNavigateRegister} />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button title="Ich habe schon ein Konto" onPress={onNavigateLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '100%',
  }
});