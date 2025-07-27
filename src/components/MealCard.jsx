import { useNavigate } from "react-router-dom";

const MealCard = ({ meal }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/meal/${meal.idMeal}`);
    };

    return (
        <div
            onClick={handleClick}
            className="cursor-pointer w-[90%] sm:w-72 mx-auto rounded-xl overflow-hidden shadow-md bg-white hover:shadow-xl transform hover:scale-105 transition duration-300"
        >
            <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-44 object-cover"
            />
            <div className="p-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    {meal.strMeal}
                </h3>
                <p className="text-sm text-orange-500 mt-1">{meal.strCategory}</p>
            </div>
        </div>
    );
};

export default MealCard;
