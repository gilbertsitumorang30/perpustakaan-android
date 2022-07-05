import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {ms} from 'react-native-size-matters';
import {colors} from '../../../res/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const InputForm = ({label, placeHolder, typeInput, ...res}) => {
  const [hidePassword, setHidePassword] = useState(true);

  let shown;
  if (hidePassword) {
    shown = 'eye-slash';
  } else {
    shown = 'eye';
  }

  let content;
  switch (typeInput) {
    case 'password':
      content = (
        <View style={styles.inputForm}>
          <TextInput
            style={styles.textInput}
            placeholder={placeHolder}
            placeholderTextColor={colors.textLight}
            secureTextEntry={hidePassword}
            {...res}
          />
          <TouchableOpacity
            style={styles.password}
            onPress={() => {
              setHidePassword(!hidePassword);
            }}>
            <FontAwesome name={shown} color={colors.textLight} size={ms(24)} />
          </TouchableOpacity>
        </View>
      );
      break;
    default:
      content = (
        <View style={styles.inputForm}>
          <TextInput
            style={styles.textInput}
            placeholder={placeHolder}
            placeholderTextColor={colors.textLight}
            {...res}
          />
        </View>
      );
  }

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      {content}
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  inputForm: {
    position: 'relative',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'Poppins-SemiBold',
    color: colors.textDark,
    fontSize: ms(10),
  },
  textInput: {
    borderRadius: ms(16),
    borderWidth: 1,
    borderColor: colors.textLight,
    paddingVertical: ms(8),
    paddingLeft: ms(8),
    paddingRight: ms(42),
    fontFamily: 'Poppins-Regular',
    color: colors.textDark,
    fontSize: ms(12),
  },
  password: {
    position: 'absolute',
    right: 0,
    height: '100%',
    width: ms(48),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
