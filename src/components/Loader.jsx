import LottieView from 'lottie-react-native';
import {View, Animated, StyleSheet} from 'react-native';

const Loader = ({loading}) => {
  if (!loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LottieView
        style={{width:65, height: 65,zIndex:4}}
        source={require('../assets/animation/circularLoader.json')}
        autoPlay
        loop
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'transparent',
    zIndex:4
  },
});