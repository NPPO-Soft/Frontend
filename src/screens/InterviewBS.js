import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    ScrollView,
    TextInput,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { API_BASE_URL } from '../../config';

const InterviewScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({
        nume: '',
        prenume: '',
        facultate: '',
        anUniversitar: '',
    });
    const [interviewDate, setInterviewDate] = useState(null);

    const handleCheckInterview = async () => {
        try {
            console.log("Checking interview for:", formData);

            const response = await fetch(`${API_BASE_URL}/api/interview?nume=${formData.nume}&prenume=${formData.prenume}&facultate=${formData.facultate}&anUniversitar=${formData.anUniversitar}`);

            console.log("After fetch request");
            const result = await response.json();

            if (response.ok) {
                setInterviewDate(result.interview || "No interview date set yet.");
            } else {
                Alert.alert('Error', result.message || "User not found");
            }
        } catch (error) {
            console.error('Error checking interview:', error);
            Alert.alert('Error', 'Failed to fetch interview data');
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" color="white" size={30} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Check Interview</Text>
            </View>

            {/* Banner */}
            <ImageBackground
                source={require('./assets/DIF04464.jpg')}
                style={styles.banner}
            >
                <View style={styles.bannerOverlay}>
                    <Text style={styles.bannerText}>Check Your Interview Date</Text>
                </View>
            </ImageBackground>

            {/* Two Buttons for Navigation */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => navigation.navigate('RecruitsBS')}
                >
                    <Text style={styles.navButtonText}>Apply for Recruitment</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.navButton, styles.secondaryButton]}
                    onPress={() => navigation.navigate('InterviewBS')}
                >
                    <Text style={styles.navButtonText}>Check Interview</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollContainer}>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nume"
                        placeholderTextColor="#666"
                        value={formData.nume}
                        onChangeText={(text) => setFormData({ ...formData, nume: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Prenume"
                        placeholderTextColor="#666"
                        value={formData.prenume}
                        onChangeText={(text) => setFormData({ ...formData, prenume: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Facultate"
                        placeholderTextColor="#666"
                        value={formData.facultate}
                        onChangeText={(text) => setFormData({ ...formData, facultate: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="An Universitar"
                        placeholderTextColor="#666"
                        value={formData.anUniversitar}
                        onChangeText={(text) => setFormData({ ...formData, anUniversitar: text })}
                        keyboardType="numeric"
                    />

                    <TouchableOpacity style={styles.submitButton} onPress={handleCheckInterview}>
                        <Text style={styles.submitButtonText}>Check Interview</Text>
                    </TouchableOpacity>

                    {interviewDate !== null && (
                        <View style={styles.resultContainer}>
                            <Text style={styles.resultText}>Interview Date: {interviewDate}</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 10,
        width: '100%',
        paddingHorizontal: 15,
    },
    backButton: {
        marginRight: 10,
    },
    headerText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    banner: {
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        paddingVertical: 10,
        alignItems: 'center',
    },
    bannerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    navButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 10,
    },
    secondaryButton: {
        backgroundColor: '#FF9500', // Different color for interview button
    },
    navButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    scrollContainer: {
        flex: 1,
    },
    formContainer: {
        padding: 15,
        backgroundColor: '#1E1E1E',
        margin: 15,
        borderRadius: 10,
    },
    input: {
        backgroundColor: '#2C2C2C',
        color: 'white',
        padding: 15,
        borderRadius: 5,
        marginBottom: 15,
    },
    submitButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#333',
        borderRadius: 5,
        alignItems: 'center',
    },
    resultText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default InterviewScreen;
