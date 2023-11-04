import { Text, View } from 'react-native';
import { PickerStyles } from './styles';
import { Controller } from 'react-hook-form';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useRef } from 'react';

export default function CustomPicker(props) {
  const {container,picker,pickerItemEmpty, pickerNoPlaceholder, pickerError, errorMessage} =PickerStyles
  const {name,items, placeholder, control,rules}=props

  //STATES
  const [pickerFocused, setPickerFocused] = useState(false)
  
  const pickerRef = useRef();

  const renderItems =items.map((item, i) => {
      return<Picker.Item key={`picker${i}`} label={item} value={item} />
    })
  
  return (
    <Controller 
      name={name}
      control={control}
      defaultValue={''}
      rules={rules}
     
      render={({ field: { onChange, value }, fieldState:{error} }) => (
        <View style={container}>
          <View style={[picker, error && pickerError]}>
            <Picker
              style={value? pickerNoPlaceholder :  pickerItemEmpty}
              ref={pickerRef}
              selectedValue={value}
              onFocus={() => setPickerFocused(true)}
              onBlur={() => setPickerFocused(false)}
              itemStyle={pickerItemEmpty}
              onValueChange={(itemValue, itemIndex) =>{
                value=itemValue
                onChange(itemValue)
              }
              }>
            
              <Picker.Item
                style={pickerFocused? pickerItemEmpty:{}}
                value=""
                label={placeholder}
                enabled={!pickerFocused}
              />
              {renderItems}
            </Picker>
            
          </View>
          {error && <Text style={errorMessage}>{error.message}</Text>}
        </View>
      )}
    />


  )
}

