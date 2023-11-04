import { FieldInputStyles} from './styles';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TouchableOpacity, View } from 'react-native';


export default function ButtonAddField(props) {
  const {line, addIcon,addInput, containerAdd} = FieldInputStyles 
  const {onPress} = props 
  return (
    <View style={containerAdd}>
      <TouchableOpacity style={addInput} onPress={onPress}>
        <View style={line}></View>
        <FontAwesomeIcon icon={faPlus} size={20} style={addIcon}/>
        <View style={line}></View>
      </TouchableOpacity>
    </View> 

  )
}

