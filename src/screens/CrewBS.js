import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { API_BASE_URL } from '../../config';


const CrewBS = () => {
  const navigation = useNavigation();
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/teams`, {
            headers: { "Accept": "application/json" }
        });
        
        const resultText = await response.text();
        console.log("Raw API Response:", resultText);

        const result = JSON.parse(resultText); 

        if (response.ok) {
            setTeamMembers(result.teams);
        } else {
            console.error("Error fetching team members:", result.error);
        }
    } catch (error) {
        console.error("Error fetching team members:", error);
    } finally {
        setLoading(false);
    }
};


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <View style={styles.arrowContainer}>
            <Icon name="arrow-left" color="white" size={25} />
          </View>
        </TouchableOpacity>
        <Text style={styles.header}>Echipa</Text>
      </View>
      <View style={styles.separator} />

      {loading ? (
        <ActivityIndicator size="large" color="#FF6B00" style={styles.loader} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {teamMembers.map((member, index) => (
            <View key={member._id} style={styles.card}>
              <Image source={{ uri: member.image }} style={styles.image} />
              <Text style={styles.cardText}>{member.name}</Text>
              <Text style={styles.cardUnderText}>{member.department}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#121212',
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
      flex: 0.8,
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
      alignSelf: 'center',
      marginVertical: 15,
    },
    scrollContainer: {
      alignItems: 'center',
      paddingBottom: 20,
      flexDirection: 'row',
      flexWrap: 'wrap',  
      justifyContent: 'center', 
    },
    card: {
      backgroundColor: '#1E1E1E',
      padding: 15,
      borderRadius: 12,
      alignItems: 'center',
      width: '48%', 
      margin: '1%',  
      marginBottom: 10,
    },
    image: {
      width: 120,
      height: 80,
      borderRadius: 10,
      resizeMode: 'contain',
    },
    cardText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
      textAlign: 'center',
      fontFamily: "UT-Sans",
    },
    cardUnderText: {
      color: 'white',
      fontSize: 15,
      textAlign: 'center',
      fontFamily: "UT-Sans",
    },
    backButton: {
      padding: 10,
    },
    arrowContainer: {
      backgroundColor: '#1E1E1E',
      borderRadius: 12,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loader: {
      marginTop: 50,
    },
  });
  

export default CrewBS;