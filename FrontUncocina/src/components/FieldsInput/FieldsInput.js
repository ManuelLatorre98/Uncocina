import { Text, View } from 'react-native';
import { FieldInputStyles } from './styles';
import CustomDynamicTextInput from '../CustomTextInput/CustomDynamicTextInput';


export default function FieldsInput(props) {
  const {container, header, headerText, line} = FieldInputStyles
  const {control,textFirstRule,title,placeholder, name, itemName} = props
  
  return (
    <View style={container}>
      <View style={header}>
        <Text style={headerText}>{title}</Text>
        <View style={line}></View>
      </View>

      <CustomDynamicTextInput
        name={name}
        itemName={itemName}
        maxLength= {255}
        placeholder={placeholder}
        control={control}
        rules={
          {
            required:textFirstRule,
          }
        }
      />
    </View>
  )
}

