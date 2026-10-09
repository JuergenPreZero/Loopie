import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
interface NavbarProps {
  activePage: number;
  setActivePage: (page: number) => void; 
}

const Navbar = ({ activePage, setActivePage }: NavbarProps) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.button} onPress={() => setActivePage(1)}>
        <Text style={[styles.text, activePage === 1 && styles.activeText]}>S1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setActivePage(2)}>
        <Text style={[styles.text, activePage === 2 && styles.activeText]}>S2</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => setActivePage(3)}>
        <Text style={[styles.text, activePage === 3 && styles.activeText]}>S3</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => setActivePage(4)}>
        <Text style={[styles.text, activePage === 4 && styles.activeText]}>S4</Text>
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
