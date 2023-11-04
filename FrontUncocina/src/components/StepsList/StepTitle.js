import { faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text, View } from "react-native";
import { stepTitleStyle } from "./styles";

export default function StepTitle(props){
  const {container, titleText, icon} = stepTitleStyle
  return(
    <View style={container}>
      <FontAwesomeIcon icon={faCircleDot} size={20} style={icon}/>
      <Text style={titleText}>{props.stepTitle}</Text>
    </View>

  )
}