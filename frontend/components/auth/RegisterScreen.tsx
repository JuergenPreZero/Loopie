import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { registerUser } from '../../api';
import { validator } from '../auth/UserValidator';

interface RegisterScreenProps {
  onBack: () => void;
  onRegisterSuccess: () => void;
  onNavigateLogin: () => void;
}

export default function RegisterScreen({ onBack, onRegisterSuccess, onNavigateLogin }: RegisterScreenProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegister = async () => {
    setErrorMessage(null);

    // Einheitliche Prüfung über dieselbe Validator-Instanz
    const error =
      validator.validateName(firstName, 'Vorname') ||
      validator.validateName(lastName, 'Nachname') ||
      validator.validateEmail(email) ||
      validator.validatePassword(password);

    if (error) {
      setErrorMessage(error);
      return;
    }

    setIsLoading(true);
    try {
      await registerUser(firstName.trim(), lastName.trim(), email.trim().toLowerCase(), password);
      onRegisterSuccess();
    } catch (err) {
      setErrorMessage('Registrierung fehlgeschlagen. E-Mail existiert bereits.');
      console.error(err);
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
        placeholder="Vorname"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nachname"
        value={lastName}
        onChangeText={setLastName}
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
  errorText: { color: 'red', marginBottom: 15, textAlign: 'center', fontWeight: '500' },
});