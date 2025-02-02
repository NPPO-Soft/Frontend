import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { API_BASE_URL } from '../../config';

const { width } = Dimensions.get('window');

const TestimonialsBS = ({ navigation }) => {
    const flatListRef = useRef(null);
    const initialIndex = 5000; // Start at a middle index for infinite scrolling
    const [testimonials, setTestimonials] = useState([]);
    const [currentText, setCurrentText] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/testimonials`);
            const result = await response.json();

            if (response.ok && result.testimonials.length > 0) {
                // Create an infinite scrolling effect by repeating the testimonials
                const repeatedData = [];
                for (let i = 0; i < 10000; i++) {
                    repeatedData.push({
                        ...result.testimonials[i % result.testimonials.length],
                        uniqueId: `${i}`
                    });
                }

                setTestimonials(repeatedData);
                setCurrentText(result.testimonials[0].text);
            } else {
                console.error("Error fetching testimonials:", result.message);
            }
        } catch (error) {
            console.error("Error fetching testimonials:", error);
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

    const renderTestimonial = ({ item }) => (
        <View style={styles.testimonialCard}>
            <Image source={{ uri: item.image }} style={styles.profileImage} />
            <Text style={styles.testimonialName}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" color="white" size={28} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Testimoniale</Text>
            </View>

            {/* Loading State */}
            {loading ? (
                <ActivityIndicator size="large" color="#FF6B00" style={styles.loader} />
            ) : (
                <>
                    {/* Testimonials Carousel with Infinite Scrolling */}
                    <View style={styles.testimonialsCarousel}>
                        <FlatList
                            ref={flatListRef}
                            data={testimonials}
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

                    {/* Testimonial Text Display */}
                    <View style={styles.customButtonContainer}>
                        <ScrollView style={styles.customButtonScroll}>
                            <Text style={styles.customButtonText}>
                                {currentText}
                            </Text>
                        </ScrollView>
                    </View>
                </>
            )}
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
    alignItems: 'center', // Centers the content horizontally
    justifyContent: 'center', // Centers the content vertically
  },
  customButtonScroll: {
    flex: 1,
  },
  customButtonText: {
    color: 'white',
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'justify',
    marginHorizontal: 5, 
  },
});

export default TestimonialsBS;
