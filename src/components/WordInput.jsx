import { useDarkMode } from '../context/DarkModeContext';
import { useDictionary } from '../context/DictionaryContext';
import { IoSearch } from "react-icons/io5";

const WordInput = () => {
    const { isDarkMode } = useDarkMode();
    const { word, dispatch, fetchData } = useDictionary();

    function handleOnchange(e) {
        dispatch({ type: "SET_WORD", payload: e.target.value });
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            fetchData();
        }
    }

    return (
        <div className='relative'>
            <input type="text" value={word} onChange={handleOnchange} onKeyDown={handleKeyDown} className={`${isDarkMode ? "bg-[#1f1f1f] focus:outline-primary" : "bg-gray-100 focus:outline-primary"} md:py-4 w-full relative outline-none mt-16 px-4 py-2   rounded-xl text-md md:text-lg font-bold placeholder:text-md `} placeholder='Enter a word..' />
            <span className="absolute text-primary text-base md:text-2xl bottom-0 right-3 md:top-[65%] top-[73%] cursor-pointer" onClick={() => fetchData()}><IoSearch /></span>
        </div>

    )
}

export default WordInput
