import { StyleSheet } from "react-native";
import {colors} from '../../Theme/theme'
export const DurationLabelStyles = StyleSheet.create({
  container:{
    height:40,
    width:80,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15,
    backgroundColor:colors.lightYellow,
  },
  text:{
    fontFamily: 'MulishBold',
    fontSize: 15,
    color:"black",
  }

  
})
