import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { useEffect} from "react"
import { Controller, useFieldArray } from "react-hook-form"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { dynamicInputStyles, textInputStyles} from "./styles"
import ButtonAddField from "../FieldsInput/ButtonAddField"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

export default function CustomDynamicTextInput(props) {
  const {control, name, rules={},maxLength, placeholder, itemName} = props
  const {fields, append, remove} = useFieldArray({control, name:name})
  const {container, field, fieldContainer, removeField} = dynamicInputStyles

  function deleteField(index){
    remove(index)
  }
  useEffect(()=>{
    append()
  },[])
  return(
    <View style={container}>
     { fields.map(({ id },index)=>(
        <View key={id} style={fieldContainer}>
          <Controller
              control={control}
              name={`${name}[${index}].${itemName}`}
              rules={rules}
              render = {({ field: {value, onChange, onBlur}, fieldState: {error}}) => (
                <View style={{width:'100%'}} >
                  <TextInput
                    multiline={true}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    maxLength={maxLength}
                    placeholder={`${placeholder}${index+1}`}
                    placeholderTextColor= {"#7c7979"}
                    style={[textInputStyles.submitTextInput,field, error &&textInputStyles.submitTextInputError]}
                    id={name}
                    label={`${name} - ${index + 1}`}
                  />
                  
                  {error && error.message!="" && <Text style={textInputStyles.errorMessageText}>{error.message}</Text>}
                  
                </View>
              )}
            />
          {fields.length>1 && 
          <TouchableOpacity onPress={()=>deleteField(index)}>
            <FontAwesomeIcon icon={faTrash} size={20} style={removeField}/>
          </TouchableOpacity>
          }
        </View>
    ))}

    <ButtonAddField onPress={()=>append()}/>
    </View>
  )
}