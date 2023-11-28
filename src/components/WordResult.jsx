import { useEffect, useState } from 'react';
import { useDictionary } from '../context/DictionaryContext';
import { FaPlay } from 'react-icons/fa';
import Spinner from './Spinner';

const WordResult = () => {
    const { data, isLoading } = useDictionary();
    const [audioObj, setAudioObj] = useState(null);
    const [audioData, setAudioData] = useState([]);



    useEffect(() => {
        if (data && Object.keys(data).length > 0) {
            const phonetics = data.phonetics;
            const audio = phonetics?.filter(phonetic => phonetic?.audio !== '' && phonetic?.text !== undefined);
            if (audio && audio.length > 0) {
                setAudioObj(new Audio(audio[0]?.audio));
                setAudioData(audio);
            } else {
                setAudioObj(null);
                setAudioData([]);
            }
        }
    }, [data]);

    const playAudio = () => {
        if (audioObj) {
            audioObj.play();
        }
    }



    return (
        <>
            {isLoading && <Spinner />}
            {!isLoading &&
                <>
                    <div key={data?.sourceUrls} className='grid grid-rows-2 items-center grid-flow-col gap-4 mt-10'>
                        <h1 className='text-3xl md:text-5xl font-bold'>{data?.word}</h1>
                        <p className='text-primary  md:text-xl'>{audioData[0]?.text}</p>
                        {audioObj !== null && <div className='row-span-3 flex justify-end items-center'>
                            <button onClick={playAudio} className='flex justify-center hover:bg-primary hover:text-white items-center bg-[#dbb5f8] rounded-full md:w-24 md:h-24 w-16 h-16 text-primary '><FaPlay className='md:text-2xl' /></button>
                        </div>}
                    </div>
                </>
            }
        </>
    )
}

export default WordResult;