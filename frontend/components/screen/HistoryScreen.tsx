import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HistoryScreenProps {
  userId: string;
}

export default function HistoryScreen({ userId }: HistoryScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Verlauf</Text>
        <Text style={styles.subtitle}>
          Übersicht deiner bisherigen Abgaben und Pfand-Gutschriften.
        </Text>
      </View>

      <View style={styles.placeholderContainer}>
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Noch keine Abgaben</Text>
          <Text style={styles.emptySubtitle}>
            Sobald du Flaschen oder Dosen an einer Station einwirfst, erscheinen sie hier im Verlauf.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  placeholderContainer: {
    flex: 1,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    marginTop: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 18,
  },
});