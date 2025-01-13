import Category from "../components/Category";
import commonAPI from "./commonAPI";
import {SERVERURL} from "./serverURL";


//post video detils to server - http://localhost:3000/uploadVideos through post method called in add component
export const saveVideoAPI = async (videoDetails) =>{
    return await commonAPI('POST',`${SERVERURL}/uploadVideos`,videoDetails)
}

//get all recipe videos form server-http://localhost:3000/uploadVideos through get method called in view component
export const getAllRecipeVideosAPI = async ()=>{
    return await commonAPI('GET',`${SERVERURL}/uploadVideos`,'')
}

//post data of tried videos to server-http://localhost:3000/triedRecipe through post method called by videocard
export const saveTriedRecipeVideoAPI = async (triedVideoDetails) =>{
    return await commonAPI('POST',`${SERVERURL}/triedRecipe`,triedVideoDetails)
}

//get data to tried videos- from http://localhost:3000/triedRecipe
export const getAllTriedRecipeVideosAPI = async ()=>{
    return await commonAPI('GET',`${SERVERURL}/triedRecipe`,'')
}

//put method used to update the description of tried recipe-http://localhost:3000/triedRecipe
export const upDateTriedRecipeDescription = async (id,updateTriedRecipe)=>{
    return await commonAPI('PUT',`${SERVERURL}/triedRecipe/${id}`,updateTriedRecipe)
}

//delete tried recipe 
export const deleteTriedRecipe = async (id)=>{
    return commonAPI('DELETE',`${SERVERURL}/triedRecipe/${id}`,{})
}

//delete recipe video, http://localhost:3000/uploadVideos
export const deleteRecipeVideo = async (id)=>{
    return commonAPI('DELETE',`${SERVERURL}/uploadVideos/${id}`,{})
}

//create categories to http://localhost:3000/categories
export const saveCategoryTypesAPI = async (categoryDetails)=>{
    return commonAPI('POST',`${SERVERURL}/categories`,categoryDetails)
}

//get data from category 
export const getAllCateoryAPI = async ()=>{
    return await commonAPI('GET',`${SERVERURL}/categories`,{})
}

//delete data from category 
export const deleteCategoryDetails = async (id) =>{
    return await commonAPI('DELETE',`${SERVERURL}/categories/${id}`)
}

//update category 
export const updateCategoryAPI = async (category) => {
    return await commonAPI('PUT',`${SERVERURL}/categories/${category.id}`,category)
}