import { useEffect } from "react";
import { Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { DurationLabelStyles } from "./styles";

export default function DurationLabel(props){
  const {container, text} = DurationLabelStyles
  const{estimatedTime} = props
  
  return(
    <View style = {container}>
      <Text style={text}>{`${estimatedTime} MIN`} </Text>
    </View>
  )
}