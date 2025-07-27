import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../service/mealApi";

const MealDetail = () => {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchMeal = async () => {
            try {
                const res = await api.get(
                    `/lookup.php?i=${id}`
                );
                const fetchedMeal = res.data.meals?.[0] || null;
                setMeal(fetchedMeal);
                checkIfFavorite(fetchedMeal?.idMeal);
            } catch (err) {
                console.error("Failed to fetch meal detail", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMeal();
    }, [id]);

    const checkIfFavorite = (mealId) => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFavorite(favorites.some((fav) => fav.idMeal === mealId));
    };

    const handleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (isFavorite) {
            const updated = favorites.filter((fav) => fav.idMeal !== meal.idMeal);
            localStorage.setItem("favorites", JSON.stringify(updated));
            setIsFavorite(false);
        } else {
            favorites.push({
                idMeal: meal.idMeal,
                strMeal: meal.strMeal,
                strMealThumb: meal.strMealThumb,
                strCategory: meal.strCategory,
            });
            localStorage.setItem("favorites", JSON.stringify(favorites));
            setIsFavorite(true);
        }
    };

    if (loading) return <div className="text-center p-10">Loading...</div>;
    if (!meal) return <div className="text-center p-10 text-red-500">Meal not found.</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-md">
            <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-gray-800">{meal.strMeal}</h2>
                <button
                    onClick={handleFavorite}
                    className={`px-4 py-2 rounded-md font-semibold transition-colors ${isFavorite ? "bg-red-500 text-white" : "bg-orange-400 text-white"
                        }`}
                >
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>
            </div>

            <p className="text-orange-500 text-md font-medium mb-4">
                {meal.strCategory} | {meal.strArea}
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">{meal.strInstructions}</p>

            <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
            <ul className="list-disc list-inside text-gray-600">
                {Array.from({ length: 20 }, (_, i) => {
                    const ing = meal[`strIngredient${i + 1}`];
                    const measure = meal[`strMeasure${i + 1}`];
                    return ing?.trim() && (
                        <li key={i}>{ing} - {measure}</li>
                    );
                })}
            </ul>

            {meal.strYoutube && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Watch on YouTube:</h3>
                    <a
                        href={meal.strYoutube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        {meal.strYoutube}
                    </a>
                </div>
            )}
        </div>
    );
};

export default MealDetail;
