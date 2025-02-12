import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../screens/Firebase'; // Ensure this imports your initialized Firebase app

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, set user details
        setUserDetails({
          email: user.email,
          uid: user.uid,
        });
      } else {
        // No user is signed in, navigate to login
        navigation.navigate('Login');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigation]);

  return (
    
      <View style={styles.overlay}>
        <View style={styles.container}>
          {userDetails ? (
            <>
              <Text style={styles.welcomeText}>Welcome to the Seamless Voice Recording App!</Text>
              <Text style={styles.infoText}>Logged in as: {userDetails.email}</Text>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Recorder')}>
                <Text style={styles.buttonText}>Go to Recording</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4F46E5" />
              <Text style={styles.loadingText}>Loading user details...</Text>
            </View>
          )}
        </View>
      </View>

  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay to enhance text readability
  },
  container: {
    width: '85%', // Slightly smaller width for better focus
    maxWidth: 380, // Limit width for large screens
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    borderRadius: 15,
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#4F46E5', // Tailwind indigo-500
    textAlign: 'center',
  },
  infoText: {
    fontSize: 18,
    marginBottom: 15,
    color: '#333', // Dark gray text
    textAlign: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#4F46E5', // Tailwind indigo-700
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#FFFFFF', // White text
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#4F46E5', // Tailwind indigo-500
    marginTop: 10,
    textAlign: 'center',
  },
});

export default ProfileScreen;
