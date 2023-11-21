import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableHighlight,
  type TouchableHighlightProps,
} from 'react-native';
import { COLORS, FontSize } from '../../utils/constants';

type TCustomButtonProps = {
  title: string;
  loading?: boolean;
} & TouchableHighlightProps;

export default function CustomButton(props: TCustomButtonProps) {
  const { title, loading, ...others } = props;

  return (
    <TouchableHighlight
      style={[
        styles.wrapper,
        { backgroundColor: COLORS.primary },
        others.disabled && { backgroundColor: COLORS.inputBg },
      ]}
      {...others}
    >
      <Text style={[styles.title, others.disabled && { color: COLORS.text }]}>
        {!loading ? title : <ActivityIndicator color={COLORS.primary} />}
      </Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 50,
    width: '100%',
    borderRadius: 14,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: FontSize.normal - 2,
    fontWeight: '600',
    color: COLORS.white,
    textAlign: 'center',
  },
});
