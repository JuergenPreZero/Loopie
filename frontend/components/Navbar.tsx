import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Home01Icon, UserIcon, QrCodeIcon } from '@hugeicons/core-free-icons';

interface NavbarProps {
  activePage: number;
  setActivePage: (page: number) => void; 
}

const Navbar = ({ activePage, setActivePage }: NavbarProps) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.button} onPress={() => setActivePage(1)}>
        <HugeiconsIcon 
          icon={Home01Icon}
          size={24} 
          color={activePage === 1 ? "#2563EB" : "#6B7280"} 
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => setActivePage(2)}>
        <Text style={[styles.text, activePage === 2 && styles.activeText]}>S2</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.qrButton, activePage === 5 && styles.activeQrButton]} 
        onPress={() => setActivePage(5)}
      >
        <HugeiconsIcon 
          icon={QrCodeIcon}
          size={26} 
          color={activePage === 5 ? "#FFFFFF" : "#2563EB"} 
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => setActivePage(3)}>
        <Text style={[styles.text, activePage === 3 && styles.activeText]}>S3</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => setActivePage(4)}>
        <HugeiconsIcon 
          icon={UserIcon}
          size={24} 
          color={activePage === 4 ? "#2563EB" : "#6B7280"} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    width: '100%',
    height: 70,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeQrButton: {
    backgroundColor: '#2563EB',
  },
  text: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeText: {
    color: '#2563EB',
    fontSize: 18,
  }
});

export default Navbar;