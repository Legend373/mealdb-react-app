import { useEffect, useState, useCallback } from "react";
import SearchBar from "../components/SearchBar";
import MealCard from "../components/MealCard";
import { searchMealsByName, searchMealsByFirstLetter } from "../service/mealApi";
import Hero from "../components/Hero";

const Home = () => {
    const [query, setQuery] = useState("");
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [hasSearched, setHasSearched] = useState(false);

    const fetchMeals = useCallback(async () => {
        if (!query.trim()) return;

        setLoading(true);
        setError("");
        setMeals([]);
        try {
            const trimmedQuery = query.trim();
            let data = await searchMealsByName(trimmedQuery);

            if (!data.meals && trimmedQuery.length === 1) {
                data = await searchMealsByFirstLetter(trimmedQuery);
            }

            setMeals(data.meals || []);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch meals. Please try again.");
        } finally {
            setLoading(false);
            setHasSearched(true);
        }
    }, [query]);

    useEffect(() => {
        fetchMeals();
    }, [fetchMeals]);

    return (
        <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
            <Hero />

            <SearchBar
                value={query}
                onChange={setQuery}
                onSearch={fetchMeals}
            />

            <div className="w-full max-w-screen-xl mt-20 bg-gray-100">
                {loading && <p className="text-center text-base">Loading meals...</p>}

                {!loading && error && (
                    <p className="text-center text-red-500 text-base">{error}</p>
                )}

                {!loading && hasSearched && meals.length === 0 && (
                    <p className="text-center text-gray-500 text-base">No meals found.</p>
                )}

                {!loading && meals.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {meals.map((meal) => (
                            <MealCard key={meal.idMeal} meal={meal} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
