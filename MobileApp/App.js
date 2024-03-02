import React, { useState } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { OnboardFlow } from 'react-native-onboard'; // Assuming this is your onboarding component
import auth from '@react-native-firebase/auth';
import * as Google from 'expo-auth-session/providers/google';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4; // Adjust based on your actual number of slides
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '504062585472-62ahr25ppff716ha42995bs7dp7c1cnd.apps.googleusercontent.com', // Replace with your actual client ID
  });

  // Effect for handling the authentication response
  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      console.log('Authentication Token:', id_token); // Print the token to the console
      const credential = auth.GoogleAuthProvider.credential(id_token);
      auth()
        .signInWithCredential(credential)
        .then(() => {
          console.log('User signed in with Google!');
        })
        .catch((error) => {
          Alert.alert("Authentication error", error.message);
        });
    }
  }, [response]);

  // Handlers for slide changes
  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide < totalSlides - 1 ? prevSlide + 1 : prevSlide));
  };

  const handleBack = () => {
    setCurrentSlide((prevSlide) => (prevSlide > 0 ? prevSlide - 1 : prevSlide));
  };

  const signInWithGoogle = async () => {
    // Trigger Google sign-in
    promptAsync().catch((error) => {
      Alert.alert('Google Sign-In Error', error.message);
    });
  };

  return (
    <View style={styles.container}>
      <OnboardFlow
        pages={[
          { title: 'Welcome', subtitle: 'Beep boop 1!', imageUri: 'https://virtuallyme.github.io/svg/virme_logo_image.svg' },
          { title: 'Feature 1', subtitle: 'Beep boop 2!', imageUri: 'https://virtuallyme.github.io/svg/virme_logo_image.svg' },
          { title: 'Feature 2', subtitle: 'Beep boop 3!', imageUri: 'https://virtuallyme.github.io/svg/virme_logo_image.svg' },
          { title: 'Feature 3', subtitle: 'Beep boop 4!', imageUri: 'https://virtuallyme.github.io/svg/virme_logo_image.svg', primaryButtonTitle: 'Jump In!' },
        ]}
        onNext={handleNext}
        onBack={handleBack}
        type='bottom-sheet' // Adjust as per your onboarding component's API
      />
      {currentSlide === totalSlides - 1 && ( // Show the Google Sign-In button only on the last slide
        <Button title="Sign In with Google" onPress={signInWithGoogle} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
