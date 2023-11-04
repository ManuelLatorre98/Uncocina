import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faAngleLeft, faHeart as fullHeart  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text, TouchableOpacity, View } from "react-native";
import Calification from "../Calification/Calification";
import { headerStyles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";
import { deleteService, postService } from "../../services/apiService";
import { ENDPOINT_FAV, ENDPOINT_HAVEFAV } from "../../services/routes";


export default function RecipeDataHeader(props){
  const { container, titleContainer, backIcon,favIcon, titleText } = headerStyles
  const {handleMakeCalif,recipeData, recipes, recipeSelected, token } = props
  const navigation = useNavigation()

  //SELECTORS
  const [haveFav, setHaveFav]= useState(false);

  //STATES
  
  //METHODS
  function onPressBack(){
    navigation.goBack()
  }

  async function onPressFav(){
    haveFav ? deleteFavReq() : addFavReq()
  }
  async function isFavReq(){
      const respHaveFav= await postService(`${ENDPOINT_HAVEFAV}`, recipeData, token) 
      setHaveFav(respHaveFav.data)
  }

  async function deleteFavReq(){
    await deleteService(`${ENDPOINT_FAV}`, recipeData, token)
    setHaveFav(false)
  }

  async function addFavReq(){
    await postService(`${ENDPOINT_FAV}`, recipeData, token)
    setHaveFav(true)
  }

  useEffect(()=>{
    isFavReq()
  },[])
  return(
      <View style={container}>
        <View style={titleContainer}>
          <TouchableOpacity onPress={onPressBack}>
            <FontAwesomeIcon icon={faAngleLeft} size={25} style={backIcon}/>
          </TouchableOpacity>
          
          <Text style={titleText} numberOfLines={2}>{recipes[recipeSelected].recipe_name}</Text>

          <TouchableOpacity onPress={onPressFav}>
            {!haveFav&& <FontAwesomeIcon icon={faHeart} size={25} style={favIcon}/>}
            {haveFav&& <FontAwesomeIcon icon={fullHeart} size={25} style={favIcon}/>}
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleMakeCalif}>
          <Calification avgCalif={recipes[recipeSelected].avgCalif}/>
        </TouchableOpacity>
      </View>
  )
}