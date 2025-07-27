// services/mealApi.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://www.themealdb.com/api/json/v1/1/',
    headers: {
        'Content-Type': 'application/json',
    },
});


export const searchMealsByName = async (name) => {
    const response = await api.get(`search.php?s=${name}`);
    const meals = response.data.meals || [];


    const filteredMeals = meals.filter((meal) =>
        meal.strMeal.toLowerCase().startsWith(name.toLowerCase())
    );

    return { meals: filteredMeals };
};
// Search meals by first letter
export const searchMealsByFirstLetter = async (letter) => {
    const response = await api.get(`search.php?f=${letter}`);
    return response.data;
};
// Get meals by category
export const getMealsByCategory = async (category) => {
    const response = await api.get(`filter.php?c=${category}`);
    return response.data;
};

// Get all categories
export const getAllCategories = async () => {
    const response = await api.get(`categories.php`);
    return response.data;
};