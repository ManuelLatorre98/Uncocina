import { Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import Calification from "../Calification/Calification";
import DurationLabel from "../DurationLabel/DurationLabel";
import { recipeCardStyles } from "./styles";
import { setSelected } from "../../store/slices/recipes/recipesSlice";
import { useNavigation } from "@react-navigation/native";


export default function RecipeCard(props){
  const {container, recipeText, infoContainer, image} = recipeCardStyles
  const  {recipe_name, avgCalif, imageURL, estimatedTime, index} = props
  const dispatch = useDispatch()
  const navigation= useNavigation()
  function onPress(){
    dispatch(setSelected(index))
    navigation.navigate('RecipesData')
  }

  return(
    <TouchableOpacity  style = {container} onPress={onPress}>
      <View style = {infoContainer}>
        <Text style={recipeText} numberOfLines={2}>{recipe_name}</Text>
        <Calification avgCalif={avgCalif}/>
        <View style={{marginTop:20}}>
          <DurationLabel  estimatedTime={estimatedTime}/>
        </View>

      </View>
     
      <Image source={{
      uri:imageURL
      }}
      style={image}
      />
      
    </TouchableOpacity>
  )
}