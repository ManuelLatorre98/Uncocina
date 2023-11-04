import { StyleSheet } from "react-native";
import {colors} from '../../Theme/theme'
export const selectorStyle = StyleSheet.create({
  container:{
    position:'absolute',
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'colors.darkBackgroundTransparent',
  },
  itemContainer:{
    width:'80%',
    height:'80%',
    backgroundColor:colors.lightBackground,
    //alignItems:'center',
    padding:20,
  },
  titleContainer:{
    flexDirection:'row',

    width:'100%',
    justifyContent:'center'
  },
  title:{
    fontFamily: 'MulishBold',
    fontSize: 20,
    color:"white",
  },
  exit:{
    position:'absolute',
    right:0
  },
  exitIcon:{
    color:'gray'
  },
  itemListContainer:{
    width:'100%',
    height:'100%',

  },

})
export const itemSelectorStyle = StyleSheet.create({
  itemContainer:{
    flexDirection:'row',
    height:50,
    
    justifyContent:'space-between',
    alignItems:'center',
    paddingRight:30,
    paddingLeft:10,
    borderBottomWidth:1,
    borderBottomColor:'white',
    borderTopColor:'white',
  },
  itemText:{
    fontFamily: 'MulishMedium',
    fontSize: 18,
    color:"white",
  },
  selectIcon:{
    color:colors.lightYellow
  }
})