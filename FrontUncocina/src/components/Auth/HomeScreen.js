import { useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, resetAuth} from '../../store/slices/auth/authSlice';
import SubmitButton from '../SubmitButton/SubmitButton';
import CustomTextInput from '../CustomTextInput/CustomTextInput';
import Logo from './Logo';
import RedirectButton from '../RedirectButton/RedirectButton';
import { useNavigation } from '@react-navigation/native';
import { setIsShow} from '../../store/slices/navBar/navBar';
import { homeStyles } from './styles';

export default function HomeScreen() {
  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  const PASS_REGEX = /^(?=.*\d)[0-9a-zA-Z]{4,}$/
  const { control, trigger, handleSubmit, formState: {errors}}= useForm()
  const dispatch = useDispatch()
  const {error, errorMsg, success, token} = useSelector((state) => state.auth)
  const { show } = useSelector((state) => state.navBar)
  const navigation = useNavigation()

  async function onSignInPressed(data){
    dispatch(loginUser(data))
  }

  useEffect(()=>{
    if(show) dispatch(setIsShow(false))
    if(success){
      navigation.navigate("RecipesMain")
    }

    if(error){
      if(errorMsg === 'User not exist in data base'){
        trigger(['user_email'])
      }else if(errorMsg === 'Invalid password'){
        trigger(['password'])
      }
    }
    dispatch(resetAuth())
    
  },[error,success,trigger])
  return (
    <ScrollView 
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View style={homeStyles.container}>
        <Logo/>
        
        <CustomTextInput
          name='user_email'
          isEmail={true}
          maxLength= {255}
          placeholder={"Email"}
          control={control}
          rules={
            {
              required:'Ingrese su email',
              validate: ()=>(!error ? true : 'Email no registrado'),
              pattern: {value: EMAIL_REGEX, message: "Email invalido"}
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
              validate: ()=>(!error? true : 'Contraseña invalida'),
              pattern: {value: PASS_REGEX, message: "La contraseña debe tener 4 caracteres con al menos un número y una letra"}
            }
          }
    
        />
        <SubmitButton text={"Login"} onPress={handleSubmit(onSignInPressed)}/>
        <RedirectButton 
          message= "No tienes cuenta?"
          buttonText= "Registrarse" 
          path="Register"
        />
      </View>
    </ScrollView>
  )
}

