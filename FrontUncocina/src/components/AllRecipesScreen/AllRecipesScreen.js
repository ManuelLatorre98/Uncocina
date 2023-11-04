import { useDispatch,} from "react-redux";
import { fullReset, getAllRecipes } from "../../store/slices/recipes/recipesSlice";
import RecipesMainScreen from "../RecipesMainScreen/RecipesMainScreen";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useState } from "react";

export default function AllRecipesScreen(){
  const dispatch = useDispatch();
  const [comesBack, setComesBack] = useState(true)
  function dispatcherAllRecipes(params){
    if(comesBack){
      dispatch(fullReset())
    }
    dispatch(getAllRecipes(params))
  }
  const isFocused= useIsFocused();

  useEffect(()=>{
    !isFocused?setComesBack(true): setComesBack(false)
  },[isFocused])

  return(
    isFocused && <RecipesMainScreen onDispatch={dispatcherAllRecipes}/>
  )
}