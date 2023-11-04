import { StyleSheet } from "react-native";
import {colors} from '../../Theme/theme'
export const PickerStyles = StyleSheet.create({
  container:{
    width:"80%", 

  },
  picker: {
    backgroundColor:colors.lightBackground,
    borderRadius: 15,
    fontSize: 20,
    height:50,
    color:'white',
    marginTop:25,
    padding:0,
    justifyContent:'center'
  },
  pickerError:{
    borderWidth:2,
    borderColor:'red'
  },
  pickerNoPlaceholder:{
    color:'white',
  },
  pickerItemEmpty:{
    color:'gray',    
  },
  errorMessage:{
    fontFamily: 'MulishRegular',
    color:'red',
    fontSize: 15,
    paddingLeft:15,
  }
});
