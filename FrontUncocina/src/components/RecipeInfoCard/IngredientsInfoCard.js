import 'react-native-gesture-handler';
import BottomSheet, {BottomSheetScrollView}  from '@gorhom/bottom-sheet';
import { Text, View} from "react-native";
import { ingredientsInfoCardStyles } from "./styles";
import { useRef} from 'react';
import {colors} from '../../Theme/theme'
import Step from '../StepsList/Step';

export default function IngredientsInfoCard(props){
  const {container, title, listContainer} = ingredientsInfoCardStyles
  const {ingredients}=props
  const sheetRef = useRef(null);


  //RENDER COMPONENTS
  const ingredientElements = ingredients.map((ingredient, i)=>{
    return(
      <Step stepTitle={'Ingrediente '+(i+1)}
        key={'ingrediente'+i}
        text={ingredient.nombre}
      />
    )
  })  
  // variables
  const snapPoints = [40,'20%','40%','60%','85%'];
  return(
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        index={1}
        backgroundStyle={{backgroundColor:colors.darkBackground}}
        handleIndicatorStyle={{backgroundColor:'gray'}}
      >
        <BottomSheetScrollView style={container}>
          <Text style={title}>Ingredientes</Text>
          <View style={listContainer}>
            {ingredientElements}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>  
  )
}