import WordCard from "@/components/home-page/WordCard"

const words = [
  {
    word: "Abandon",
    meaning: "Leave something completely",
    hindi: "त्याग देना",
    example: "He had to abandon the project."
  },
  {
    word: "Candid",
    meaning: "Honest and truthful",
    hindi: "स्पष्टवादी",
    example: "She gave a candid opinion."
  }
]

export default function VocabPage() {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Daily Vocabulary
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {words.map((w, i) => (
          <WordCard key={i} {...w} />
        ))}
      </div>

    </div>
  )
}