// services/mealApi.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://www.themealdb.com/api/json/v1/1/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Search meals by name
export const searchMealsByName = async (name) => {
    const response = await api.get(`search.php?s=${name}`);
    return response.data;
};

// Search meals by first letter
export const searchMealsByFirstLetter = async (letter) => {
    const response = await api.get(`search.php?f=${letter}`);
    return response.data;
};
