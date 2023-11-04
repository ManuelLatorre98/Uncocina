import { StyleSheet } from "react-native";
import {colors} from '../../Theme/theme'
export const calificationStyles = StyleSheet.create({
  container:{
    flexDirection:'row',   
    marginTop:10
  },
  icon:{
    color:colors.strongYellow
  },
  text:{
    color:colors.lightYellow,
    fontFamily: 'MulishBold',
    fontSize: 15,
    marginLeft:10
  }
  
  
})
