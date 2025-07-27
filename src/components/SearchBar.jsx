import { useState, useEffect } from "react";
const SearchBar = ({ value, onChange, onSearch }) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        const val = e.target.value;
        setInputValue(val);
        onChange(val); // update parent
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (inputValue.trim()) {
                onSearch(inputValue); // pass live value
            }
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [inputValue, onSearch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSearch(inputValue); // pass latest input value directly
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mt-6 flex items-center gap-2"
        >
            <input
                type="text"
                placeholder="Search meals by name..."
                value={inputValue}
                onChange={handleInputChange}
                className="flex-1 w-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
                type="submit"
                className="bg-amber-700 text-white px-4 py-2 rounded-md hover:bg-amber-800 transition"
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;