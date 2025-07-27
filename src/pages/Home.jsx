import { useEffect, useState, useCallback } from "react";
import SearchBar from "../components/SearchBar";
import MealCard from "../components/MealCard";
import Hero from "../components/Hero";
import RandomMealGenerator from "../components/RandomMealGenerator";
import { searchMealsByName, searchMealsByFirstLetter, getMealsByCategory, getAllCategories } from "../service/mealApi";

const Home = () => {
    const [query, setQuery] = useState("");
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [hasSearched, setHasSearched] = useState(false);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("");

    const fetchMeals = useCallback(async (searchTerm) => {
        const q = searchTerm.trim();
        if (!q) return;

        setLoading(true);
        setError("");
        setMeals([]);
        setActiveCategory(""); // Reset category on search

        try {
            const data = await searchMealsByName(q);
            setMeals(data.meals || []);
            setQuery(q);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch meals. Please try again.");
        } finally {
            setLoading(false);
            setHasSearched(true);
        }
    }, []);

    const fetchCategories = useCallback(async () => {
        try {
            const data = await getAllCategories();
            setCategories(data.categories || []);
        } catch (err) {
            console.error("Error loading categories", err);
        }
    }, []);

    const fetchMealsByCategory = async (category) => {
        setLoading(true);
        setError("");
        setMeals([]);
        setQuery(""); // Clear search
        setActiveCategory(category);

        try {
            const data = await getMealsByCategory(category);
            setMeals(data.meals || []);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch category meals.");
        } finally {
            setLoading(false);
            setHasSearched(true);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return (
        <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
            <Hero />

            <SearchBar
                value={query}
                onChange={setQuery}
                onSearch={fetchMeals}
            />


            {/* Category filter */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
                {categories.map((cat) => (
                    <button
                        key={cat.strCategory}
                        onClick={() => fetchMealsByCategory(cat.strCategory)}
                        className={`px-4 py-2 text-sm rounded-full border transition duration-200
                            ${activeCategory === cat.strCategory
                                ? "bg-orange-500 text-white"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
                            }`}
                    >
                        {cat.strCategory}
                    </button>

                ))}
                <RandomMealGenerator />

            </div>

            {/* Results */}
            <div className="w-full max-w-screen-xl mt-10 bg-gray-100 p-4 rounded">
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
