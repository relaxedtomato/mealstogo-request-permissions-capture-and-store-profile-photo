import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const appLoadingAnimation = require('~/assets/animations/appLoading.json');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3da9fc',
  },
});

const Loading = () => {
  const animation = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        ref={animation}
        style={{ width: 400, height: 400 }}
        source={appLoadingAnimation}
        autoPlay
      />
    </SafeAreaView>
  );
};

export default Loading;
