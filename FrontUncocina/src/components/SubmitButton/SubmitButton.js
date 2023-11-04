import { Text, TouchableOpacity } from "react-native";
import { submitButtonStyles } from "./styles";
export default function SubmitButton(props){
  return(
    <TouchableOpacity style={submitButtonStyles.submitButton} onPress={props.onPress}>
      <Text style={submitButtonStyles.submitText}>{props.text}</Text>
    </TouchableOpacity>
  )
}