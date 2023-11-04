import { View } from "react-native";
import { navBarStyles } from "./styles";
import NavButton from "./NavButton";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function NavBar(){
  const {selectedButton} = useSelector((state) => state.navBar)
  const navigation = useNavigation()
  useEffect(()=>{
    switch (selectedButton){
      case 1:
        navigation.navigate("RecipesMain")
        break
      case 2:
        navigation.navigate("Fav")
        break
      case 3:
        navigation.navigate("AddRecipe")
        break
      case 4:
        navigation.navigate("UserScreen")
        break
    } 
  },[selectedButton])
  return(
    <View style = {navBarStyles.navContainer}>
      <NavButton iconName="faUtensils" buttonNumber={1}/>
      {/* <NavButton iconName="faStar"  buttonNumber={2}/> */}
      <NavButton iconName="faHeart" buttonNumber={2}/>
      <NavButton iconName="faPlus"  buttonNumber={3}/>
      <NavButton iconName="faUser" buttonNumber={4}/>
    </View>
  )
}