import React, { useRef } from 'react';
import { View, Text, Image, FlatList, Dimensions, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

const originalData = [
  { id: '1', name: 'BS 09', undername: 'INCEPUTUL', image: require('./assets/BS09.png') },
  { id: '2', name: 'BS 10', undername: 'EVOLUTIE', image: require('./assets/BS10.png') },
  { id: '3', name: 'BS 11', undername: 'BLUESTREAMLINE PE PODIUM', image: require('./assets/BS11.png') },
  { id: '4', name: 'BS 12', undername: 'TRASNFORMARE', image: require('./assets/BS12.png') },
  { id: '5', name: 'BS 13', undername: 'SCHIMBARE DE GENERATIE', image: require('./assets/BS13.png') },
  { id: '6', name: 'BS 14', undername: 'O NOUA PROVOCARE', image: require('./assets/BS14.png') },
  { id: '7', name: 'BS 15', undername: '7 ANI DE PASIUNE', image: require('./assets/BS15.png') },
  { id: '8', name: 'BS 16', undername: 'PROMPTIDUINE', image: require('./assets/BS16.png') },
  { id: '9', name: 'BS 17', undername: 'ERA TURBO', image: require('./assets/BS17.png') },
  { id: '10', name: 'BS 18', undername: 'UN DECENIU DE CURSE', image: require('./assets/BS18.png') },
  { id: '11', name: 'BS 19', undername: 'A DOUA DECADA', image: require('./assets/BS19.png') },
  { id: '12', name: 'BS 20/21', undername: 'ANUL FIABILITATII', image: require('./assets/BS20_21.png') },
  { id: '13', name: 'BS 22', undername: 'IN CAUTAREA FERICIRII', image: require('./assets/BS22.png') },
  { id: '14', name: 'BS 23', undername: '15 YEARS OF SPEED - THE TRIPLE CROWN', image: require('./assets/BS23.png') },
  { id: '15', name: 'BS 24', undername: '', image: require('./assets/BS24.png') },
  { id: '16', name: 'BS 25', undername: 'Inceputul', image: require('./assets/BS25.png') },
];

const createInfiniteData = () => {
  const data = [];
  for (let i = 0; i < 10000; i++) {
    const index = i % originalData.length; // Ensures correct cycling of items
    data.push({ ...originalData[index], uniqueId: `${i}` });
  }
  return data;
};

const infiniteData = createInfiniteData();
const totalItems = originalData.length;
const initialIndex = 5000 - (5000 % totalItems); // Ensures the starting point is a multiple of totalItems

const HistoryBS = () => {
  const flatListRef = useRef(null);

  const handleScrollEnd = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const newIndex = Math.floor(contentOffset / viewSize);

    if (newIndex < totalItems || newIndex > 10000 - totalItems) {
      flatListRef.current.scrollToIndex({ index: initialIndex, animated: false });
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.cardText}>{item.name}</Text> 
      <Text style={styles.cardUnderText}>{item.undername}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
        <Text style={styles.header}>Istoria echipei</Text>
        <View style={styles.separator} />
        
        {/* FlatList section remains fixed */}
        <FlatList
          ref={flatListRef}
          data={infiniteData}
          renderItem={renderItem}
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
        />

        {/* Scrollable container only for the content below */}
        <View style={styles.contentContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <TouchableOpacity style={styles.button}>
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
  header: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 0,
    textAlign: 'center',
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
  },
  cardUnderText: {
    color: 'white',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center', 
    marginTop: 5,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    marginTop: -450, // Creates space between FlatList and button content
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
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
  },
  contentText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
});

export default HistoryBS;
