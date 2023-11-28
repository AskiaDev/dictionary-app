import Header from "./components/Header";
import Meaning from "./components/Meaning";
import WordInput from "./components/WordInput";
import WordResult from "./components/WordResult";
import { useDictionary } from "./context/DictionaryContext";

export default function App() {
  const { error } = useDictionary()

  let errorEl;

  if (error) {
    errorEl = <main className="my-20 tablet:my-[8.25rem] text-center">
      <div className="text-heading-l">😕</div>
      <h5 className="font-bold mt-5 tablet:mt-11">No Definitions Found</h5>
      <p className="mt-3 tablet:mt-6">
        Sorry pal, we couldn&apos;t find definitions for the word you were looking for. You can try the search again at later
        time or head to the web instead.
      </p>
    </main>
  }
  return (
    <div className="px-10 py-6 flex flex-col max-w-[868px] mx-auto">
      <Header />
      <WordInput />
      {error && errorEl}
      {!error &&
        <>
          <WordResult />
          <Meaning />
        </>
      }
    </div>
  )
}