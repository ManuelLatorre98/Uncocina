import { PixelRatio, StyleSheet } from "react-native";
import {colors} from '../../Theme/theme'
export const recipeDataScreenStyles = StyleSheet.create({
  container:{
    flex:1,
  },
  scrollContainer:{
    backgroundColor: colors.darkBackground,
    height:'100%'
  },
  image:{
    width:200,
    height:200,
    borderRadius:100,
  },
})

export const headerStyles = StyleSheet.create({
  container:{
    alignItems:'center',
    width:'100%',
    paddingLeft:20,
    paddingRight:20,
    paddingBottom:20,
  },
  titleContainer:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingTop:40,
    alignItems:'center',
    
  },
  backIcon:{
    color:'white',
  },
  favIcon:{
    color:colors.favIcon,
    marginLeft:10
  },

  titleText:{
    fontFamily: 'MulishBold',
    maxWidth:260,
    fontSize: 20,
    color:"white",
    alignSelf:'center',
    textAlign:'center',
    overflow:'hidden',
    marginLeft:20
  },
 
})

export const califScreenStyle = StyleSheet.create({
  container:{
    position:'absolute',
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:colors.darkBackgroundTransparent,
  },
  califContainer:{
    width:'80%',
    height:150,
    backgroundColor:colors.lightBackground,
    alignItems:'center',
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
  starsContainer:{
    flexDirection:'row',
    marginTop:20,
    width:'100%',
    height:50,
    alignItems:'center',
    justifyContent:'space-around',
    elevation:1
  },
  starIcon:{
    color: colors.strongYellow
  }

})