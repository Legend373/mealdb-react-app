
import React from 'react';
const categories = [
    "All", "Vegan", "Beef", "Chicken", "Dessert", "Miscellaneous", "Lamb",
    "Pasta", "Pork", "Seafood", "Side", "Starter", "Vegetarian", "Breakfast", "Goat"
];

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
    return (
        <div className="flex flex-wrap justify-center gap-3 mt-6">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelectCategory(category)}
                    className={`px-4 py-2 rounded-full border ${selectedCategory === category
                        ? "bg-amber-700 text-white border-amber-700"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-amber-100"
                        } transition`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
