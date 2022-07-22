import {useRoute} from '@react-navigation/native';
import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
const ResponseMessage = props => {
  const route = useRoute();
  console.log(route.params.data.card_no);
  const [dataRespose, setDataRespose] = useState(route.params.data.card_no);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.eachContainer}>
          <Text style={styles.textTitle}>Response</Text>
          <TextInput
            style={{borderWidth: 1, borderRadius: 10, marginVertical: 10}}
            onChangeText={text => setDataRespose(text)}
            value={dataRespose}
          />
          <TouchableOpacity
            style={{marginTop: 20, borderWidth: 1, borderRadius: 5}}
            onPress={() => alert('Continue...')}>
            <Text>Send position to another server</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eachContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {fontSize: 30},
});
export default ResponseMessage;
