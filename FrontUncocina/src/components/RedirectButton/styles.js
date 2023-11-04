import { StyleSheet } from "react-native";
import {colors} from '../../Theme/theme'
export const redirectButtonStyles = StyleSheet.create({
  optionText: {
    fontFamily: 'MulishLight',
    fontSize: 15,
    color:'white',
    marginTop: 80
  },
  redirectButton: {
    borderWidth: 3,
    borderColor: colors.lightYellow,
    borderRadius: 50,
    marginTop: 5,
    paddingLeft:20,
    paddingRight:20
  },
  redirectText:{
    fontFamily: 'MulishMedium',
    fontSize:15,
    color:'white',
  },
})