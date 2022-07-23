import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(2,21,66)',
  },
  textTitle: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 50,
  },
  containerViewScan: {
    width: '90%',
    height: '40%',
    alignSelf: 'center',
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eachContainerViewScan: {
    tintColor: 'white',
    width: 300,
    height: 300,
    position: 'absolute',
  },
  childrenViewScan: {
    tintColor: 'white',
    width: 150,
    height: 150,
    position: 'absolute',
  },
  lineScan: {
    height: 2,
    backgroundColor: 'white',
    width: '70%',
    zIndex: 2,
  },
  viewScanBottom: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    marginBottom: 50,
  },
  buttonCamera: {
    width: 100,
    height: 100,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(255,255,255)',
  },
});
export default styles;
