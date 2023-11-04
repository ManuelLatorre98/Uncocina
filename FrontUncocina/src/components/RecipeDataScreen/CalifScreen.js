import {faStar as offStar} from "@fortawesome/free-regular-svg-icons";
import { faStar as onStar, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { califScreenStyle } from "./styles";

export default function CalifScreen(props){
  const { container, califContainer, title, starsContainer, starIcon, titleContainer, exit, exitIcon} = califScreenStyle
  const { handleMakeCalif, handleChangeCalif, userCalif } = props

  const [stars, setStars] = useState([])

  

  function renderStars(){ 
    const newStars=[]
    for (let i = 0; i < 5; i++) {
      if(i<userCalif){
          newStars.push(
            <TouchableOpacity key={'star'+i} starNumber={i} onPress={() => handleChangeCalif(i)}>
              <FontAwesomeIcon icon={onStar} size={25} style={starIcon} />
            </TouchableOpacity>
          )
      }else{
          newStars.push(
            <TouchableOpacity key={'star'+i} starNumber={i} onPress={() => handleChangeCalif(i)}>
              <FontAwesomeIcon icon={offStar} size={25} style={starIcon} />
            </TouchableOpacity>
          )
      }
    }
    return newStars
  }

  useEffect(()=>{
    const newStars= renderStars()
    setStars(newStars)
  },[userCalif])
  return(
      <TouchableOpacity onPress={handleMakeCalif} style={container}>
        <TouchableOpacity activeOpacity={1} style={califContainer}>
          <View style={titleContainer}>
            <Text style={title}>Calificación</Text>
            <TouchableOpacity onPress={handleMakeCalif} style={exit}>
              <FontAwesomeIcon icon={faXmark} size={25} style={exitIcon} />
            </TouchableOpacity>
          </View>

          <View style={starsContainer}>
            {stars}
          </View>
          </TouchableOpacity>
      </TouchableOpacity>
  )
}