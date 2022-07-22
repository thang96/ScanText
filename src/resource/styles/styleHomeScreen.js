import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
  },
  viewTop: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewScanTop: {
    marginTop: 150,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderColor: 'rgba(0,0,0,0.5)',
    backgroundColor: 'white',
    borderRadius: 10,
    transform: [{rotate: '25deg'}],
  },
  imageScan: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    transform: [{rotate: '-15deg'}],
  },
  lineScan: {
    height: 2,
    backgroundColor: 'red',
    width: '50%',
    zIndex: 2,
    marginRight: 20,
  },
  viewScanBottom: {
    marginBottom: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  buttonCamera: {
    width: 100,
    height: 100,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});
export default styles;
