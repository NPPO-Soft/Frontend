import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  Modal, 
  SafeAreaView, 
  StatusBar,
  ActivityIndicator,
  StyleSheet
} from 'react-native';

// Replace with your actual API service
const API_BASE_URL = 'http://10.206.1.221:5000/api';

const TeamScreen = () => {
  const [collections, setCollections] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch collections from the backend
  const fetchCollections = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/collections`);
      const data = await response.json();
      setCollections(data.collections);
      setError(null);
    } catch (err) {
      setError('Failed to fetch collections');
      console.error('Error fetching collections:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch documents for the selected collection
  const fetchDocuments = async (collectionName) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/collections`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selected_collection: collectionName })
      });
      const data = await response.json();
      setDocuments(data.documents);
      setSelectedCollection(collectionName);
      setError(null);
    } catch (err) {
      setError('Failed to fetch documents');
      console.error('Error fetching documents:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial collections fetch
  useEffect(() => {
    fetchCollections();
  }, []);

  // Menu items
  const menuItems = [
    'Acasa', 'Istoric', 'Echipa', 
    'Formula SAE', 'Parteneri', 'Contact'
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Top Menu Button */}
      <TouchableOpacity 
        onPress={() => setMenuVisible(true)} 
        style={styles.menuButton}
      >
        <Text style={styles.menuButtonText}>
          Show Menu
        </Text>
      </TouchableOpacity>

      {/* Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setMenuVisible(false)}
            >
              <Text style={styles.closeButtonText}>
                Close
              </Text>
            </TouchableOpacity>
            
            {menuItems.map((item) => (
              <TouchableOpacity 
                key={item} 
                style={styles.menuItemCard}
              >
                <Text style={styles.menuItemText}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Collections Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>
          Available Collections
        </Text>
        
        {isLoading ? (
          <ActivityIndicator size="large" color="#007bb5" />
        ) : error ? (
          <Text style={styles.errorText}>
            {error}
          </Text>
        ) : (
          <FlatList
            data={collections}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.collectionCard} 
                onPress={() => fetchDocuments(item)}
              >
                <Text style={styles.collectionName}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* Documents Section */}
      {selectedCollection && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            Documents in {selectedCollection}
          </Text>
          
          {isLoading ? (
            <ActivityIndicator size="large" color="#007bb5" />
          ) : error ? (
            <Text style={styles.errorText}>
              {error}
            </Text>
          ) : (
            <FlatList
              data={documents}
              renderItem={({ item, index }) => (
                <View style={styles.documentCard}>
                  <Text style={styles.documentText}>
                    {typeof item === 'object' ? JSON.stringify(item, null, 2) : item}
                  </Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
  },
  menuButton: {
    backgroundColor: '#007bb5',
    padding: 15,
    margin: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  closeButtonText: {
    color: '#007bb5',
    fontSize: 16,
    fontWeight: '600',
  },
  menuItemCard: {
    backgroundColor: '#007bb5',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    marginVertical: 8,
    alignItems: 'center',
  },
  menuItemText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
  },
  sectionContainer: {
    flex: 1,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bb5',
    textAlign: 'center',
    marginBottom: 15,
  },
  collectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  collectionName: {
    fontSize: 18,
    color: '#007bb5',
    fontWeight: '600',
    textAlign: 'center',
  },
  documentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  documentText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'left',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TeamScreen;