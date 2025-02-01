import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const DashboardBS = ({ navigation }) => {
  const sections = [
    { name: 'RECRUTARI', icon: 'clipboard-list-outline', screen: 'RecruitsBS' },
    { name: 'ISTORIE', icon: 'timeline-clock-outline', screen: 'HistoryBS' },
    { name: 'CREW', icon: 'account-group-outline', screen: 'CrewBS' },
    { name: 'TESTIMONIALE', icon: 'pencil-outline', screen: 'TestimonialsBS' },
    { name: 'CV TEAM', icon: 'gas-station-outline' },
    { name: 'EV TEAM', icon: 'lightning-bolt-outline' },
  ];

  return (
    <View style={styles.container}>
      {/* HEADER with BACK ARROW */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" color="white" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Dashboard BlueStreamline</Text>
      </View>

      {/* BANNER */}
      <ImageBackground 
        source={require('./assets/DIF04464.jpg')} 
        style={styles.banner}
        imageStyle={styles.bannerImage}
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
            onPress={() => navigation.navigate(section.screen)} // Dynamically navigate to the corresponding screen
          >
            <View style={styles.iconContainer}>
              <Icon name={section.icon} color="white" size={25} style={styles.iconStyle} />
            </View>
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
    backgroundColor: '#121212',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 70, 
    paddingHorizontal: 20,
    width: '100%',
  },
  backButton: {
    padding: 5,
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    marginTop: 10, 
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginTop: 10,
  },
  banner: {
    width: width * 0.9,
    height: 180,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 20,
  },
  bannerImage: {
    resizeMode: 'cover',
  },
  bannerOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 25,
    width: '95%',
  },
  button: {
    backgroundColor: '#1E1E1E',
    width: '48%', 
    paddingVertical: 28, 
    marginVertical: 5, 
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: '#121212', 
    borderRadius: 15, 
    padding: 12,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    marginBottom: 0,
  },
  itemText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default DashboardBS;