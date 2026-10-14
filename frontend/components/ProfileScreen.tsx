import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { getUserData, deleteAccount } from '../api'; // deleteAccount muss in der api.ts existieren

interface ProfileScreenProps {
  userId: string;
  onLogout: () => void;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
}

export default function ProfileScreen({ userId, onLogout }: ProfileScreenProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserData(userId);
        setUser(data);
      } catch (error) {
        console.error("Fehler beim Laden des Profils:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const confirmAndDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteAccount(userId); 
      onLogout();
    } catch (error) {
      console.error("Fehler beim Löschen des Accounts:", error);
      alert("Konto konnte nicht gelöscht werden.");
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.text}>{user?.firstName} {user?.lastName}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>E-Mail:</Text>
        <Text style={styles.text}>{user?.email}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Nutzer-ID:</Text>
        <Text style={styles.text}>{userId}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Abmelden" onPress={onLogout} color="#DC2626" />
      </View>

      <View style={styles.deleteArea}>
        {!showConfirm ? (
          <TouchableOpacity onPress={() => setShowConfirm(true)}>
            <Text style={styles.deleteText}>Konto löschen</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.confirmBox}>
            <Text style={styles.confirmText}>Account unwiderruflich löschen?</Text>
            {isDeleting ? (
              <ActivityIndicator size="small" color="#DC2626" />
            ) : (
              <View style={styles.confirmButtons}>
                <Button title="Ja, löschen" onPress={confirmAndDelete} color="#DC2626" />
                <View style={{ width: 10 }} />
                <Button title="Abbrechen" onPress={() => setShowConfirm(false)} color="#6B7280" />
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    justifyContent: 'center' 
  },
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20,
    textAlign: 'center'
  },
  infoBox: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    marginBottom: 15, 
    borderRadius: 5,
    backgroundColor: '#fff'
  },
  label: { 
    fontWeight: 'bold', 
    marginBottom: 5,
    fontSize: 12,
    color: '#666'
  },
  text: { 
    fontSize: 16 
  },
  buttonContainer: { 
    marginTop: 20 
  },
  deleteArea: {
    marginTop: 30,
    alignItems: 'center',
  },
  deleteText: {
    color: '#6B7280',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  confirmBox: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#DC2626',
    borderRadius: 8,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    width: '100%',
  },
  confirmText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 15,
  },
  confirmButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});