import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import {Text, StyleSheet, View} from 'react-native';
import { homeStyles } from './commonStyles';
export default function ShowPassCheckBox() {
  const [isChecked, setChecked] = useState(false);
  return (
    <View style={homeStyles.showPassContainer}>
       <Checkbox 
          style={homeStyles.showPassCheckBox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#4630EB' : undefined}
        />
        <Text style={homeStyles.showPassText}>Mostrar contraseña</Text>
      </View>
  ) //USAR ICONO EN LUGAR DE CHECKBOX
}