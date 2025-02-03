import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();

const sections = [
  {
    title: 'Facultate',
    items: [
      { name: 'Orar', icon: 'schedule' },
      { name: 'Performanțe', icon: 'playlist-add-check' },
      { name: 'Programarea examenelor', icon: 'description' },
      { name: 'Noutăți', icon: 'event' },
      { name: 'Taxele mele', icon: 'attach-money' },
      { name: 'Anunțuri Secretariat', icon: 'feedback' },
    ],
  },
  {
    title: 'Oportunități',
    items: [
      { name: 'Mobilități Erasmus+', icon: 'flight' },
      { name: 'Practică', icon: 'work' },
      { name: 'BlueStreamline', icon: 'sports-motorsports' },
    ],
  },
  {
    title: 'Campus',
    items: [
      { name: 'Meniu cantină', icon: 'fastfood' },
      { name: 'Harta universității', icon: 'map' },
      { name: 'Scanare card digital de student', icon: 'qr-code-2' },
      { name: 'Radio Campus Transilvania', icon: 'radio' },
    ],
  },
  {
    title: 'Documente',
    items: [
      { name: 'Regulamente', icon: 'assignment' },
      { name: 'Documente utile', icon: 'attach-file' },
      { name: 'Ghidul studentului', icon: 'rule' },
      { name: 'Detalii cont', icon: 'person' },
    ],
  },
  {
    title: 'Utile',
    items: [
      { name: 'Preferinte aplicatie', icon: 'settings' },
      { name: 'Despre Aplicatie', icon: 'help-outline' },
      { name: 'Iesire cont', icon: 'output' },
    ],
  },
];

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={sections}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>{item.title}</Text>
              <View style={styles.separator} />
            </View>
            <View style={styles.itemContainer}>
              {item.items.map((subItem, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.itemCard,
                    subItem.name === 'BlueStreamline' && styles.bsButton,
                    subItem.name === 'Iesire cont' && styles.exitButton,
                  ]}
                  onPress={() => {
                    if (subItem.name === 'BlueStreamline') {
                      navigation.navigate('DashboardBS');
                    }
                  }}
                >
                  <Text style={styles.itemText}>{subItem.name}</Text>
                  <Icon name={subItem.icon} type="material" color="white" size={20} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const UniTBv_App = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: 'home',
            Radio: 'radio',
            Notifications: 'notifications',
            More: 'dashboard',
          };
          return <Icon name={icons[route.name]} type="material" color={color} size={size} />;
        },
        tabBarStyle: {
          backgroundColor: '#121212',
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      })}
    >
      <Tab.Screen name="Home" component={() => <View />} />
      <Tab.Screen name="Radio" component={() => <View />} />
      <Tab.Screen name="Notifications" component={() => <View />} />
      <Tab.Screen name="More" component={HomeScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  sectionContainer: {
    marginVertical: 10,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#1E1E1E', 
    flex: 1, 
    marginLeft: 10, 
  },
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemCard: {
    backgroundColor: '#1E1E1E',
    padding: 25,
    margin: 5,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '45%',
  },
  itemText: {
    color: 'white',
    marginRight: 10,
    fontSize: 16,
    fontFamily: 'UT-Sans',
  },
  bsButton: {
    backgroundColor: '#0aafd9',
    padding: 28,
    justifyContent: 'space-between',
  },
  exitButton: {
    backgroundColor: 'red',
    padding: 20,
    margin: 10,
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default UniTBv_App;
