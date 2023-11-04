import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text, TouchableOpacity, View } from "react-native";
import { categoryButtonStyles } from "./styles";


export default function CategoryButton(props){
  const {container, buttonText, cross} = categoryButtonStyles
  const {categoryName,itemId, handleSelectCategory} = props

  return(
    <View style={container}>
      <Text style={buttonText} numberOfLines={1}>{categoryName}</Text>
      <TouchableOpacity onPress={()=>handleSelectCategory(itemId)}>
        <FontAwesomeIcon icon={faXmark} size={18} style={cross}/>
      </TouchableOpacity>
    </View>
  )
}