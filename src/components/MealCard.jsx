import { useNavigate } from "react-router-dom";

const MealCard = ({ meal }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/meal/${meal.idMeal}`);
    };

    return (
        <div
            onClick={handleClick}
            className="cursor-pointer w-[90%] overflow-hidden rounded-lg shadow-md bg-white hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
            <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold">{meal.strMeal}</h3>
                <p className="text-sm text-gray-500">{meal.strCategory}</p>
            </div>
        </div>
    );
};

export default MealCard;
