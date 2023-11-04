
import { Text, View } from "react-native";
import StepTitle from "./StepTitle";
import { stepStyle } from "./styles";

export default function Step(props){
  const {container, recipeContainer, recipeText} = stepStyle
  const {stepTitle, text} = props
  
  return(
    <View style={container}>
      <StepTitle stepTitle={stepTitle}/>
      {text!=undefined &&<View style={recipeContainer}>
        <Text style={recipeText}>{text}</Text>
      </View>}
      {text===undefined && <View style={{height:15}}></View>}
    </View>

  )
}