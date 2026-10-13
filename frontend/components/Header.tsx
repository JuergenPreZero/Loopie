import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { fetchUserBalance } from './api';

interface HeadProps {
  userId:string
}

const Header = ({userId}: HeadProps) => {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const loadBalance = async () => {
      try {
        const fetchedBalance = await fetchUserBalance(userId);
        setBalance(fetchedBalance);
      } catch (error) {
        console.error("Fehler beim Laden des Guthabens:", error);
      }
    };

    loadBalance();

    const interval = setInterval(() => {
      loadBalance();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formattedBalance = `${balance.toFixed(2).replace('.', ',')} €`;

  return (
    <>
      <StatusBar backgroundColor="#2563EB" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.balanceText}>{formattedBalance}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;