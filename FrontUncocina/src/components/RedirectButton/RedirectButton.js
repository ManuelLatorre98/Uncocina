import { Text, TouchableOpacity, View } from "react-native";
import { redirectButtonStyles } from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function RedirectButton(props){
  const navigation = useNavigation()
  const registerRedirect = () =>{
    navigation.navigate(props.path)
  } 
  return(
    <View>
      <Text style={redirectButtonStyles.optionText}>{props.message}</Text>

      <TouchableOpacity style={redirectButtonStyles.redirectButton} onPress={registerRedirect}>
        <Text style={redirectButtonStyles.redirectText}>{props.buttonText}</Text>
      </TouchableOpacity>
    </View>
  )
}