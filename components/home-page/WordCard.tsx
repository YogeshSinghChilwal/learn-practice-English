export default function WordCard({
  word,
  meaning,
  hindi,
  example
}: { word: string, meaning: string, hindi: string, example: string}) {
  return (
    <div className="bg-white p-6 rounded shadow">

      <h2 className="text-xl font-bold text-blue-600">
        {word}
      </h2>

      <p className="mt-2">
        Meaning: {meaning}
      </p>

      <p>
        Hindi: {hindi}
      </p>

      <p className="mt-2 italic">
        "{example}"
      </p>

    </div>
  )
}