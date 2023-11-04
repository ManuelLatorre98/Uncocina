import { StyleSheet } from "react-native";
import {colors} from '../../Theme/theme'
export const categorySlideStyles = StyleSheet.create({
  container:{
    flexDirection:'column',
    width:'100%',
    alignItems:'center',
    

  },
  headerContainer:{
    flexDirection:"row",
    justifyContent:'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop:40,
    paddingRight:40
  },
  categoryText:{
      fontFamily: 'MulishBold',
      fontSize: 30,
      color:"white",
      paddingRight:10,
      paddingLeft:30,
  },
  iconContainer:{
    flexDirection:'row',
  },
  icon:{
    marginTop:10,
    color:colors.iconColorGrayLight,
    marginLeft:30
  }
})

export const categoryButtonStyles = StyleSheet.create({
  container:{
    flexDirection:'row',
    height:50,
    maxWidth:200,
    justifyContent:'space-between',
    alignItems:'center',
    overflow:'hidden',
    paddingLeft:20,
    paddingRight:20,
    marginRight:15,
    borderRadius:15,
    backgroundColor:colors.lightBackground,
    
  },
  buttonText:{
      fontFamily: 'MulishMedium',
      fontSize: 18,
      color:"gainsboro",
  },
  cross:{
    marginLeft:15,
    marginTop:3,
    color:'gainsboro',
  },
  scroll:{
    flexDirection:'row',
    marginTop:15,
    width:'95%'

  }

})