import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { getUserData } from '../../api';

interface QrScreenProps {
  userId: string;
}

interface QrUserData {
  publicId?: string;
  shortCode?: string;
}

export default function QrScreen({ userId }: QrScreenProps) {
  const [userData, setUserData] = useState<QrUserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userId) return;
        const data = await getUserData(userId);
        setUserData(data);
      } catch (error) {
        console.error("Fehler beim Laden der QR-Daten:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  const displayCode = userData?.publicId || userData?.shortCode || "LP-984211";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mein QR-Code</Text>
      <Text style={styles.subtitle}>
        Halte den Code an den Scanner der Station, um dich anzumelden.
      </Text>

      <View style={styles.qrCard}>
        <QRCode
          value={displayCode}
          size={220}
          color="#0F172A"
          backgroundColor="#FFFFFF"
        />
        <Text style={styles.codeText}>{displayCode}</Text>
      </View>

      <Text style={styles.tipText}>
        Tipp: Bildschirmhelligkeit erhöhen, falls der Scanner Schwierigkeiten hat.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  center: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
    lineHeight: 20,
  },
  qrCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  codeText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#475569',
    letterSpacing: 2,
    marginTop: 18,
  },
  tipText: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 32,
    maxWidth: 280,
  },
});