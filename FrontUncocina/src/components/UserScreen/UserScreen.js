import { View } from 'react-native';
import SubmitButton from '../SubmitButton/SubmitButton';
import { UserScreenStyles } from './styles';
import Logo from '../Auth/Logo';
import { useDispatch } from 'react-redux';
import { fullReset } from '../../store/slices/auth/authSlice';
import { reset} from '../../store/slices/navBar/navBar';

export default function UserScreen() {
  const {container} = UserScreenStyles
  const dispatch = useDispatch()
  function logOut(){
    dispatch(reset()) //Reset the navbar
    dispatch(fullReset())
  }
  return (
    <View style={container}>
      <Logo />
      <SubmitButton text={"Cerrar sesión"} onPress={logOut
      } />
    </View>
  )
}

