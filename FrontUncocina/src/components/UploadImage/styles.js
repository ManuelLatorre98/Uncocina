import { StyleSheet } from "react-native";
import {colors} from '../../Theme/theme'
export const UploadImageStyles = StyleSheet.create({
  container: {
    width: 150,
    height:150,
    marginTop:50,
    borderRadius:100,
    backgroundColor: colors.lightBackground,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center'
  },
  containerError:{
    borderWidth:2,
    borderColor:'red'
  },
  iconContainer:{
    flexDirection:'row',
    paddingLeft:10
  },
  icon:{
    color:'gray'
  },
  iconPlus:{
    color:'gray',
    alignSelf:'flex-end',
  },
  imageUploaded:{
      width:150,
      height:150,
      borderRadius:100,
  },
  errorMessage:{
    fontFamily: 'MulishRegular',
    color:'red',
    fontSize: 15,
    paddingLeft:15,
    marginTop:4,
  }
});