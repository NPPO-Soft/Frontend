import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    ScrollView,
    TextInput,
    Alert,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { API_BASE_URL } from '../../config';

const { width } = Dimensions.get('window');

const CombinedRecruitmentScreen = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('recruit');
    const [formData, setFormData] = useState({
        nume: '',
        prenume: '',
        email: '',
        facultate: '',
        anUniversitar: '',
        motivatie: ''
    });
    const [interviewDate, setInterviewDate] = useState(null);

    const handleRecruitSubmit = async () => {
        try {
            if (formData.email && !formData.email.includes('@')) {
                Alert.alert('Error', 'Email invalid');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/recrutari`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert('Success', result.message);
                setFormData({
                    nume: '',
                    prenume: '',
                    email: '',
                    facultate: '',
                    anUniversitar: '',
                    motivatie: ''
                });
            } else {
                Alert.alert('Error', result.message);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            Alert.alert('Error', 'Failed to submit application');
        }
    };

    const handleCheckInterview = async () => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/interview?nume=${formData.nume}&prenume=${formData.prenume}&facultate=${formData.facultate}&anUniversitar=${formData.anUniversitar}`
            );

            const result = await response.json();

            if (response.ok) {
                if (result.success) {
                    setInterviewDate(result.interview); // Store full interview details
                } else {
                    Alert.alert('Error', result.message || "User not found");
                }
            } else {
                Alert.alert('Error', result.message || "Failed to fetch interview data");
            }
        } catch (error) {
            console.error('Error checking interview:', error);
            Alert.alert('Error', 'Failed to fetch interview data');
        }
    };


    const renderFormField = (label, value, onChangeText, options = {}) => (
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{label}</Text>
            <TextInput
                style={[styles.input, options.multiline && styles.textArea]}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor="#666"
                {...options}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" color="white" size={28} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Formula Student Recruitment</Text>
            </View>

            {/* Tab Navigation */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'recruit' && styles.activeTab]}
                    onPress={() => setActiveTab('recruit')}
                >
                    <Text style={[styles.tabText, activeTab === 'recruit' && styles.activeTabText]}>
                        Recrutari
                    </Text>
                    {activeTab === 'recruit' && <View style={styles.activeIndicator} />}
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === 'interview' && styles.activeTab]}
                    onPress={() => setActiveTab('interview')}
                >
                    <Text style={[styles.tabText, activeTab === 'interview' && styles.activeTabText]}>
                        Interviu
                    </Text>
                    {activeTab === 'interview' && <View style={styles.activeIndicator} />}
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollContainer}>
                <View style={styles.formContainer}>
                    {renderFormField(
                        'Nume',
                        formData.nume,
                        (text) => setFormData({ ...formData, nume: text })
                    )}

                    {renderFormField(
                        'Prenume',
                        formData.prenume,
                        (text) => setFormData({ ...formData, prenume: text })
                    )}

                    {activeTab === 'recruit' && renderFormField(
                        'Email',
                        formData.email,
                        (text) => setFormData({ ...formData, email: text }),
                        { keyboardType: 'email-address' }
                    )}

                    {renderFormField(
                        'Facultate',
                        formData.facultate,
                        (text) => setFormData({ ...formData, facultate: text })
                    )}

                    {renderFormField(
                        'An Universitar',
                        formData.anUniversitar,
                        (text) => setFormData({ ...formData, anUniversitar: text }),
                        { keyboardType: 'numeric' }
                    )}

                    {activeTab === 'recruit' && renderFormField(
                        'De ce doresti sa intri in echipa',
                        formData.motivatie,
                        (text) => setFormData({ ...formData, motivatie: text }),
                        { multiline: true, numberOfLines: 4 }
                    )}

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={activeTab === 'recruit' ? handleRecruitSubmit : handleCheckInterview}
                    >
                        <Text style={styles.submitButtonText}>
                            {activeTab === 'recruit' ? 'Depune cererea' : 'Check Interview'}
                        </Text>
                    </TouchableOpacity>

                    {activeTab === 'interview' && interviewDate !== null && (
                        <View style={styles.resultContainer}>
                            <Text style={styles.resultText}>
                                📅 Date: {interviewDate?.date || "No date set"}
                            </Text>
                            <Text style={styles.resultText}>
                                ⏰ Hour: {interviewDate?.hour || "No hour set"}
                            </Text>
                            <Text style={styles.resultText}>
                                📍 Location: {interviewDate?.location || "No location set"}
                            </Text>
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
        marginTop: 10,
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        marginTop: 10,
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
    },
    tabContainer: {
        flexDirection: 'row',
        width: width * 0.9,
        backgroundColor: '#1E1E1E',
        borderRadius: 15,
        marginTop: 20,
        overflow: 'hidden',
    },
    tab: {
        flex: 1,
        paddingVertical: 15,
        alignItems: 'center',
        position: 'relative',
    },
    activeTab: {
        backgroundColor: 'transparent',
    },
    tabText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '500',
    },
    activeTabText: {
        color: '#FF6B00',
    },
    activeIndicator: {
        position: 'absolute',
        bottom: 0,
        left: '25%',
        right: '25%',
        height: 3,
        backgroundColor: '#FF6B00',
        borderRadius: 1.5,
    },
    scrollContainer: {
        flex: 1,
        width: '100%',
    },
    formContainer: {
        padding: 15,
        backgroundColor: '#1E1E1E',
        margin: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputContainer: {
        marginBottom: 15,
    },
    inputLabel: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
        paddingLeft: 4,
    },
    input: {
        backgroundColor: '#2C2C2C',
        color: 'white',
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    submitButton: {
        backgroundColor: '#1F1F1F',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    resultContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#2C2C2C',
        borderRadius: 10,
        alignItems: 'center',
    },
    resultText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default CombinedRecruitmentScreen;