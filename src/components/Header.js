import React from 'react';
import { SafeAreaView, View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Header = ({ onActionPress, logoUri }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image source={{ uri: logoUri }} style={styles.logo} />
        <TouchableOpacity onPress={onActionPress} style={styles.actionButton}>
          <Text style={styles.actionButtonText}>☰</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#ffffff', // Asigură-te că se potrivește cu fundalul headerului.
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    width: 170,
    height: 55,
    resizeMode: 'contain',
  },
  actionButton: {
    padding: 10,
    backgroundColor: '#007bb5',
    borderRadius: 50,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 24,
  },
});

export default Header;
