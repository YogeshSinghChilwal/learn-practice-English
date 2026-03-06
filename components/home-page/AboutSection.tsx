const stats = [
  { value: '10,000+', label: 'Curated Words' },
  { value: 'Exam-Focused', label: 'Targeted Content' },
  { value: 'Free', label: 'Always Accessible' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-6 text-gray-900">Why English4Officers?</h3>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}