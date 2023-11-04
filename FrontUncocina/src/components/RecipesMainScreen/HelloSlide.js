import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { helloSlideStyles } from "./styles";



export default function HelloSlide(props){
  const { user_name } = useSelector(state => state.auth)
  const {textHeader}=props
  useEffect(()=>{
  
  },[])
  return(
    <View style = {helloSlideStyles.container}>
      <View style = {helloSlideStyles.textContainer}>
    
      { textHeader===undefined && 
        <View>
          <Text style={helloSlideStyles.userText} numberOfLines={1}>{`Hola ${user_name}`}</Text>
          <Text style={helloSlideStyles.messageText}>Que vas a cocinar hoy?</Text>
        </View>
      }

      { textHeader!=undefined && 
        <View>
          <Text style={helloSlideStyles.userText} numberOfLines={1}>{`${textHeader.title}`}</Text>
          <Text style={helloSlideStyles.messageText}>{`${textHeader.subTitle}`}</Text>
        </View>
      }
      
      
      </View>
      <Image 
          source={{ uri:'https://firebasestorage.googleapis.com/v0/b/uncocina.appspot.com/o/recipes%2FUncocina_gon7t0.png?alt=media&token=d4a6bf3d-d90e-4e7b-9a2f-f0b8b2c14af0'}}
          style={helloSlideStyles.logo} 
        />
    </View>
  )
}