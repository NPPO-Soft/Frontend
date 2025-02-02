import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const originalTestimonialsData = [
  {
    id: '1',
    name: 'DAN RADULESCU',
    text: 'Am petrecut alaturi de BSL 2 sezoane, acum multi ani. In acest timp, am invatat sa fiu independent dar in acelasi timp sa lucrez in echipa, am castigat cunostiinte si experienta practica dar si prietenii si mentori, lucruri ce mai apoi m-au ajutat in cariera mea de inginer. Placerea de a lucra alaturi de oameni pasionati ca sa ne vedem proiectul construit in fata noastra este un lucru de care imi este dor acum. Imi amintesc cu drag de timpul petrecut alaturi de colegii mei si incurajez orice student sa faca parte din acest proiect chiar si doar din purs curiozitate.',
    image: require('./assets/dan.png'),  
  },
  {
    id: '2',
    name: 'SABIN BULARDA',
    text: 'Am intrat în echipa de la Brașov cu așteptări enorme de a ajunge in Formula 1 și a face primii pași spre motorsportul international dar fara un plan exact cum ajung acolo. Dar știam că singura mea șansă era să depun efort și folosesc toate cunoștințele mele in speranța că ceva bun va reieși din asta. Și a ieșit. 10 ani mai târziu am ajuns sa lucrez in F1. Sunt sigur că experiența avută în cadrul echipei a ajutat sa ajung până aici.',
    image: require('./assets/sabin.png'),  
  },
  {
    id: '3',
    name: 'TITUS CALEN',
    text: 'BlueStreamline este cea mai bună oportunitate pentru a trece prin tot procesul ingineresc, de la concepție, la proiectare, execuție si testare. Pentru mine timpul petrecut in echipa a fost foarte important pentru a-mi putea da seama ce-mi place cu adevărat si pe ce drum vreau sa merg mai departe. Pe lângă etica de muncă pe care o dezvolți în acest fel, nopțile petrecute în garaj creează cele mai faine legături cu oameni cel puțin la fel de pasionați ca tine, fiecare de domeniul lui, fiecare cu bucățica lui. Cel mai satisfăcător lucru este să vezi apoi după atâtea ore de muncă, toate bucățelele astea, aduse la viată din fier si carbon si toate cele, materializând-se într-un întreg.',
    image: require('./assets/titus.png'),  
  },
];

const createInfiniteData = () => {
  const data = [];
  for (let i = 0; i < 10000; i++) {
    data.push({ ...originalTestimonialsData[i % originalTestimonialsData.length], uniqueId: `${i}` });
  }
  return data;
};

const testimonialsData = createInfiniteData();

const TestimonialsBS = ({ navigation }) => {
  const flatListRef = useRef(null);
  const initialIndex = 5000;
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    const initialOriginalIndex = initialIndex % originalTestimonialsData.length;
    setCurrentText(originalTestimonialsData[initialOriginalIndex].text);
  }, []);

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const visibleItem = viewableItems[0];
      const originalIndex = visibleItem.index % originalTestimonialsData.length;
      setCurrentText(originalTestimonialsData[originalIndex].text);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const handleScrollEnd = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const newIndex = Math.floor(contentOffset / viewSize);

    if (newIndex < 100 || newIndex > 9900) {
      flatListRef.current.scrollToIndex({ index: initialIndex, animated: false });
    }
  };

  const renderTestimonial = ({ item }) => (
    <View style={styles.testimonialCard}>
      <Image source={item.image} style={styles.profileImage} />
      <Text style={styles.testimonialName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" color="white" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Testimoniale</Text>
      </View>

      <View style={styles.testimonialsCarousel}>
        <FlatList
          ref={flatListRef}
          data={testimonialsData}
          renderItem={renderTestimonial}
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
      </View>

      <View style={styles.customButtonContainer}>
        <ScrollView style={styles.customButtonScroll}>
          <Text style={styles.customButtonText}>
            {currentText}
          </Text>
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
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginRight: 35,
  },
  testimonialsCarousel: {
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  testimonialCard: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 15,
    width: width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 30,
    marginBottom: 15,
  },
  testimonialName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  customButtonContainer: {
    backgroundColor: '#1F1F1F',
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
    width: width * 0.9,
    height: 430,
  },
  customButtonScroll: {
    flex: 1,
  },
  customButtonText: {
    color: 'white',
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'center',
    marginHorizontal: 5, 
  },
});

export default TestimonialsBS;
