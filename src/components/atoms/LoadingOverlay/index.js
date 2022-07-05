import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {colors} from '../../../res/colors';
import {ms} from 'react-native-size-matters';

const {width, height} = Dimensions.get('window');

const LoadingOverlay = ({loading}) => {
  if (loading) {
    return (
      <View style={styles.loadingOverlay}>
        <View style={styles.overlay}></View>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.primaryTheme} />
        </View>
      </View>
    );
  }
  return null;
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  loadingOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: colors.background,
    opacity: 0.7,
    height: height,
    width: width,
  },
  loading: {
    position: 'absolute',
    backgroundColor: colors.primaryWhite,
    elevation: 2,
    paddingVertical: ms(36),
    paddingHorizontal: ms(96),
    borderRadius: ms(8),
  },
});
