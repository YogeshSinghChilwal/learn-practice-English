import Link from 'next/link';
import type { Feature } from '@/types';

interface Props {
  features: Feature[];
}

export default function FeaturesSection({ features }: Props) {
  return (
    <section id="features" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Learning Tools</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-linear-to-br from-white to-blue-50 p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Icon className="text-blue-600" size={28} />
                  </div>
                  {!feature.available && (
                    <span className="ml-auto bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-semibold">
                      Coming Soon
                    </span>
                  )}
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                {feature.available && (
                  <Link href={feature.href}>
                    <button className="mt-4 text-blue-600 font-semibold hover:text-blue-700 transition">
                      Start Learning →
                    </button>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}