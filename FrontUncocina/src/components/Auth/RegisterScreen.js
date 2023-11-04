import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { homeStyles } from './styles';
import { registerUser, resetAuth} from '../../store/slices/auth/authSlice';
import SubmitButton from '../SubmitButton/SubmitButton';
import CustomTextInput from '../CustomTextInput/CustomTextInput';
import Logo from './Logo';
import RedirectButton from '../RedirectButton/RedirectButton';
import { setIsShow } from '../../store/slices/navBar/navBar';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  const PASS_REGEX = /^(?=.*\d)[0-9a-zA-Z]{4,}$/
  const { control, trigger, handleSubmit, formState: {errors}}= useForm()
  const dispatch = useDispatch()
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const {error, success} = useSelector((state) => state.auth)
  const { show } = useSelector((state) => state.navBar)
  const navigation = useNavigation()

  async function onRegisterPressed(data){
    dispatch(registerUser(data))
  }
  useEffect(()=>{
    if(show) dispatch(setIsShow(false))
    if(success){
      setShowErrorMessage(false)
      navigation.navigate("RecipesMain")
    }

    if(error){
      setShowErrorMessage(true)
      trigger(['user_email','user_name'])
    }
    
    dispatch(resetAuth())
  },[error,success,trigger])

  
  return (
    <ScrollView 
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>

      <View style={homeStyles.container}>
        <Logo/>
        {showErrorMessage &&  <Text style={homeStyles.errorApiMessageText}>{'Email o nombre de usuario ya existentes'}</Text>}
        <CustomTextInput
          name='user_email'
          isEmail={true}
          maxLength= {255}
          placeholder={"Email"}
          control={control}
          rules={
            {
              required:'Ingrese su email',
              validate: ()=>!error,
              pattern: {value: EMAIL_REGEX, message: "Email invalido"}
            }
          }
        />

        <CustomTextInput
          name='user_name'
          isUserName={true}
          maxLength={64}
          placeholder={"Usuario"}
          control={control}
          rules={
            {
              required:'Ingrese su nombre de usuario',
              validate: ()=>!error, 
              minLength:{
                value:4,
                message: 'El nombre de usuario debe tener al menos 4 caracteres'
              }
            }
          }
        />
        <CustomTextInput
          name='password'
          isPass={true}
          maxLength={64}
          placeholder={"Contraseña"}
          hideText={true}
          control={control}
          rules={
            {
              required:'Ingrese su contraseña',
              pattern: {value: PASS_REGEX, message: "La contraseña debe tener 4 caracteres con al menos un número y una letra"}
            }
          }
        />
        

        <SubmitButton text={"Registrarse"} onPress={handleSubmit(onRegisterPressed)}/>
        <RedirectButton
          message= "Ya estás registrado?"
          buttonText= "Iniciar Sesión" 
          path="Home"
        />
      </View>
    </ScrollView>
  );
}
