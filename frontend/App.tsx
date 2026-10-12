import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Header from './components/Header';
import Navbar from './components/Navbar'; 
import HomeScreen from './components/HomeScreen';
import DummyPage from './components/DummyPage'; 
import LandingScreen from './components/auth/LandingScreen';
import LoginScreen from './components/auth/LoginScreen';
import RegisterScreen from './components/auth/RegisterScreen';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authPage, setAuthPage] = useState('landing');
  const [activePage, setActivePage] = useState(1);

  if (!isAuthenticated) {
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
              onLoginSuccess={() => setIsAuthenticated(true)} 
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
      case 1: return <HomeScreen />;
      case 2: return <DummyPage pageNumber={2} />;
      case 3: return <DummyPage pageNumber={3} />;
      case 4: return <DummyPage pageNumber={4} />;
      default: return <HomeScreen />;
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.content}>
          {renderContent()}
        </View>
        <Navbar activePage={activePage} setActivePage={setActivePage} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#F3F4F6',
  },
  content: {
    flex: 1,
  },
});