import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  viewImage: {justifyContent: 'center', alignItems: 'center'},
  imageCrop: {
    width: 315,
    height: 495,
  },
  viewScale: {
    width: 100,
    height: 100,
    borderRadius: 60,
    position: 'absolute',
    zIndex: 9999,
    overflow: 'hidden',
    backgroundColor: 'rgb(205,201,201)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewScope: {
    transform: [{scale: 2}],
    width: 110,
    height: 110,
  },
  viewPoint: {
    width: 9,
    height: 9,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'red',
    position: 'absolute',
    top: 50,
    left: 50,
    zIndex: 2,
  },
  headerBottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 56,
    backgroundColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    zIndex: 1,
  },
  headerTop: {
    width: '100%',
    height: 56,
    backgroundColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    zIndex: 1,
  },
  buttonBack: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    left: 0,
  },
  buttonNext: {
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;