import 'react-native-gesture-handler';
import { ScrollView } from "react-native-gesture-handler";
import { Image, View } from "react-native";
import { recipeInfoCardStyles } from "./styles";
import StepsList from '../StepsList/StepsList';
import HeaderRecipeInfoCard from './HeaderRecipeInfoCard';
import { recipeDataScreenStyles } from '../RecipeDataScreen/styles';
import { useSelector } from 'react-redux';


export default function RecipeInfoCard(props){
  const { container, stepListContainer} = recipeInfoCardStyles
  const {onPressShowIngredients, showIngredients} = props
  const { recipes, recipeSelected } = useSelector(state => state.recipes)


  return(
    <ScrollView style={container} contentContainerStyle={{alignItems:'center'} }>
      
      <Image source={{
        uri:recipes[recipeSelected].imageURL
        }} 
        style={recipeDataScreenStyles.image}
        />
        <View style={stepListContainer}>
          <HeaderRecipeInfoCard  
            onPressShowIngredients={onPressShowIngredients}
            showIngredients={showIngredients}
            estimatedTime={recipes[recipeSelected].estimatedTime}
          />
          <StepsList steps={recipes[recipeSelected].steps}/>
        </View>
    </ScrollView>
  )
}