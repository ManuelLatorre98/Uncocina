import { ScrollView } from "react-native";
import Step from "./Step";
import { stepsListStyle } from "./styles";

export default function StepsList(props){
  const {scrollContainer} = stepsListStyle
  const {steps}= props


  //RENDER COMPONENTS
  const stepsElements = steps.map((step, i)=>{
    return(
      <Step stepTitle={'Paso '+(i+1)}
        key={'step'+i}
        text={step}
      />
    )
  })   
  return(
    <ScrollView style={scrollContainer}>
      {stepsElements}
    </ScrollView>

  )
}