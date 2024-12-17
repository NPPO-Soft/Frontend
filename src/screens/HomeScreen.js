import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Linking,
  Image,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';

// Testimoniale
const testimonials = [
  {
    imageUri: 'https://imgur.com/TuWc1ds.png',
    name: 'TITUS CALEN',
    text: 'BlueStreamline este cea mai bună oportunitate pentru a trece prin tot procesul ingineresc, de la concepție, la proiectare, execuție si testare. Pentru mine timpul petrecut in echipa a fost foarte important pentru a-mi putea da seama ce-mi place cu adevărat si pe ce drum vreau sa merg mai departe. Pe lângă etica de muncă pe care o dezvolți în acest fel, nopțile petrecute în garaj creează cele mai faine legături cu oameni cel puțin la fel de pasionați ca tine, fiecare de domeniul lui, fiecare cu bucățica lui. Cel mai satisfăcător lucru este să vezi apoi după atâtea ore de muncă, toate bucățelele astea, aduse la viată din fier si carbon si toate cele, materializând-se într-un întreg.',
  },
  {
    imageUri: 'https://imgur.com/7zlefbb.png',
    name: 'DAN RĂDULESCU',
    text: 'Am petrecut alaturi de BSL 2 sezoane, acum multi ani. In acest timp, am invatat sa fiu independent dar in acelasi timp sa lucrez in echipa, am castigat cunostiinte si experienta practica dar si prietenii si mentori, lucruri ce mai apoi m-au ajutat in cariera mea de inginer. Placerea de a lucra alaturi de oameni pasionati ca sa ne vedem proiectul construit in fata noastra este un lucru de care imi este dor acum. Imi amintesc cu drag de timpul petrecut alaturi de colegii mei si incurajez orice student sa faca parte din acest proiect chiar si doar din purs curiozitate.',
  },
  {
    imageUri: 'https://imgur.com/cOR1mdJ.png',
    name: 'SABIN BULARDA',
    text: 'Am intrat în echipa de la Brașov cu așteptări enorme de a ajunge in Formula 1 și a face primii pași spre motorsportul international dar fara un plan exact cum ajung acolo. Dar știam că singura mea șansă era să depun efort și folosesc toate cunoștințele mele in speranța că ceva bun va reieși din asta. Și a ieșit. 10 ani mai târziu am ajuns sa lucrez in F1. Sunt sigur că experiența avută în cadrul echipei a ajutat sa ajung până aici.',
  },
];

// Evenimente
const events = [
  {
    title: 'Formula Student Poland',
    timeRemaining: { days: 0, hours: 0, minutes: 0, seconds: 0 },
  },
  {
    title: 'Formula Student Spain',
    timeRemaining: { days: 0, hours: 0, minutes: 0, seconds: 0 },
  },
  {
    title: 'Formula Student Balkans',
    timeRemaining: { days: 0, hours: 0, minutes: 0, seconds: 0 },
  },
];

const HomeScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation(); // Hook for navigation
  

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigateToTeamsScreen = () => {
    setMenuVisible(false); // Close the menu
    navigation.navigate('Team'); // Navigate to the TeamsScreen
  };

  const handleDownloadBrochure = () => {
    const url = 'https://bluestreamline.ro/wp-content/uploads/2018/03/BlueStreamline.pdf';
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  return (
    <View style={styles.container}>
      <Header
        onActionPress={toggleMenu}
        logoUri="https://i.imgur.com/AetwFtb.png"
      />

      <ScrollView>
        {/* Video Section */}
        <View style={styles.videoContainer}>
          <Image
            source={{
              uri: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWwzNjhsOWNxcnJldzYyd3Z1ajY5amc3cDZ4ZjF6YWk2ajhqbWszdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hRFKHQw9t4qBC9W05b/giphy-downsized-large.gif',
            }}
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
            <TouchableOpacity
              onPress={handleDownloadBrochure}
              style={styles.downloadButton}
            >
              <Text style={styles.downloadButtonText}>DESCARCĂ BROȘURA</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Evenimente Section */}
        <View style={styles.eventsContainer}>
          <Text style={styles.eventsTitle}>Evenimente</Text>
          {events.map((event, index) => (
            <View key={index} style={styles.eventCard}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <View style={styles.timeRemainingContainer}>
                <View style={styles.timeUnit}>
                  <Text style={styles.timeValue}>{event.timeRemaining.days}</Text>
                  <Text style={styles.timeLabel}>Z</Text>
                </View>
                <View style={styles.timeUnit}>
                  <Text style={styles.timeValue}>{event.timeRemaining.hours}</Text>
                  <Text style={styles.timeLabel}>O</Text>
                </View>
                <View style={styles.timeUnit}>
                  <Text style={styles.timeValue}>{event.timeRemaining.minutes}</Text>
                  <Text style={styles.timeLabel}>M</Text>
                </View>
                <View style={styles.timeUnit}>
                  <Text style={styles.timeValue}>{event.timeRemaining.seconds}</Text>
                  <Text style={styles.timeLabel}>S</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Testimonials Section */}
        <View style={styles.testimonialsContainer}>
          <Text style={styles.testimonialsTitle}>Testimoniale</Text>
          {testimonials.map((testimonial, index) => {
            const [expanded, setExpanded] = useState(false);
            const toggleExpand = () => setExpanded(!expanded);

            return (
              <View key={index} style={styles.testimonialCard}>
                <Image
                  source={{ uri: testimonial.imageUri }}
                  style={styles.testimonialImage}
                />
                <Text style={styles.testimonialName}>{testimonial.name}</Text>
                <Text style={styles.testimonialText}>
                  {expanded ? testimonial.text : `${testimonial.text.substring(0, 135)}...`}
                </Text>
                <TouchableOpacity onPress={toggleExpand} style={styles.readMoreButton}>
                  <Text style={styles.readMoreButtonText}>
                    {expanded ? 'Ascunde' : 'Citește mai mult'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Modal */}
      {/* Modal */}
      <Modal visible={menuVisible} transparent animationType="slide">
        <View style={styles.menu}>
          <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
            <Text style={styles.closeMenu}>×</Text>
          </TouchableOpacity>
          <View style={styles.menuItemsContainer}>
            {['Acasa', 'Istoric', 'Echipa', 'Formula SAE', 'Parteneri', 'Contact'].map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.menuItemCard}
                onPress={item === 'Echipa' ? navigateToTeamsScreen : null} // Only navigate for 'Echipa'
              >
                <Text style={styles.menuItem}>{item}</Text>
              </TouchableOpacity>
            ))}
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
  eventsContainer: {
    padding: 20,
  },
  eventsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bb5',
    textAlign: 'center',
    marginBottom: 15,
  },
  eventCard: {
    backgroundColor: '#007bb5',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  timeRemainingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timeUnit: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  timeValue: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  timeLabel: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  testimonialsContainer: {
    padding: 20,
  },
  testimonialsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bb5',
    textAlign: 'center',
    marginBottom: 15,
  },
  testimonialCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  testimonialImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  testimonialName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bb5',
    marginBottom: 5,
  },
  testimonialText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  readMoreButton: {
    marginTop: 10,
  },
  readMoreButtonText: {
    color: '#007bb5',
    fontWeight: 'bold',
  },
  menu: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
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

export default HomeScreen;
