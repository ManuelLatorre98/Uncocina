
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { calificationStyles } from "./style";


export default function Calification(props){
  const {container, icon, text} = calificationStyles
  const {avgCalif}=props
  useEffect(()=>{

  },[])
  return(
    <View style = {container}>
      <FontAwesomeIcon icon={faStar} size={20} style={icon}/>
      <Text style={text}>{avgCalif||0}</Text>
    </View>
  )
}