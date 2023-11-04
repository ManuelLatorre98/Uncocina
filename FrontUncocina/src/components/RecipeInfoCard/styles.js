import { StyleSheet } from "react-native";
import {colors} from '../../Theme/theme'
export const recipeInfoCardStyles = StyleSheet.create({
  container:{
    width:'100%',
    paddingBottom:20,

  },
  stepListContainer:{
    marginTop:20,
    marginBottom:20,

    padding:20,
    minWidth:'100%',

    backgroundColor:colors.lightBackground,
    flexShrink:1,
    borderRadius:20
    
 
    
  },
  ingredientsTitle:{
    fontFamily: 'MulishLight',
    fontSize: 20,
    color:"white",
  }
})

export const headerRecipeInfoCardStyles = StyleSheet.create({
  header:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  title:{
    fontFamily: 'MulishBold',
    fontSize: 20,
    color:"white",
  },
  rightContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  icon:{
    color:'gray',
    marginRight:20
  }
})

export const ingredientsInfoCardStyles= StyleSheet.create({
  container:{
    paddingLeft:20,
    paddingRight:20,
    marginTop:15,
   
  },
  title:{
    fontFamily: 'MulishBold',
    fontSize: 30,
    color:colors.lightYellow,
    textAlign:'center',

 
  },
  listContainer:{
    marginTop:30
  }
})