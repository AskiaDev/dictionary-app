import { useEffect, useRef, useState } from "react";
import { FONTS } from "../constant/fonts";
import { FaAngleDown } from "react-icons/fa";
import { useDarkMode } from "../context/DarkModeContext";
import useOutside from "../utils/useOutSide";

const Header = () => {
    const [font, setFont] = useState("sans-serif");
    const [isOpen, setIsOpen] = useState(false);
    const [activeFont, setActiveFont] = useState("sans-serif");
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const wrapperRef = useRef(null);

    useOutside(wrapperRef, isOpen, setIsOpen);

    useEffect(() => {
        document.body.classList.add(font);
        return () => {
            document.body.classList.remove(font);
        }
    }, [font])

    function changeFont(font) {
        setFont(font);
        setIsOpen(false);
        setActiveFont(font);
    }

    function toggleDropDown() {
        setIsOpen(prevState => !prevState);
    }

    return (
        <div className="flex items-center justify-between" >
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="38" viewBox="0 0 34 38"><g fill="none" fillRule="evenodd" stroke="#838383" strokeLinecap="round" strokeWidth="1.5"><path d="M1 33V5a4 4 0 0 1 4-4h26.8A1.2 1.2 0 0 1 33 2.2v26.228M5 29h28M5 37h28" /><path strokeLinejoin="round" d="M5 37a4 4 0 1 1 0-8" /><path d="M11 9h12" /></g></svg>
            </div>
            <div className="flex justify-between gap-5">
                <div className="relative border-r-red-500" ref={wrapperRef}>
                    <button
                        className={`flex items-center gap-3 ${isDarkMode ? "border-r-white" : "border-r-gray-300"} border-r-[1px] justify-between px-4 py-2 text-md font-medium text-left`}
                        onClick={toggleDropDown}
                    >
                        {FONTS.find((f) => f.name === font).label}
                        <FaAngleDown className="text-primary" />
                    </button>
                    {isOpen && <ul className={`absolute ${isDarkMode ? "bg-black shadow-shadow-primary shadow-primary  " : "bg-white"} z-10 rounded-lg shadow-md w-36 p-4`}>
                        {FONTS.map((font) => (
                            <li key={font.name} onClick={() => changeFont(font.name)} className={`${activeFont === font.name ? 'text-primary' : ""} p-2 cursor-pointer rounded-md $`}>
                                {font.label}
                            </li>
                        ))}
                    </ul>}
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[24%] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900"></span>
                </label>
            </div>

        </div>
    )
}

export default Header
