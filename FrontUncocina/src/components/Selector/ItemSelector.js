import {faCircleDot} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text, TouchableOpacity } from "react-native";
import { itemSelectorStyle } from "./styles";

export default function ItemSelector(props){
  const {selectedItem, itemName, handleSelectItem, itemIndex}= props
  const {itemContainer, itemText,selectIcon} = itemSelectorStyle

  return(
      <TouchableOpacity onPress={()=>handleSelectItem(itemName)} style={itemContainer}>
        <Text style={itemText}>{itemName}</Text>
        {selectedItem && <FontAwesomeIcon icon={faCircleDot} size={20} style={selectIcon}/>}
      </TouchableOpacity>
  )
}