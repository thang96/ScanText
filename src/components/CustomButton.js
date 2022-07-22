import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TurboModuleRegistry,
  StyleSheet,
  Image,
} from 'react-native';
const CustomButton = props => {
  const {icon, label, onPress, styleButton, styleIcon, styleLabel} = props;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, styleButton]}>
      <Image source={icon} style={[styles.icon, styleIcon]} />
      <Text style={[styles.text, styleLabel]}>{label}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    width: 180,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  icon: {width: 35, height: 35, marginRight: 10},
});
export default CustomButton;
