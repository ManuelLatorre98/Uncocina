import { Text, TouchableOpacity, View } from "react-native";
import DurationLabel from "../DurationLabel/DurationLabel";

import { headerRecipeInfoCardStyles } from "./styles";


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faWheatAwn, faWheatAwnCircleExclamation } from '@fortawesome/free-solid-svg-icons';


export default function HeaderRecipeInfoCard(props){
  const { header, title, rightContainer, icon} = headerRecipeInfoCardStyles
  const { onPressShowIngredients, showIngredients, estimatedTime } = props
  return(
      <View style={header}>
        <Text style={title}>Receta</Text>
        <View style = {rightContainer}>
        <TouchableOpacity onPress={onPressShowIngredients}>
          {showIngredients && <FontAwesomeIcon icon={faWheatAwnCircleExclamation} size={30} style = {icon}/>}
          {!showIngredients && <FontAwesomeIcon icon={faWheatAwn} size={25} style = {icon}/>}
        </TouchableOpacity> 
        <DurationLabel estimatedTime={estimatedTime}/>
        </View>
      </View>



  )
}