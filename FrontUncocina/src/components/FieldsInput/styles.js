import { StyleSheet } from "react-native";
import {colors} from '../../Theme/theme'
export const FieldInputStyles = StyleSheet.create({
  container:{
    width:'100%', 
    alignItems:'center',
    marginTop:25

  },
  header:{
    width:'80%',
    padding:0,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  headerText:{
    color:'white',
    fontFamily: 'MulishRegular',
    fontSize: 15,
    marginRight:15
  },

  containerAdd:{
    marginTop:40,
  
  },
  addInput:{
    padding:0,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:colors.lightBackground,
    borderRadius:15,
    padding:5
  },
  line:{
    borderWidth:0.8,
    borderColor:colors.lightYellow,
    flexGrow:1,
    height:0,
  },
  addIcon:{
    color:colors.lightYellow,
    marginLeft:15,
    marginRight:15
  }
});