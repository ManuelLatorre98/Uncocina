import { TouchableOpacity } from "react-native";
import { BackToTopStyles} from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";


export default function BackToTopFlatListButton(props){
  const {container, arrowIcon} = BackToTopStyles
  const {backToTopOnPress} = props
  return(
    <TouchableOpacity style={container} onPress={backToTopOnPress}>
         <FontAwesomeIcon icon={faAngleUp} size={35} style={arrowIcon}/>
    </TouchableOpacity>
  )
}