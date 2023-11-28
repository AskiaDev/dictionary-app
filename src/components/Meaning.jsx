import { useEffect, useState } from "react"
import { useDictionary } from "../context/DictionaryContext"

const Meaning = () => {
    const { data, isLoading } = useDictionary()
    const [meanings, setMeanings] = useState([])
    useEffect(() => {
        if (data && data.meanings && data.meanings.length > 0) {
            const meanings = data.meanings;
            setMeanings(meanings);
        }
    }, [data]);
    return (
        <>
            {!isLoading && <div>
                <ul>
                    {
                        meanings.map(meaning => {
                            return <li key={meaning.partOfSpeech} className='mt-10 '>
                                <span className="flex gap-4 items-center">
                                    <h3 className='text-xl font-bold italic md:text-2xl'>{meaning?.partOfSpeech}</h3>
                                    {meaning.partOfSpeech && <hr className='w-full border-gray-500' />}
                                </span>
                                <h1 className="mt-5 text-gray-500 font-bold">MEANING</h1>
                                <ul className='my-5 list-disc marker:text-primary marker:text-[15px]'>
                                    {
                                        meaning.definitions.map(definition => {
                                            return <li key={definition?.definition} className='mt-5'>
                                                <p>{definition?.definition}</p>
                                                {definition?.example && <p className='mt-3 text-gray-500'>{definition.example}</p>}
                                            </li>
                                        })
                                    }
                                </ul>
                                {meaning.synonyms && meaning.synonyms.length > 0 && (
                                    <div className="flex items-center mt-6 tablet:mt-10 gap-6">
                                        <p className="text-gray-500">Synonyms</p>
                                        <ul className="flex flex-wrap gap-x-3 text-purple font-bold">
                                            {meaning.synonyms.map((synonym, index) => (
                                                <li key={index} className="text-primary font-bold">{synonym}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        })
                    }
                </ul>

            </div>}
        </>
    )
}

export default Meaning
