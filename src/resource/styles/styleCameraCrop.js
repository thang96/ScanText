import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(2,21,66,0.1)',
  },
  viewImage: {justifyContent: 'center', alignItems: 'center', marginTop: 20},
  titleTop: {
    color: 'white',
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: 'bold',
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

  headerBottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 56,
    backgroundColor: 'rgb(2,21,66)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    zIndex: 1,
  },
  headerTop: {
    width: '100%',
    height: 56,
    backgroundColor: 'rgb(2,21,66)',
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
});
export default styles;
