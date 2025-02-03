import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, FlatList, Dimensions, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { API_BASE_URL } from '../../config';

const { width } = Dimensions.get('window');

const HistoryBS = ({ navigation }) => {
  const flatListRef = useRef(null);
  const initialIndex = 4688; // Start at a middle index for infinite scrolling
  const [history, setHistory] = useState([]);
  const [currentText, setCurrentText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      fetchHistory();
  }, []);

  const fetchHistory = async () => {
      try {
          const response = await fetch(`${API_BASE_URL}/api/history`);
          const result = await response.json();

          if (response.ok && result.history.length > 0) {
              // Create an infinite scrolling effect by repeating the history
              const repeatedData = [];
              for (let i = 0; i < 10000; i++) {
                  repeatedData.push({
                      ...result.history[i % result.history.length],
                      uniqueId: `${i}`
                  });
              }

              setHistory(repeatedData);
              setCurrentText(result.history[0].text);
          } else {
              console.error("Error fetching history:", result.message);
          }
      } catch (error) {
          console.error("Error fetching history:", error);
      } finally {
          setLoading(false);
      }
  };

  const onViewRef = useRef(({ viewableItems }) => {
      if (viewableItems.length > 0) {
          setCurrentText(viewableItems[0].item.text);
      }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const handleScrollEnd = (event) => {
      const contentOffset = event.nativeEvent.contentOffset.x;
      const viewSize = event.nativeEvent.layoutMeasurement.width;
      const newIndex = Math.floor(contentOffset / viewSize);

      // Loop the scroll to the middle when reaching edges
      if (newIndex < 100 || newIndex > 9900) {
          flatListRef.current.scrollToIndex({ index: initialIndex, animated: false });
      }
  };

  const renderHistory = ({ item }) => (
      <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.cardText}>{item.car_name}</Text> 
          <Text style={styles.cardUnderText}>{item.title}</Text>
      </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Back Button */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <View style={styles.arrowContainer}>
              <Icon name="arrow-left" color="white" size={25} />
            </View>
          </TouchableOpacity>
            <Text style={styles.header}>Istoria echipei</Text>
      </View>
    <View style={styles.separator} />
      
      
      {/* FlatList */}
      <FlatList
                            ref={flatListRef}
                            data={history}
                            renderItem={renderHistory}
                            keyExtractor={(item) => item.uniqueId}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onMomentumScrollEnd={handleScrollEnd}
                            snapToInterval={width * 0.8 + 20}
                            snapToAlignment="center"
                            decelerationRate="fast"
                            initialScrollIndex={initialIndex}
                            getItemLayout={(data, index) => ({
                                length: width * 0.8 + 20,
                                offset: (width * 0.8 + 20) * index,
                                index,
                            })}
                            onViewableItemsChanged={onViewRef.current}
                            viewabilityConfig={viewConfigRef.current}
                        />

      {/* Content */}
      <View style={styles.contentContainer}>
  <ScrollView contentContainerStyle={styles.scrollContainer}>
    <TouchableOpacity style={styles.button} activeOpacity={1}>
      <Text style={styles.buttonText}>Formula Student</Text>
              <Text style={styles.contentText}>Formula Student este cea mai prestigioasa competitie inginereasca universitara dedicata constructiei de monoposturi de curse. Scopul sau este sa ofere studentilor experienta practica in proiectarea, fabricarea si testarea unui vehicul de competitie, combinand teoria cu aplicabilitatea in industrie.</Text>
              <Text style={styles.buttonText}>Echipa BlueStreamline</Text>
              <Text style={styles.contentText}>Fondata in 2008 la Universitatea Transilvania din Brasov, BlueStreamline este prima echipa din Romania care a participat la Formula Student. De-a lungul anilor, echipa a concurat pe circuite renumite precum Silverstone, Catalunya si Varano de Melegari, castigand multiple titluri si stabilind recorduri remarcabile.</Text>
              <Text style={styles.buttonText}>Anul 2025 - Un nou capitol</Text>
              <Text style={styles.contentText}>Pentru sezonul 2025, BlueStreamline isi propune o noua provocare majora: dezvoltarea primului monopost electric din istoria echipei, alaturi de un nou monopost cu combustie. Acest pas marcheaza o tranzitie importanta spre sustenabilitate si inovatie, consolidand pozitia echipei in competitiile internationale.</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 15,
  },
  header: {
    flex: 0.90, 
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: "UT-Sans",
  },
  separator: {
    width: '80%',
    height: 1,
    backgroundColor: '#444',
    marginVertical: 15,
  },
  card: {
    backgroundColor: '#1E1E1E',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    width: width * 0.8,
    marginHorizontal: 10,
    elevation: 5,
    flexDirection: 'column', // Ensures a vertical stack
    height: 230,
  },
  image: {
    width: 200,
    height: 120,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  cardText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10, // Pushes text below the image
    textAlign: 'center',
    fontFamily: "UT-Sans",
  },
  cardUnderText: {
    color: 'white',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center', 
    marginTop: 5,
    fontFamily: "UT-Sans",
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    marginTop: -450, // Creates space between FlatList and button content
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1, // Ensures content is scrollable but doesn't exceed bounds
    paddingBottom: 20,
    paddingTop: 20,
  },
  button: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    width: '100%',
    padding: 15,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
    fontFamily: "UT-Sans",
  },
  contentText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    fontFamily: "UT-Sans",
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: 'white', // Ensuring the arrow is visible
    textAlign: 'center',
    fontFamily: "UT-Sans",
  },
  arrowContainer: {
    backgroundColor: '#1E1E1E', // Dark container for the arrow
    borderRadius: 12, // Rounded edges for aesthetics
    padding: 10, // Padding to make it spacious
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HistoryBS;