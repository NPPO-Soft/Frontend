import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Array with button names
const buttonNames = [
  'BS 09', 'BS 10', 'BS 11', 'BS 12', 'BS 13', 'BS 14', 'BS 15', 'BS 16',
  'BS 17', 'BS 18', 'BS 19', 'BS 20/21', 'BS 22', 'BS 23', 'BS 24', 'BS 25'
];

// Define the image URLs or local paths
const images = {
  'BS 09': require('./assets/BS09.png'),
  'BS 10': require('./assets/BS10.png'),
  'BS 11': require('./assets/BS11.png'),
  'BS 12': require('./assets/BS12.png'),
  'BS 13': require('./assets/BS13.png'),
  'BS 14': require('./assets/BS14.png'),
  'BS 15': require('./assets/BS15.png'),
  'BS 16': require('./assets/BS16.png'),
  'BS 17': require('./assets/BS17.png'),
  'BS 18': require('./assets/BS18.png'),
  'BS 19': require('./assets/BS19.png'),
  'BS 20/21': require('./assets/BS20_21.png'),
  'BS 22': require('./assets/BS22.png'),
  'BS 23': require('./assets/BS23.png'),
  'BS 24': require('./assets/BS24.png'),
  'BS 25': require('./assets/BS25.png'),
};

const HistoryBS = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Hardcoded content of history.txt without diacritics
  const fileText = `Formula Student

Formula Student este cea mai prestigioasa competitie inginereasca universitara dedicata constructiei de monoposturi de curse. Scopul sau este sa ofere studentilor experienta practica in proiectarea, fabricarea si testarea unui vehicul de competitie, combinand teoria cu aplicabilitatea in industrie.

Echipa BlueStreamline

Fondata in 2008 la Universitatea Transilvania din Brasov, BlueStreamline este prima echipa din Romania care a participat la Formula Student. De-a lungul anilor, echipa a concurat pe circuite renumite precum Silverstone, Catalunya si Varano de Melegari, castigand multiple titluri si stabilind recorduri remarcabile.

Anul 2025 - Un nou capitol

Pentru sezonul 2025, BlueStreamline isi propune o noua provocare majora: dezvoltarea primului monopost electric din istoria echipei, alaturi de un nou monopost cu combustie. Acest pas marcheaza o tranzitie importanta spre sustenabilitate si inovatie, consolidand pozitia echipei in competitiile internationale.`;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === buttonNames.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? buttonNames.length - 1 : prevIndex - 1));
  };

  // Function to format text with centered and bold titles
  const formatText = (text) => {
    const parts = text.split('\n');
    return parts.map((line, index) => {
      if (line === 'Formula Student' || line === 'Echipa BlueStreamline' || line === 'Anul 2025 - Un nou capitol') {
        return (
          <Text key={index} style={styles.chapterTitle}>{line}</Text>
        );
      }
      return (
        <Text key={index} style={styles.contentText}>{line}</Text>
      );
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Istoria echipei</Text>

      {/* Separator under Header */}
      <View style={styles.separator} />

      {/* Navigation Arrows & Dynamic Button */}
      <View style={styles.arrowContainer}>
        <TouchableOpacity onPress={handlePrev} style={styles.arrowButton}>
          <Icon name="arrow-left-bold" size={40} color={'white'} />
        </TouchableOpacity>

        {/* Dynamic Button that Changes */}
        <TouchableOpacity style={styles.carBS}>
          <Text style={styles.buttonText}>{buttonNames[currentIndex]}</Text>
          <Image source={images[buttonNames[currentIndex]]} style={styles.buttonImage} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
          <Icon name="arrow-right-bold" size={40} color={'white'} />
        </TouchableOpacity>
      </View>

      {/* View with Scrollable Text */}
      <View style={styles.textContainer}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} nestedScrollEnabled={true}>
          {formatText(fileText)}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 20,
  },
  header: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 70,
    textAlign: 'center',
  },
  separator: {
    width: '80%',
    height: 1,
    backgroundColor: '#333',
    marginVertical: 20, // Space around the separator
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  arrowButton: {
    padding: 1,
    marginBottom: 10,
  },
  carBS: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    marginVertical: 10,
    marginTop: 10,
  },
  textContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    width: '90%', 
    height: 430, // Keeps a fixed height for scroll area
    padding: 10,
  },
  scrollView: {
    flex: 1, // Ensure the ScrollView takes up the full height of textContainer
  },
  scrollContent: {
    flexGrow: 1, // Ensures scrolling inside the container
    paddingHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  buttonImage: {
    width: 200, // Adjusted width
    height: 120, // Adjusted height
    marginTop: 10,
    borderRadius: 15, // Rounded corners
    borderWidth: 2, // Border for better visibility
    borderColor: '#333', // Dark border to match the background
    shadowColor: '#000', // Add shadow
    shadowOffset: { width: 0, height: 5 }, // Shadow position
    shadowOpacity: 0.3, // Transparency of the shadow
    shadowRadius: 5, // Radius of shadow spread
    elevation: 5, // For Android shadow
  },
  contentText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
  },
  chapterTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default HistoryBS;
