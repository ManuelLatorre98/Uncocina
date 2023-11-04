import { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import RecipeDataHeader from "./RecipeDataHeader";
import { recipeDataScreenStyles } from "./styles";
import RecipeInfoCard from '../RecipeInfoCard/RecipeInfoCard';
import { useDispatch, useSelector } from "react-redux";
import IngredientsInfoCard from "../RecipeInfoCard/IngredientsInfoCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CalifScreen from "./CalifScreen";
import { setIsShow } from "../../store/slices/navBar/navBar";
import { ENDPOINT_CALIF, ENDPOINT_CALIF_ACTUAL } from "../../services/routes";
import { getQueryService, postService, putService } from "../../services/apiService";
import { updateRecipeAvgCalif } from "../../store/slices/recipes/recipesSlice";

export default function RecipeDataScreen(){
  const { container, scrollContainer} = recipeDataScreenStyles
  //ESTADO DE MOSTRADO DE INGREDIENTS
  const [showIngredients, setShowIngredients] = useState(false)
  const [makeCalif, setMakeCalif] = useState(false)
  const [userCalif, setUserCalif] = useState(1) //Buscar calif vieja del usuario
  const [oldCalif, setOldCalif] = useState(1)
  const dispatch = useDispatch()


  const { user_email, user_name, token} = useSelector(state=> state.auth)
  const { recipes, recipeSelected } = useSelector(state => state.recipes)
  const { show } = useSelector(state => state.navBar)


  //STATES
  const [recipeData, setRecipeData] = useState(
    {
      recipe_name:recipes[recipeSelected].recipe_name,
      recipe_user_email:recipes[recipeSelected].user_email,
      recipe_user_name:recipes[recipeSelected].user_name,
      user_email:user_email,
      user_name:user_name,
    })
  const [isMounted, setIsMounted] = useState(false);

  //METHODS
  function onPressShowIngredients(){
    setShowIngredients(!showIngredients)
  }

  function handleMakeCalif(){
    setMakeCalif(!makeCalif)
  }

  async function getActualCalif(){
    const resp= await getQueryService(`${ENDPOINT_CALIF_ACTUAL}`, recipeData, token)
    setUserCalif(resp.data.calification)
    if(resp.data.calification!=undefined){
      setOldCalif(resp.data.calification)//Saves the first calif recieved by the api
    }else{
      setOldCalif(0)
    }
    return resp.data
  }
  
  async function postCalif(){
    const califData= {...recipeData, calif: userCalif}
    const resp= await postService(`${ENDPOINT_CALIF}`, califData, token)
    dispatch(updateRecipeAvgCalif({index:recipeSelected, resp:resp.data}))
    
  }

  async function updateCalif(){
    const califData= {...recipeData, calif: userCalif}
    const resp= await putService(`${ENDPOINT_CALIF}`, califData, token)
    
    dispatch(updateRecipeAvgCalif({index:recipeSelected, resp:resp.data}))
  }

  function handleChangeCalif(starNumber){//StarNumber values goes from 0 to 5
    setUserCalif(starNumber+1)
  }

  useEffect(()=>{
    if(show) dispatch(setIsShow(false))
  },[])

  useEffect(()=>{
    if(isMounted){
      if(makeCalif){
        getActualCalif()
      }else{  
        if(userCalif!=undefined){
          oldCalif==0?postCalif(): updateCalif()
        }
        
      }
    }else{
      setIsMounted(true);
    }
  },[makeCalif])

  useEffect(()=>{
    setRecipeData(()=>(
    {
      recipe_name:recipes[recipeSelected].recipe_name,
      recipe_user_email:recipes[recipeSelected].user_email,
      recipe_user_name:recipes[recipeSelected].user_name,
      user_email:user_email,
      user_name:user_name,
    }))
  },[recipeSelected])

  return(
    <View style={container}>
      <GestureHandlerRootView>
        <ScrollView style={scrollContainer}>
          <RecipeDataHeader handleMakeCalif={handleMakeCalif} recipeData={recipeData} recipes={recipes} recipeSelected={recipeSelected} token={token}/>
          <RecipeInfoCard 
          onPressShowIngredients={onPressShowIngredients}
          showIngredients={showIngredients}/>
        </ScrollView>
        {showIngredients && <IngredientsInfoCard ingredients={recipes[recipeSelected].ingredients}/>}
      </GestureHandlerRootView >
      {makeCalif && <CalifScreen handleMakeCalif={handleMakeCalif} userCalif={userCalif} handleChangeCalif={handleChangeCalif}/>}
    </View>
  )
}