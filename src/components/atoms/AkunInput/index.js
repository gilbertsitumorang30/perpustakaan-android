import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {colors} from '../../../res/colors';
import {ms} from 'react-native-size-matters';

const AkunInput = ({defaultValue, label, enable = false, height, ...res}) => {
  return (
    <View style={styles.akunInput}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputForm}>
        <TextInput
          multiline={true}
          editable={enable}
          selectTextOnFocus={enable}
          style={[styles.textInput, enable ? styles.enable : styles.disable]}
          defaultValue={defaultValue}
          {...res}
        />
      </View>
    </View>
  );
};

export default AkunInput;

const styles = StyleSheet.create({
  akunInput: {
    justifyContent: 'center',
    marginBottom: ms(12),
  },
  label: {
    fontFamily: 'Poppins-SemiBold',
    color: colors.textDark,
    fontSize: ms(10),
  },
  textInput: {
    borderRadius: ms(4),
    borderWidth: 1,
    paddingVertical: ms(8),
    paddingLeft: ms(8),
    paddingRight: ms(42),
    fontFamily: 'Poppins-Regular',
    fontSize: ms(12),
    alignItems: 'flex-start',
  },
  disable: {
    color: colors.textLight,
    borderColor: colors.background,
    backgroundColor: colors.background,
  },
  enable: {
    color: colors.textDark,
    backgroundColor: colors.primaryWhite,
    borderColor: colors.background,
  },
});
