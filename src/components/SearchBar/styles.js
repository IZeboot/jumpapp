import {StyleSheet} from 'react-native';
import { ifIphoneX, ifAndroid } from '../../utils';

export default styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    zIndex: 99,
    backgroundColor: '#597fab',
    width: '100%',
    // borderColor:'red',
    // borderWidth:5,
    // overflow: 'hidden',
    paddingBottom: 10,
    ...ifIphoneX({
      paddingTop: 40
    }, {
      paddingTop: 28
    }),
  },
  searchBar:{
    flex:1
  },  
  arrowMinimizeContainer: {
    position: 'relative',
    top: -3
  },
  arrowMinimizeIcon: {
    marginLeft: 12,
  },
  searchInput: {
    display: 'flex',
    backgroundColor: '#fff',
    borderRadius: 3,
    height: 45,
    marginTop: 3,
    marginLeft: 10,
    marginRight: 10,
    width:'100%'
  },
  locationInput: {
    marginTop: 10,
  },
  searchIcon: {
    position: 'absolute',
    left: 13,
    top: 12,
  },
  inputText: {
    display: 'flex',
    ...ifAndroid({
      marginTop: 9
    }, {
      marginTop: 13
    }),
    marginLeft: 43,
    fontSize: 15,
    color: '#999',
  },
  buttonCamera:{
    height:50, 
    width:50, 
    borderWidth:1, 
    borderColor:'red'
  }
});