import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import { COLORS, FontSize, Spacing } from '../../utils/constants';

type TTextInputProps = {
  label: string;
} & TextInputProps;

export default function CustomTextInput(props: TTextInputProps) {
  const { label, ...others } = props;

  return (
    <View>
      <Text style={[styles.label, { color: COLORS.text }]}>{label}</Text>

      <TextInput
        style={[styles.input, { color: COLORS.text }]}
        placeholderTextColor={'#6A6A6A'}
        cursorColor={COLORS.primary}
        {...others}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: Spacing / 2,
  },
  input: {
    paddingHorizontal: 14,
    paddingVertical: 16,
    backgroundColor: COLORS.inputBg,
    fontSize: FontSize.normal - 2,
    borderRadius: 14,
  },
});
