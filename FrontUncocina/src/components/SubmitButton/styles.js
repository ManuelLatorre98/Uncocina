import { StyleSheet } from "react-native";
import {colors} from '../../Theme/theme'
export const submitButtonStyles = StyleSheet.create({
  submitButton: {
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: colors.lightYellow,
    width: '80%',
    height: 50,
    borderRadius: 15,
    marginTop: 50,
    marginBottom:50
  },
  submitText:{
    fontFamily: 'MulishBold',
    fontSize: 25
  },

})