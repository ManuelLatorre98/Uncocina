import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { useState } from "react"
import { Controller } from "react-hook-form"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { textInputStyles} from "./styles"
import { setIsShow } from "../../store/slices/navBar/navBar"


export default function CustomTextInput(props) {
  const {control, name, rules={},maxLength, placeholder, hideText, isEmail, isPass, isUserName} = props
  const [showPass, setShowPass] = useState(hideText || false)
  const { show } = useSelector((state) => state.navBar)
  const dispatch = useDispatch()

  function changeShowPass (){
    setShowPass(prevShowPass => !prevShowPass)
  }
  
  return(
    <Controller
        control={control}
        name={name}
        rules={rules}
        render = {({ field: {value, onChange, onBlur}, fieldState: {error}}) => (
          <View style={textInputStyles.textInputContainer}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              onFocus={()=>{
                if(show) dispatch(setIsShow(false))}
              }
              email={isEmail}
              username={isUserName}
              password={isPass}
              maxLength={maxLength}
              placeholder={placeholder}
              secureTextEntry={showPass}
              placeholderTextColor= {"#7c7979"}
              style={[textInputStyles.submitTextInput, error &&textInputStyles.submitTextInputError]}
            />
            
            {error && error.message!="" && <Text style={textInputStyles.errorMessageText}>{error.message}</Text>}
        
            {isPass ? 
            
            <TouchableOpacity style={textInputStyles.textInputIcon} onPress={changeShowPass}>

              {showPass ? 
              <FontAwesomeIcon icon={faEye} size={30} style={textInputStyles.icon}/> /* OpenEye */ 
              : <FontAwesomeIcon icon={faEyeSlash} size={30} style={textInputStyles.icon}/>/* ClosedEye */ }

            </TouchableOpacity>: ''}      
          </View>
        )}
      />

      
  )
}