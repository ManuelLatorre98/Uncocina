import { Keyboard, ScrollView, ToastAndroid, View } from 'react-native';
import CustomTextInput from '../CustomTextInput/CustomTextInput';
import SubmitButton from '../SubmitButton/SubmitButton';
import { AddRecipeStyles } from './styles';
import { useForm } from 'react-hook-form';
import UploadImage from '../UploadImage/UploadImage';
import { useState } from 'react';
import { uploadFile } from '../../services/firebase/config';
import CustomPicker from '../CustomPicker/CustomPicker';
import FieldsInput from '../FieldsInput/FieldsInput';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../store/slices/categories/categories';
import { useEffect } from 'react';
import { postService } from '../../services/apiService';
import { ENDPOINT_RECIPE } from "../../services/routes";
import { useNavigation } from '@react-navigation/native';
import { setIsShow, setPressedButton } from '../../store/slices/navBar/navBar';

export default function AddRecipeScreen() {
  const { control, trigger, handleSubmit, formState: {errors}, reset}= useForm()
  const {scrollContainer,container} = AddRecipeStyles
  const INTEGER_REGEX= /^\d+$/
  const dispatch = useDispatch()

  //STATES
  const [currentOffset, setCurrentOffset] = useState(0)
  const [lastOffset, setLastOffset] = useState(0)

  //SELECTORS
  const {user_email, user_name, token} = useSelector((state) => state.auth)
  const { show } = useSelector((state) => state.navBar)
  const { categories } = useSelector(state => state.categories)
  
  const navigation = useNavigation()
  const pickerOptions=["Facil", "Media", "Dificil"]
  function successToast(){
    ToastAndroid.show("Receta agregada exitosamente", ToastAndroid.SHORT)
  }
  function errorToast(e){
    ToastAndroid.show(e, ToastAndroid.LONG)
  }

  async function uploadImage(uri){
    const response = await fetch(uri)
    const blob = await response.blob();
    const resultURL= await uploadFile(blob)
    return resultURL

  }

  async function onSubmit(data){
    const {imageURL} = data
    data.steps=data.steps.map(item=>item.paso) //Format needed for req
    data.imageURL=await uploadImage(imageURL)
    data={...data, user_email, user_name}
    data.steps= JSON.stringify(data.steps)
    data.ingredients=JSON.stringify(data.ingredients)
    try{
      await postService(`${ENDPOINT_RECIPE}/create`,data, token)
      successToast()
      reset()
      //Redirect to recipesMainScreen
      dispatch(setIsShow(true))
      dispatch(setPressedButton(1))//1=recipesMainScreen,
    }catch(e){
      let msg="Error: Intente nuevamente";
      if(e.response.data.error){
        msg=e.response.data.error
      }
      errorToast(msg)
    }
    
  }



  function getCategoriesNames(){
    const categoriesNames=[]
    categories.map(category => categoriesNames.push(category.category_name))
    return categoriesNames
  }

  useEffect(()=>{
    if(!show) dispatch(setIsShow(false))
    dispatch(getAllCategories()) 
  },[])
  const [showingKeyboard, setShowingKeyboard] = useState(false)
  function onScroll(event){
    Keyboard.addListener('keyboardDidHide', ()=>{
      if(showingKeyboard)setShowingKeyboard(false)
    })
    Keyboard.addListener('keyboardDidShow', ()=>{
      if(!showingKeyboard)setShowingKeyboard(true)
    })
    
    setCurrentOffset(event.nativeEvent.contentOffset.y)
    let dif= currentOffset - lastOffset
    setLastOffset(currentOffset)
    if(dif<0){
      if(!show && !showingKeyboard) dispatch(setIsShow(true))
    }else if(dif>0){
      if(show || showingKeyboard) dispatch(setIsShow(false))
    }
  }
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={scrollContainer}
      onScroll={onScroll}
    >
      <View style={container}>
     
        <UploadImage 
          control={control}
          rules={
            {
              required:'Ingrese una imagen'
            }
          }
        />
        <CustomTextInput
          name='recipe_name'
          maxLength= {255}
          placeholder={"Nombre de receta"}
          control={control}
          rules={
            {
              required:'Ingrese nombre de la receta',
            }
          }
        />
        <CustomTextInput
          name='estimatedTime'
          maxLength= {255}
          placeholder={"Tiempo de realización"}
          control={control}
          rules={
            {
              required:'Ingrese un tiempo de realización',
              pattern:{value:INTEGER_REGEX,
              message: "El tiempo debe ser un número positivo"}
            }
          }
        />
        <CustomPicker 
          items={getCategoriesNames()}
          placeholder="Categoría"
          name="categories"
          control={control}
          rules={
            {
              required:'Seleccione alguna opción',
            }
          }
        />

        <CustomPicker 
          items={pickerOptions}
          placeholder="Dificultad"
          control={control}
          name="difficulty"
          rules={
            {
              required:'Seleccione alguna opción',
            }
          }
        />
        <FieldsInput
          control={control}
          textFirstRule="Ingrese el ingrediente"
          title="Ingredientes"
          placeholder="Ingrediente "
          name="ingredients"
          itemName="nombre"
        />

        <FieldsInput
          control={control}
          textFirstRule="Ingrese el paso a seguir"
          title="Pasos"
          placeholder="Paso "
          name="steps"
          itemName="paso"
        />
        <SubmitButton text={"Publicar"} onPress={handleSubmit(onSubmit)}/> 
      </View>
    </ScrollView>
  )
}

