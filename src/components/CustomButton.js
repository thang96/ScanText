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
  const {icon, label, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    width: 180,
    height: 50,
    borderWidth: 2,
    borderColor: 'rgb(244,164,96)',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(244,255,96,0.1)',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'rgb(244,164,96)',
  },
  icon: {width: 40, height: 40, marginRight: 10},
});
export default CustomButton;
