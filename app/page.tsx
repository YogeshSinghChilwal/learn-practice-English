import FeatureCard from "../components/home-page/FeatureCard";
import Hero from "../components/home-page/Hero";


export default function Home() {
  return (
    <div>

      <Hero />

      <section className="grid md:grid-cols-3 gap-6 mt-12">

        <FeatureCard
          title="Daily Vocabulary"
          desc="Learn 10 new exam level words daily."
        />

        <FeatureCard
          title="Editorial Analysis"
          desc="Understand editorials with vocab and questions."
        />

        <FeatureCard
          title="Grammar Concepts"
          desc="Important rules for SSC, Banking and UPSC."
        />

        <FeatureCard
          title="Practice Questions"
          desc="Solve MCQs from previous year exams."
        />

        <FeatureCard
          title="Reading Comprehension"
          desc="Improve RC speed and accuracy."
        />

        <FeatureCard
          title="Progress Tracking"
          desc="Track daily learning progress."
        />

      </section>

    </div>
  )
}