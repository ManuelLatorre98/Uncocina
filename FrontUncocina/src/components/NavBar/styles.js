import { StyleSheet } from "react-native";
import {colors} from '../../Theme/theme'
export const navBarStyles = StyleSheet.create({
  navContainer:{
    flexDirection: "row",
    width: '100%',
    backgroundColor:colors.lightBackground,
    justifyContent: 'center',
    position:'absolute',
    bottom:0,
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    zIndex:1
  },

  navButton:{
    flex:1,
    width:60,
    height:60,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'transparent',
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
  },
  navIconSelected:{
    color:colors.lightYellow
  },
  navIconNotSelected:{
    color:'white'
  }
})