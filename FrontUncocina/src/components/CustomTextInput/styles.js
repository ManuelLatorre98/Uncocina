import { StyleSheet } from "react-native";
import {colors} from '../../Theme/theme'
export const textInputStyles = StyleSheet.create({
  textInputContainer:{
    width: '80%',
    color:'white',
    justifyContent:'center',
  },
  submitTextInput:{
    backgroundColor: colors.lightBackground,
    width: '100%',
    minHeight: 50,
    borderRadius: 15,
    fontFamily: 'MulishRegular',
    fontSize: 20,
    paddingLeft: 15,
    paddingRight: 55,
    color:'white',
    marginTop: 25,
  },
  submitTextInputError:{
    borderWidth:2,
    borderColor:'red'
  },
  errorMessageText:{
    fontFamily: 'MulishRegular',
    color:'red',
    fontSize: 15,
    paddingLeft:15,
    
  },
  textInputIcon:{
    position:'absolute',
    right:0,
    top:35,
    paddingRight:20,
    

    
  },
  icon:{
    color:colors.iconColorGrayLight
  },
})

export const dynamicInputStyles = StyleSheet.create({
  container:{
    width:'80%',
  },
  fieldContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
  },
  field:{
    height:'auto',

  },
  removeField:{
    color:'red',
    alignSelf:'center',
    marginTop:25,
    marginLeft:5
  }
})