import { useState } from "react";
import MealCard from "./MealCard";
import axios from "axios";

const RandomMealGenerator = () => {
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getRandomMeal = async () => {
        setLoading(true);
        setError("");
        setMeal(null);

        try {
            const res = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php");
            setMeal(res.data.meals[0]);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch a random meal. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full mt-6 text-center">
            <button
                onClick={getRandomMeal}
                className="bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition"
            >
                🎲 Random Meal Generator
            </button>

            {loading && <p className="mt-4 text-base text-gray-600">Fetching a random meal...</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
            {meal && (
                <div className="mt-6 flex justify-center ">
                    <MealCard meal={meal} />
                </div>
            )}
        </div>
    );
};

export default RandomMealGenerator;
