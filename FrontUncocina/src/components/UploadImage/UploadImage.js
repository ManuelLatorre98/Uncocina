import { Image, Text, View } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity } from 'react-native';
import { UploadImageStyles } from './styles';
import * as ImagePicker from 'expo-image-picker';
import { Controller } from 'react-hook-form';

export default function UploadImage(props) {
  const {control,rules} = props
  const {container,iconContainer, icon, iconPlus, imageUploaded, containerError, errorMessage} = UploadImageStyles
  //const [image, setImage] = useState(null);
  async function pickImage(){
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
   
    if (!result.canceled) {
      return result.assets[0].uri
    }
    
  }
  

  return (
    <Controller 
      name="imageURL"
      control={control}
      rules={rules}
      defaultValue={null}
      render={({ field: { onChange, value }, fieldState:{error} }) => (
        <View>
          <TouchableOpacity style={[container, error && containerError]} onPress={async ()=>{
            let result= await pickImage()
            value=result
            onChange(result)
            }}>
            {!value && <View style={iconContainer}>
              <FontAwesomeIcon icon={faImage} size={60} style={icon}/>
              <FontAwesomeIcon icon={faPlus} size={20} style={iconPlus}/>
            </View>}
            {value && <Image source={{ uri: value }} style={imageUploaded} />}
          </TouchableOpacity>
          {error && <Text style={errorMessage}>{error.message}</Text>}
        </View>
      )}
    />
  )
}

