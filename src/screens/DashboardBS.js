import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DashboardBS = ({ navigation }) => {
  const sections = [
    { name: 'RECRUTARI', icon: 'clipboard-list-outline' },
    { name: 'ISTORIE', icon: 'timeline-clock-outline' },
    { name: 'CREW', icon: 'account-group-outline' },
    { name: 'TESTIMONIALE', icon: 'pencil-outline' },
    { name: 'CV TEAM', icon: 'gas-station-outline' },
    { name: 'EV TEAM', icon: 'lightning-bolt-outline' },
  ];

  return (
    <View style={styles.container}>
      {/* HEADER with BACK ARROW */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" color="white" size={30} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Dashboard BlueStreamline</Text>
      </View>

      {/* BANNER */}
      <ImageBackground 
        source={require('./assets/DIF04464.jpg')} 
        style={styles.banner}
      >
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerText}>Universitatea Transilvania din Brașov</Text>
        </View>
      </ImageBackground>

      {/* BUTTONS */}
      <View style={styles.buttonsContainer}>
        {sections.map((section, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.button} 
            onPress={() => console.log(`${section.name} pressed`)}
          >
            <Icon name={section.icon} color="white" size={30} />
            <Text style={styles.itemText}>{section.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 15,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  banner: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  bannerOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
  },
  bannerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 30,
    paddingHorizontal: 10,
    margin: 15,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    width: '42%',
    justifyContent: 'center',
  },
  itemText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'sans-serif',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
});

export default DashboardBS;