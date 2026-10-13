import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { registerUser } from '../api';

interface RegisterScreenProps {
  onBack: () => void;
  onRegisterSuccess: () => void;
  onNavigateLogin: () => void;
}

export default function RegisterScreen({ onBack, onRegisterSuccess, onNavigateLogin }: RegisterScreenProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegister = async () => {
    setErrorMessage(null); 

    const nameParts = fullName.trim().split(/\s+/);
    if (nameParts.length !== 2) {
      setErrorMessage('Bitte gib genau einen Vornamen und einen Nachnamen ein.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }

    if (password.length < 8){
        setErrorMessage('Passwort muss mindestens 8 Zeichen lang sein.')
        return;
    }

    const [firstName, lastName] = nameParts;

    setIsLoading(true);
    try {
      await registerUser(firstName, lastName, email, password);
      onRegisterSuccess();
    } catch (error) {
      setErrorMessage('Registrierung fehlgeschlagen. E-Mail existiert bereits.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButton}>
        <Button title="Zurück" onPress={onBack} />
      </View>
      
      <Text style={styles.title}>Konto erstellen</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Vor- und Nachname" 
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput 
        style={styles.input} 
        placeholder="E-Mail" 
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Passwort" 
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#2563EB" />
        ) : (
          <Button title="Registrieren" onPress={handleRegister} />
        )}
      </View>

      <Button title="Schon registriert? Anmelden" onPress={onNavigateLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  backButton: { alignSelf: 'flex-start', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
  buttonContainer: { marginBottom: 20 },
  errorText: { color: 'red', marginBottom: 15, textAlign: 'center', fontWeight: '500' }
});