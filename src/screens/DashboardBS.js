import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions, ScrollView, Animated, Easing } from 'react-native';
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

  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const events = ['Formula Student Poland', 'Formula Student Balkans', 'Formula Student Spain'];

  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const posts = [
    'Aceasta este o postare pe Facebook. Haideți să susținem echipa noastră la Formula Student!',
    'Aceasta este o postare pe Instagram. Vibes de neuitat la Formula Student!'
  ];

  const eventAnim = useRef(new Animated.Value(0)).current;
  const postAnim = useRef(new Animated.Value(0)).current;

  const changeEventWithAnimation = (newIndex) => {
    Animated.timing(eventAnim, {
      toValue: -width * 0.5,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setCurrentEventIndex(newIndex);
      eventAnim.setValue(width);
      Animated.timing(eventAnim, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    });
  };

  const changePostWithAnimation = (newIndex) => {
    Animated.timing(postAnim, {
      toValue: -width * 0.5,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setCurrentPostIndex(newIndex);
      postAnim.setValue(width);
      Animated.timing(postAnim, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    });
  };

  useEffect(() => {
    const eventInterval = setInterval(() => {
      const newIndex = (currentEventIndex + 1) % events.length;
      changeEventWithAnimation(newIndex);
    }, 5000);
    return () => clearInterval(eventInterval);
  }, [currentEventIndex]);

  useEffect(() => {
    const postInterval = setInterval(() => {
      const newIndex = (currentPostIndex + 1) % posts.length;
      changePostWithAnimation(newIndex);
    }, 7000);
    return () => clearInterval(postInterval);
  }, [currentPostIndex]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" color="white" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Dashboard BlueStreamline</Text>
      </View>

      <ImageBackground 
        source={require('./assets/DIF04464.jpg')} 
        style={styles.banner}
        imageStyle={styles.bannerImage}
      >
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerText}>Universitatea Transilvania din Brașov</Text>
        </View>
      </ImageBackground>

      <View style={styles.buttonsContainer}>
        {sections.map((section, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.button} 
            onPress={() => navigation.navigate(section.screen)}
          >
            <View style={styles.iconContainer}>
              <Icon name={section.icon} color="white" size={25} style={styles.iconStyle} />
            </View>
            <Text style={styles.itemText}>{section.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.eventContainer}>
        <Animated.View style={{ transform: [{ translateX: eventAnim }] }}>
          <Text style={styles.eventTitle}>{events[currentEventIndex]}</Text>
          <View style={styles.timerRow}>
            <Text style={styles.timerValue}>0</Text>
            <Text style={styles.timerValue}>0</Text>
            <Text style={styles.timerValue}>0</Text>
            <Text style={styles.timerValue}>0</Text>
          </View>
          <View style={styles.timerRow}>
            <Text style={styles.timerLabel}>Z</Text>
            <Text style={styles.timerLabel}>O</Text>
            <Text style={styles.timerLabel}>M</Text>
            <Text style={styles.timerLabel}>S</Text>
          </View>
        </Animated.View>
      </View>

      <View style={styles.postContainer}>
        <Animated.View style={{ transform: [{ translateX: postAnim }] }}>
          <View style={styles.postHeader}>
            <View style={styles.iconWrapper}>
              <Icon name={currentPostIndex === 0 ? "facebook" : "instagram"} color="white" size={30} />
            </View>
            <Text style={styles.postTitle}>{currentPostIndex === 0 ? "Postare Facebook" : "Postare Instagram"}</Text>
          </View>
          <Text style={styles.postText}>{posts[currentPostIndex]}</Text>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    paddingBottom: 20,
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
    fontFamily: "UT-Sans",
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
    fontFamily: "UT-Sans",
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
    fontFamily: "UT-Sans",
  },
  eventContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
    padding: 30,
    width: '95%',
    marginTop: 20,
    alignItems: 'center',
    overflow: 'hidden',
  },
  eventTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: "UT-Sans",
  },
  timerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  timerLabel: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: "UT-Sans",
  },
  timerValue: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 15,
    fontFamily: "UT-Sans",
  },
  postContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
    padding: 20,
    width: '95%',
    marginTop: 20,
    alignItems: 'center',
    overflow: 'hidden',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'center',  
    alignItems: 'center',
    marginBottom: 10,
  },
  iconWrapper: {
    marginRight: 5, 
  },
  postTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: "UT-Sans",
  },
  postText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'justify',  
    fontFamily: "UT-Sans",
  },
});

export default DashboardBS;
