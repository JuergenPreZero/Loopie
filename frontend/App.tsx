import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './components/Header';
import Navbar from './components/Navbar'; 
import HomeScreen from './components/HomeScreen';
import DummyPage from './components/DummyPage'; 

export default function App() {
  const [activePage, setActivePage] = useState(1);

  const renderContent = () => {
    switch (activePage) {
      case 1:
        return <HomeScreen />;
      case 2:
        return <DummyPage pageNumber={2} />;
      case 3:
        return <DummyPage pageNumber={3} />;
      case 4:
        return <DummyPage pageNumber={4} />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      
      <View style={styles.content}>
        {renderContent()}
      </View>
      <Navbar activePage={activePage} setActivePage={setActivePage} />
    </View>
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