export default function HeroSection() {
  return (
    <section id="home" className="py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Master English for Government Exams
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Your comprehensive platform for excelling in SSC, Banking, Railways, and other competitive examinations.
          Build vocabulary, enhance grammar, and boost your English proficiency.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg">
            Get Started
          </button>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition border-2 border-blue-600">
            Explore Features
          </button>
        </div>
      </div>
    </section>
  );
}