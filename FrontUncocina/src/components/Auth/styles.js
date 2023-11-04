import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(33,32,32,255)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo:{
    width:160, 
    height:160
  },
  showPassText:{
    margin: 8,
    fontFamily: 'MulishMedium',
    fontSize: 15,
    color:"white"
  },
  errorApiMessageText:{
    fontFamily: 'MulishRegular',
    color:'red',
    fontSize: 15,
    marginTop:30,
  }

})