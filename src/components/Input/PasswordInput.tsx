import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import { COLORS, FontSize, Spacing } from '../../utils/constants';

type TPasswordInputProps = {
  label: string;
} & TextInputProps;

export default function CustomPasswordInput(props: TPasswordInputProps) {
  const { label, ...others } = props;

  const [secure, _] = React.useState(true);

  return (
    <View>
      <Text style={[styles.label, { color: COLORS.text }]}>{label}</Text>

      <View style={styles.textContainer}>
        <TextInput
          style={[styles.input, { color: COLORS.text }]}
          placeholderTextColor={'#6A6A6A'}
          secureTextEntry={secure}
          cursorColor={COLORS.primary}
          {...others}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: COLORS.inputBg,
    alignItems: 'center',
    paddingRight: 14,
    borderRadius: 14,
    overflow: 'hidden',
  },
  label: {
    marginBottom: Spacing / 2,
  },
  input: {
    paddingHorizontal: 14,
    paddingVertical: 16,
    backgroundColor: COLORS.inputBg,
    fontSize: FontSize.normal - 2,
    flex: 1,
  },
});
