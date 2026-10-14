import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from './components/Header';
import Navbar from './components/Navbar'; 
import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen'; 
import DummyPage from './components/DummyPage'; 
import LandingScreen from './components/auth/LandingScreen';
import LoginScreen from './components/auth/LoginScreen';
import RegisterScreen from './components/auth/RegisterScreen';

const USER_STORAGE_KEY = '@loopie_user_id';

export default function App() {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [authPage, setAuthPage] = useState('landing');
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSavedUser = async () => {
      try {
        const savedUserId = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (savedUserId) {
          setCurrentUserId(savedUserId);
        }
      } catch (error) {
        console.error("Fehler beim Laden des gespeicherten Nutzers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSavedUser();
  }, []);

  const handleLoginSuccess = async (userId: string, rememberMe: boolean) => {
    try {
      if (rememberMe) {
        await AsyncStorage.setItem(USER_STORAGE_KEY, userId);
      }
      setCurrentUserId(userId);
    } catch (error) {
      console.error("Fehler beim Verarbeiten des Logins:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      setCurrentUserId(null);
      setActivePage(1);
      setAuthPage('landing');
    } catch (error) {
      console.error("Fehler beim Abmelden:", error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (!currentUserId) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          {authPage === 'landing' && (
            <LandingScreen 
              onNavigateLogin={() => setAuthPage('login')} 
              onNavigateRegister={() => setAuthPage('register')} 
            />
          )}
          {authPage === 'login' && (
            <LoginScreen 
              onBack={() => setAuthPage('landing')}
              onLoginSuccess={handleLoginSuccess} 
              onNavigateRegister={() => setAuthPage('register')}
            />
          )}
          {authPage === 'register' && (
            <RegisterScreen 
              onBack={() => setAuthPage('landing')}
              onRegisterSuccess={() => setAuthPage('login')} 
              onNavigateLogin={() => setAuthPage('login')}
            />
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  const renderContent = () => {
    switch (activePage) {
      case 1: return <HomeScreen userId={currentUserId} />;
      case 2: return <DummyPage pageNumber={2} />;
      case 3: return <DummyPage pageNumber={3} />;
      case 4: return <ProfileScreen userId={currentUserId} onLogout={handleLogout} />;
      default: return <HomeScreen userId={currentUserId} />;
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Header userId={currentUserId} />
        <View style={styles.content}>
          {renderContent()}
        </View>
        <Navbar activePage={activePage} setActivePage={setActivePage} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});