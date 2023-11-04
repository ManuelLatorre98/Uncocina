import { StyleSheet } from "react-native";
import {colors} from '../../Theme/theme'
export const recipeCardStyles = StyleSheet.create({
  container:{
    flexDirection:'row',
    marginTop:10,
    justifyContent:'space-between',
    alignItems:'center',
    paddingLeft:25,
    paddingRight:20,
    paddingTop:20,
    paddingBottom:20,
    backgroundColor:colors.lightBackground,
    borderRadius:15,
  },
  infoContainer:{
    flexDirection:'column',
    flexGrow:1,
    flexShrink:1,
  },
  recipeText:{
    fontFamily: 'MulishBold',
    fontSize: 23,
    color:"white",
    
    
  },
  image:{
    width:160,
    height:160,
    borderRadius:120,
    marginLeft:10

  },  
})
