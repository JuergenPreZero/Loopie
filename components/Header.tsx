import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

const Header = () => {
  return (
    <>
      <StatusBar backgroundColor="#2563EB" barStyle="light-content" />
      <View style={styles.header} />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#2563EB',
  },
});

export default Header;