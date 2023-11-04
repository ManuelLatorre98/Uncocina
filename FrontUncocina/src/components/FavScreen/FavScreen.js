import { useDispatch,} from "react-redux";
import { fullReset, getFavRecipes } from "../../store/slices/recipes/recipesSlice";
import RecipesMainScreen from "../RecipesMainScreen/RecipesMainScreen";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useState } from "react";

export default function FavScreen(){
  const dispatch = useDispatch();
  const [comesBack, setComesBack] = useState(true)
  function dispatcherFavRecipes(params){
    if(comesBack){
      dispatch(fullReset())
    }
    dispatch(getFavRecipes(params))
  }
  const isFocused= useIsFocused();

  useEffect(()=>{
    !isFocused?setComesBack(true): setComesBack(false)
  },[isFocused])

  return(
    isFocused && 
    <RecipesMainScreen 
      onDispatch={dispatcherFavRecipes}
      textHeader={{title:'Tus favoritos', subTitle:'Que vas a cocinar hoy?'}}
    />
  )
}