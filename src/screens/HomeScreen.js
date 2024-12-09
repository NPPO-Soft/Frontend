import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Linking, Image } from 'react-native';

const App = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleDownloadBrochure = () => {
    const url = 'https://bluestreamline.ro/wp-content/uploads/2018/03/BlueStreamline.pdf';
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://i.imgur.com/AetwFtb.png' }} style={styles.logo} />
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>☰</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.videoContainer}>
        <Image
          source={{ uri: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWwzNjhsOWNxcnJldzYyd3Z1ajY5amc3cDZ4ZjF6YWk2ajhqbWszdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hRFKHQw9t4qBC9W05b/giphy-downsized-large.gif' }}
          style={styles.gif}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>PASIUNE MUNCĂ RĂSPLATĂ</Text>
          <Text style={styles.descriptionText}>
            BlueStreamline a luat ființă în 2008 ca inițiativă a studenților din cadrul Universității
            Transilvania din Brașov, având drept scop crearea și dezvoltarea unei mașini de curse
            pentru evenimentele de tip Formula Student.
          </Text>
          <TouchableOpacity onPress={handleDownloadBrochure} style={styles.downloadButton}>
            <Text style={styles.downloadButtonText}>DESCARCĂ BROȘURA</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={menuVisible} transparent animationType="slide">
        <View style={styles.menu}>
          <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
            <Text style={styles.closeMenu}>×</Text>
          </TouchableOpacity>
          <View style={styles.menuItemsContainer}>
            <TouchableOpacity style={styles.menuItemCard} onPress={() => console.log('Acasa')}>
              <Text style={styles.menuItem}>Acasa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItemCard} onPress={() => console.log('Istoric')}>
              <Text style={styles.menuItem}>Istoric</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItemCard} onPress={() => console.log('Echipa')}>
              <Text style={styles.menuItem}>Echipa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItemCard} onPress={() => console.log('Formula SAE')}>
              <Text style={styles.menuItem}>Formula SAE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItemCard} onPress={() => console.log('Parteneri')}>
              <Text style={styles.menuItem}>Parteneri</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItemCard} onPress={() => console.log('Contact')}>
              <Text style={styles.menuItem}>Contact</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 170,
    height: 55,
    resizeMode: 'contain',
  },
  menuButton: {
    padding: 8,
    backgroundColor: '#007bb5',
    borderRadius: 50,
  },
  menuButtonText: {
    color: '#ffffff',
    fontSize: 24,
  },
  videoContainer: {
    position: 'relative',
    height: 300,
    width: '100%',
  },
  gif: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
  },
  overlayText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  descriptionText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  downloadButton: {
    backgroundColor: '#007bb5',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    elevation: 3,
  },
  downloadButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menu: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
  },
  closeMenu: {
    fontSize: 30,
    color: '#007bb5',
  },
  menuItemsContainer: {
    alignItems: 'center',
    width: '100%',
  },
  menuItemCard: {
    backgroundColor: '#007bb5',
    borderRadius: 10,
    marginVertical: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  menuItem: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default App;