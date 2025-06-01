import { Pressable, Text, Animated, View, StyleSheet, Dimensions } from 'react-native';
import { useRef, useState, useEffect } from 'react';
import { colors } from '../colors';
import { MaterialIcons } from '@expo/vector-icons';

const HoldButton = () => {
  const [buttonText, setButtonText] = useState("Giữ để tham gia");
  const [isReady, setIsReady] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get('window');

  const handleLongPress = () => {
    setButtonText("Tham gia!!!");
    setIsReady(true);
  };

  const handlePressIn = () => {
    Animated.timing(progressAnim, {
      toValue: width - 40, // Subtract padding
      duration: 1000,
      useNativeDriver: false
    }).start(({finished}) => {
      if (finished) {
        handleLongPress();
      }
    });
  };

  const handlePressOut = () => {
    progressAnim.setValue(0);
    setButtonText("Giữ để tham gia");
    setIsReady(false);
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.button}
      >
        <View style={styles.buttonContent}>
          <MaterialIcons 
            name={isReady ? "check-circle" : "touch-app"} 
            size={24} 
            color="white" 
          />
          <Text style={styles.buttonText}>{buttonText}</Text>
        </View>
        <Animated.View 
          style={[
            styles.progressBar,
            {
              width: progressAnim
            }
          ]}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  button: {
    backgroundColor: colors.primary,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative'
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    zIndex: 1
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
  }
});

export default HoldButton;
