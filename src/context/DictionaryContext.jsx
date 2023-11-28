import { createContext, useContext, useReducer } from "react";

const DictionaryContext = createContext();


const initialState = {
    data: [],
    word: '',
    error: null,
    isLoading: false
}

function reducer(state, action) {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                isLoading: action.payload,
            }
        case "SET_WORD":
            return {
                ...state,
                word: action.payload,
            }
        case "SET_DATA":
            return {
                ...state,
                data: action.payload,
            }
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state;
    }
}

const DictionaryProvider = ({ children }) => {
    const [{ word, data, error, isLoading }, dispatch] = useReducer(reducer, initialState);
    async function fetchData() {
        try {
            dispatch({ type: "SET_LOADING", payload: true });
            dispatch({ type: "SET_ERROR", payload: false });
            const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            dispatch({ type: "SET_DATA", payload: data[0] });
        } catch (error) {
            console.log(error);
            dispatch({ type: "SET_ERROR", payload: true });
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    }

    return (
        <DictionaryContext.Provider value={{ isLoading, error, word, data, dispatch, fetchData }}>
            {children}
        </DictionaryContext.Provider>
    )
}

const useDictionary = () => {
    const context = useContext(DictionaryContext);
    if (context === undefined) {
        throw new Error("useDictionary must be used within a DictionaryProvider");
    }
    return context;
}

export { DictionaryProvider, useDictionary };