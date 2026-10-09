import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DummyPageProps {
  pageNumber: number;
}

export default function DummyPage({ pageNumber }: DummyPageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Seite {pageNumber}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#374151',
  },
});