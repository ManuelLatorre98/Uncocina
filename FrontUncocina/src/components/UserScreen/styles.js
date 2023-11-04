import { StyleSheet } from "react-native";
import {colors} from '../../Theme/theme'
export const UserScreenStyles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.darkBackground,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonStyle:{
    backgroundColor:'red'
  }
});