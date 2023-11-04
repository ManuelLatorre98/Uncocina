import { StyleSheet } from "react-native";
import {colors} from '../../Theme/theme'
export const BackToTopStyles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: colors.darkBackground,
    position:'absolute',
    height:60,
    width:60,
    borderRadius:50,
    left:'82%',
    top:'80%',
    justifyContent:'center',
    alignItems:'center'
  },
  arrowIcon:{
    color:colors.lightYellow
  }
})

