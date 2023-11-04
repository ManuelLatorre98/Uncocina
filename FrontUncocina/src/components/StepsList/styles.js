import { StyleSheet } from "react-native";
import {colors} from '../../Theme/theme'
export const stepsListStyle = StyleSheet.create({
  scrollContainer:{
    width:'100%',

  },
})

export const stepTitleStyle = StyleSheet.create({
  container:{
    flexDirection:'row',
    alignItems:'center'
  },
  titleText:{
    fontFamily: 'MulishBold',
    fontSize: 20,
    color:"white",
    marginLeft:25
  },
  icon:{
    color:colors.lightYellow
  }
})

export const stepStyle = StyleSheet.create({

  recipeContainer:{
    borderLeftWidth:3,
    borderStyle:'dotted',
    borderColor:'gray',
    marginLeft:9,
    marginTop:10,
    marginBottom:10,
    
  },
  recipeText:{
    fontFamily: 'MulishMedium',
    fontSize: 18,
    color:"gray",
    marginLeft:33

  }

})