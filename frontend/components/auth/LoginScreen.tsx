import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { loginUser } from '../api';

interface LoginScreenProps {
  onBack: () => void;
  onLoginSuccess: (userId: string) => void; 
  onNavigateRegister: () => void;
}

export default function LoginScreen({ onBack, onLoginSuccess, onNavigateRegister }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const handleLogin = async () => {
    setErrorMessage(null);

    if (!email && password) {
        setErrorMessage('Bitte gib deine E-Mail-Adresse ein.');
        return;
    }
    if (email && !password) {
        setErrorMessage('Bitte gib dein Passwort ein.');
        return;
    }
    if (!email || !password) {
      setErrorMessage('Bitte fülle alle Felder aus.');
      return;
    }

    setIsLoading(true);
    try {
      const user = await loginUser(email.trim(), password);
      onLoginSuccess(user.id); 
    } catch (error) {
      setErrorMessage('Login fehlgeschlagen. Überprüfe deine E-Mail oder das Passwort.');
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
      
      <Text style={styles.title}>Anmelden</Text>
      
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
          <Button title="Anmelden" onPress={handleLogin} />
        )}
      </View>

      <Button title="Noch kein Konto? Konto erstellen" onPress={onNavigateRegister} />
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