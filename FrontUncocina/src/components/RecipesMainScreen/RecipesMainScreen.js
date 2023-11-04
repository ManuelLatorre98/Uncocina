import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../store/slices/categories/categories";
import { setIsShow} from "../../store/slices/navBar/navBar";
import { fullReset } from "../../store/slices/recipes/recipesSlice";
import CategorySlide from "../CategorySlide/CategorySlide";
import RecipeCard from "../RecipeCard/RecipeCard";
import Selector from "../Selector/Selector";
import HelloSlide from "./HelloSlide";
import { recipesStyles } from "./styles";
import BackToTopFlatListButton from "../BackToTopFlatListButton/BackToTopFlatListButton";


export default function RecipesMainScreen(props){
  //PROPS
  const {onDispatch, textHeader} = props
  //STATES
  const [currentOffset, setCurrentOffset] = useState(0)
  const [lastOffset, setLastOffset] = useState(0)
  const [pagination, setPagination] = useState({from:0, amount:10})
  
  const [showSelectCategories, setShowSelectCategories] = useState(false)
  const [orderBy, setOrderBy] = useState('desc')
  const [selectedCategories, setSelectedCategories] = useState([])
  const[catChanged, setCatChanged] =useState(false)
  const[orderByChanged, setOrderByChanged]=useState(false)
  const[showBackToTop, setShowBackToTop] = useState(false)

  //SELECTORS
  const { show } = useSelector(state => state.navBar)
  const dispatch = useDispatch()
  const {recipes, isEndList} = useSelector((state) => state.recipes)
  const { categories } = useSelector(state => state.categories)

  //HANDLE EVENTS
  function onScroll(event){
    setCurrentOffset(event.nativeEvent.contentOffset.y)
    let dif= currentOffset - lastOffset
    setLastOffset(currentOffset)
    if(dif<0){
      if(!show) dispatch(setIsShow(true))
      if(!showBackToTop) setShowBackToTop(true)
    }else if(dif>0){
      if(show) dispatch(setIsShow(false))
      if(showBackToTop) setShowBackToTop(false)
    }
  }

  useEffect(()=>{//This is to detect when the scrolls its high enough and hide backToTopButton
    if(currentOffset<300 && showBackToTop)setShowBackToTop(false)
  },[currentOffset])

  function handleOrderBy(){
    setOrderBy(prevOrder => prevOrder=='desc'? 'asc' : 'desc')
    setOrderByChanged(true)
    dispatch(fullReset())
    resetPagination()
  }

  function handleCategories(){//Manages categories button
    show ? dispatch(setIsShow(false)) : dispatch(setIsShow(true))
    setShowSelectCategories(!showSelectCategories)
  }

  function handleSelectCategory(categoryName){
    setCatChanged(true)
    dispatch(fullReset())
    resetPagination()
    setSelectedCategories(prevSelected => {
      const newSelected= [...prevSelected]
      if(newSelected.includes(categoryName)){ //Removes from selected
        const index= newSelected.indexOf(categoryName)
        newSelected.splice(index, 1);
      }else{
        newSelected.push(categoryName)
      }
      return newSelected
    })
  }

  function getCategoriesNames(){
    const categoriesNames=[]
    categories.map(category => categoriesNames.push(category.category_name))
    return categoriesNames
  }
  
  let listViewRef //Reference to flatList
  function backToTopOnPress(){
    listViewRef.scrollToOffset({offset:0, animated:true})
  }

  const renderTopElements=()=>{
    return (
      <View>
        <HelloSlide textHeader={textHeader}/>
        <CategorySlide 
          orderBy={orderBy}
          handleOrderBy={handleOrderBy} 
          handleCategories={handleCategories} 
          selectedCategories={selectedCategories} 
          handleSelectCategory={handleSelectCategory}
          categories={categories}
        />
      </View>
    )
  }
  const renderElements= ({item})=>{
    const index=recipes.indexOf(item)
    return (
    <View style={recipesStyles.recipes}>
      <RecipeCard 
        recipe_name={item.recipe_name} 
        avgCalif={item.avgCalif ==null? 0: item.avgCalif}
        imageURL={item.imageURL}
        estimatedTime={item.estimatedTime}
        index={index}
      />
    </View>
    )
  }

  const renderEmptyElements=()=>{
    return(
      <Text style={recipesStyles.noRecipesText}>No existen recetas</Text>
    )

  }


  //PAGINATION
  const handleLoadMore = ()=>{
    if(!isEndList && !catChanged && !orderByChanged){
      setPagination(prevPagination=>{
        return {
          from:prevPagination.from+prevPagination.amount,
          amount:prevPagination.amount
        }
      })
    }
    setOrderByChanged(false)
    setCatChanged(false)
    
  }

  const resetPagination=()=>{
    setPagination((prevPagination)=>{
      return {
        from:0,
        amount:prevPagination.amount
      }
    })
  }

 

  //API
  useEffect(()=>{
    if(!show) dispatch(setIsShow(true))
    dispatch(getAllCategories()) //There will not be many categories, so I get them all when load the page
    
  },[])

  useEffect(()=>{
    
    onDispatch({
      from:pagination.from,
      amount:pagination.amount,
      sort_by:"creationDate",
      order_by:orderBy, 
      categories:selectedCategories,
    })

  },[pagination])

  
  return(
    <View style={recipesStyles.container}>
          <FlatList 
            ref={(ref)=>listViewRef=ref}
            nestedScrollEnabled
            onScroll={onScroll}
            data={recipes}
            renderItem={renderElements}
            ListEmptyComponent={renderEmptyElements}
            ListHeaderComponent={renderTopElements}
            keyExtractor={(item,index)=> index.toString()}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.03}
       
          />

      {showSelectCategories && 
        <Selector 
          titleText={'Categorías'} 
          items={getCategoriesNames()} 
          selectedItems= {selectedCategories}
          handleItems={handleCategories}
          handleSelectItem={handleSelectCategory}
        />
      }
      {showBackToTop && <BackToTopFlatListButton 
        backToTopOnPress={backToTopOnPress}
      />}
    </View>
  )
}