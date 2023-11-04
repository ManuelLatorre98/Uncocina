import { faHeart, faStar, faUser } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { navBarStyles } from "./styles";
import { setPressedButton } from "../../store/slices/navBar/navBar";

export default function NavButton(props){
  const {navIconSelected, navIconNotSelected} =navBarStyles 
  const {selectedButton} = useSelector((state) => state.navBar)
  const [iconStyle, setIconStyle] = useState(navIconNotSelected)
  const dispatch = useDispatch()
   
  const getIcon = ()=>{
    if(props.iconName === "faUtensils") return faUtensils
    if(props.iconName === "faStar") return faStar
    if(props.iconName === "faPlus") return faPlus
    if(props.iconName === "faHeart") return faHeart
    if(props.iconName === "faUser") return faUser
  }

  const onPress = () =>{
    if(props.buttonNumber != selectedButton){
      dispatch(setPressedButton(props.buttonNumber))
    }
  }

  useEffect(()=>{
    if(props.buttonNumber === selectedButton){
      setIconStyle(navIconSelected)
    }else{
      setIconStyle(navIconNotSelected)
    }    
  },[selectedButton])

  return(
    <TouchableOpacity style={navBarStyles .navButton} onPress={onPress}>
      <FontAwesomeIcon icon={getIcon()} size={25} style={iconStyle}/>
    </TouchableOpacity>
  )
}