import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, Button } from 'react-native';
import axios from 'axios';

const TeamScreen = () => {
  const [collections, setCollections] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  // Fetch collections from the Flask backend
  useEffect(() => {
    axios.get('http://192.168.1.128:5000/api/collections')
      .then(response => {
        setCollections(response.data.collections);
      })
      .catch(error => {
        console.error('Error fetching collections:', error);
      });
  }, []);

  // Fetch documents for the selected collection
  const handleCollectionSelect = (collectionName) => {
    setSelectedCollection(collectionName);

    // Fetch documents from the selected collection using POST
    axios.post('http://192.168.1.128:5000/api/collections', { selected_collection: collectionName })
      .then(response => {
        setDocuments(response.data.documents);
      })
      .catch(error => {
        console.error('Error fetching documents:', error);
      });
  };

  // Toggle menu visibility
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <Text style={styles.menuButtonText}>Show Menu</Text>
      </TouchableOpacity>

      {/* Modal for Menu */}
      <Modal visible={menuVisible} transparent animationType="slide">
        <View style={styles.menu}>
          <Button title="Close" onPress={toggleMenu} />
          <View style={styles.menuItemsContainer}>
            {['Acasa', 'Istoric', 'Echipa', 'Formula SAE', 'Parteneri', 'Contact'].map((item) => (
              <TouchableOpacity key={item} style={styles.menuItemCard}>
                <Text style={styles.menuItem}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Collection List */}
      <View style={styles.collectionsContainer}>
        <Text style={styles.collectionsTitle}>Available Collections</Text>
        <FlatList
          data={collections}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.collectionCard}
              onPress={() => handleCollectionSelect(item)}
            >
              <Text style={styles.collectionName}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {/* Documents List */}
      {selectedCollection && (
        <View style={styles.documentsContainer}>
          <Text style={styles.selectedCollectionTitle}>Documents in {selectedCollection}</Text>
          <FlatList
            data={documents}
            renderItem={({ item, index }) => (
              <View key={index} style={styles.documentCard}>
                <Text style={styles.documentText}>{JSON.stringify(item)}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  menuButton: {
    backgroundColor: '#007bb5',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  menuButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menu: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
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
  collectionsContainer: {
    padding: 20,
  },
  collectionsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bb5',
    textAlign: 'center',
    marginBottom: 15,
  },
  collectionCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  collectionName: {
    fontSize: 18,
    color: '#007bb5',
    fontWeight: 'bold',
  },
  documentsContainer: {
    padding: 20,
  },
  selectedCollectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007bb5',
    textAlign: 'center',
    marginBottom: 15,
  },
  documentCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  documentText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});

export default TeamScreen;
